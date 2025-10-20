import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

import { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

// This function is intended for CLIENT-SIDE use only.
function getFirebase() {
    if (typeof window === 'undefined') {
        // Return null or a mock object on the server
        return { app: null, auth: null, firestore: null };
    }

    let app: FirebaseApp;

    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    return { app, auth, firestore };
}


export {
    getFirebase,
    FirebaseProvider,
    FirebaseClientProvider,
    useUser,
    useCollection,
    useDoc,
    useFirebase,
    useFirebaseApp,
    useAuth,
    useFirestore
};
