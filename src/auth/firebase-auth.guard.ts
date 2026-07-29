import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN } from './firebase-admin.provider';

export interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
    email?: string;
  };
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly firebaseApp: admin.app.App,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    try {
      const decoded = await this.firebaseApp.auth().verifyIdToken(token);
      request.user = { uid: decoded.uid, email: decoded.email };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return null;
    }
    return header.slice('Bearer '.length);
  }
}
