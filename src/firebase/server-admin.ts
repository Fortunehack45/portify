
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as path from 'path';
import * as fs from 'fs';

let adminDb: Firestore;

try {
    if (getApps().length === 0) {
        const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');

        if (!fs.existsSync(serviceAccountPath)) {
            throw new Error(`Firebase Admin SDK Error: serviceAccountKey.json not found. 
Please download it from your Firebase project settings (Project settings > Service accounts > Generate new private key),
rename it to 'serviceAccountKey.json', and place it in the root directory of your project.`);
        }
        
        const serviceAccountString = fs.readFileSync(serviceAccountPath, 'utf8');
        const serviceAccount = JSON.parse(serviceAccountString);

        initializeApp({
            credential: cert(serviceAccount),
        });
        adminDb = getFirestore();
    } else {
        adminDb = getFirestore(getApps()[0]);
    }
} catch (error: any) {
    console.error("Firebase Admin SDK initialization failed:", error.message);
    // We re-throw the error to ensure it's visible during development and server startup
    throw error;
}

export { adminDb };
