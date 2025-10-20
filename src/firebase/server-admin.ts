
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let adminDb: Firestore;

try {
    if (getApps().length === 0) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            : undefined;

        if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID) {
            throw new Error('Firebase Admin SDK Error: Missing environment variables. Please make sure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in your .env file.');
        }
      
        const serviceAccount = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        };

        initializeApp({
            credential: cert(serviceAccount),
        });
        
    }
    adminDb = getFirestore(getApps()[0]);

} catch (error: any) {
    console.error("Firebase Admin SDK initialization failed:", error.message);
    // We re-throw the error to ensure it's visible during development and server startup
    throw error;
}

export { adminDb };
