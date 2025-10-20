
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

const getAdminDb = (): Firestore => {
  if (admin.apps.length > 0) {
    return admin.firestore();
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    throw new Error(`Firebase Admin SDK Error: Missing credentials in environment variables. 
      Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in your deployment environment.`);
  }

  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    
    return admin.firestore();
  } catch (error: any) {
    console.error("Firebase Admin SDK initialization failed:", error.message);
    // Re-throw the error to fail the server-side render if initialization fails
    throw error;
  }
};

export const adminDb = getAdminDb();
