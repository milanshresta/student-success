import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

export const FirebaseAdminProvider: Provider = {
  provide: FIREBASE_ADMIN,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    if (admin.apps.length) {
      return admin.app();
    }
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.get<string>('firebase.projectId'),
        clientEmail: config.get<string>('firebase.clientEmail'),
        privateKey: config.get<string>('firebase.privateKey'),
      }),
    });
  },
};
