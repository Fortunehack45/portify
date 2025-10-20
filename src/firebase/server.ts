
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// This function is intended for SERVER-SIDE use only.
function getFirebaseForServer() {
    let app: FirebaseApp;

    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    
    const firestore = getFirestore(app);

    return { app, firestore };
}

export { getFirebaseForServer };
