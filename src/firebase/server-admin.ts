
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    console.error("Firebase Admin SDK service account credentials are not set in environment variables.");
    // Return a mock or throw an error to prevent app from running with invalid config
}


let adminDb: Firestore;

try {
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount),
      });
      adminDb = getFirestore();
    } else {
      adminDb = getFirestore(getApps()[0]);
    }
} catch (error: any) {
    console.error("Firebase Admin SDK initialization failed:", error);
    // You might want to throw the error to stop the application from starting
    // throw error;
}


export { adminDb };
