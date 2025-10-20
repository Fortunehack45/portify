
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminDb: Firestore;

try {
    if (!getApps().length) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            : undefined;

        if (!privateKey || !process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL) {
            throw new Error('Missing Firebase Admin credentials. Please make sure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in your .env file.');
        }
      
        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        };

        initializeApp({
            credential: cert(serviceAccount),
        });
        adminDb = getFirestore();
    } else {
        adminDb = getFirestore(getApps()[0]);
    }
} catch (error: any) {
    console.error("Firebase Admin SDK initialization failed:", error);
    // Throw the error to make it visible during development
    throw error;
}


export { adminDb };
