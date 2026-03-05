// lib/firebase-admin.ts
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

function getAdminApp() {
  if (getApps().length > 0) return getApp();

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin credentials are missing in environment variables');
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    projectId,
  });
}

export const adminMessaging: Pick<Messaging, 'send' | 'sendEachForMulticast'> = {
  send: (message) => getMessaging(getAdminApp()).send(message),
  sendEachForMulticast: (message) => getMessaging(getAdminApp()).sendEachForMulticast(message),
};
