'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, doc, getDoc, DocumentReference, DocumentData, FirestoreError } from 'firebase/firestore';

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
                    setError(err);
                    setLoading(false);
                    console.error(err);
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
                    setError(err);
                    setLoading(false);
                    console.error(err);
                });
        }

    }, [ref, options.listen]);

    return { data, loading, error };
}
