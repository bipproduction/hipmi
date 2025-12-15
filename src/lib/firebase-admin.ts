// lib/firebase-admin.ts
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

// Ambil dari environment
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  throw new Error('Firebase Admin credentials are missing in environment variables');
}

// Inisialisasi hanya sekali
const app = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.projectId,
    })
  : getApp();

export const adminMessaging = getMessaging(app);