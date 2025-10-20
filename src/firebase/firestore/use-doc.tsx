'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, getDoc, DocumentReference, FirestoreError } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface HookOptions {
    listen?: boolean;
}

const defaultOptions: HookOptions = {
    listen: true,
};

export function useDoc<T>(
    ref: DocumentReference | null,
    options: HookOptions = defaultOptions
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<FirestoreError | null>(null);

    useEffect(() => {
        if (!ref) {
            setLoading(false);
            return;
        }

        setLoading(true);

        if (options.listen) {
            const unsubscribe = onSnapshot(
                ref,
                (docSnap) => {
                    if (docSnap.exists()) {
                        setData({ id: docSnap.id, ...docSnap.data() } as T);
                    } else {
                        setData(null);
                    }
                    setLoading(false);
                },
                (err) => {
                    const permissionError = new FirestorePermissionError({
                        path: ref.path,
                        operation: 'get',
                    });
                    errorEmitter.emit('permission-error', permissionError);
                    setError(err);
                    setLoading(false);
                }
            );
            return () => unsubscribe();
        } else {
            getDoc(ref)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        setData({ id: docSnap.id, ...docSnap.data() } as T);
                    } else {
                        setData(null);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    const permissionError = new FirestorePermissionError({
                        path: ref.path,
                        operation: 'get',
                    });
                    errorEmitter.emit('permission-error', permissionError);
                    setError(err);
                    setLoading(false);
                });
        }

    }, [ref, options.listen]);

    return { data, loading, error };
}
