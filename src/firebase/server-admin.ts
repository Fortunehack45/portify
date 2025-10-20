
import * as admin from 'firebase-admin';

// This ensures we initialize the app only once.
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
        throw new Error(`Firebase Admin SDK Error: Missing credentials in environment variables. 
          Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in your deployment environment.`);
      }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error: any) {
    console.error("Firebase Admin SDK initialization failed:", error.message);
    // We don't re-throw here because this would crash the entire server process.
    // Instead, individual pages trying to use the SDK will handle the error.
  }
}

// We check for initialization before exporting the db instance.
// If initialization failed, adminDb will be null and pages will error gracefully.
export const adminDb = admin.apps.length ? admin.firestore() : null;
