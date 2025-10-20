'use client';

import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// This component is a WORKAROUND to display custom error overlays in Next.js development.
// It listens for custom 'permission-error' events and throws them as uncaught exceptions,
// which Next.js then displays in its development error overlay.
export default function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (e: FirestorePermissionError) => {
      setError(e);
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (error) {
    // Throwing the error here will trigger the Next.js error overlay in development.
    throw error;
  }

  return null;
}
