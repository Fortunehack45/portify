'use client';
import { ReactNode, useEffect, useState } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseProvider } from './provider';
import { getFirebase } from '.';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
  } | null>(null);

  useEffect(() => {
    const { app, auth, firestore } = getFirebase();
    setFirebase({ app, auth, firestore });
  }, []);

  if (!firebase) {
    return null; // or a loading spinner
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
