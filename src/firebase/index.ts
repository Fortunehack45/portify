import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

import { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function getFirebase() {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
    } else {
        app = getApp();
        auth = getAuth(app);
        firestore = getFirestore(app);
    }
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
