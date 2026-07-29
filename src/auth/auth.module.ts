import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffUser } from '../database/entities/staff-user.entity';
import { FirebaseAdminProvider } from './firebase-admin.provider';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([StaffUser])],
  providers: [FirebaseAdminProvider, FirebaseAuthGuard, AuthService],
  exports: [FirebaseAdminProvider, FirebaseAuthGuard, AuthService],
})
export class AuthModule {}
