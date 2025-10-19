'use client';

import { useEffect, useState, useRef } from 'react';
import { onSnapshot, query, collection, where, getDocs, Query, DocumentData, FirestoreError } from 'firebase/firestore';
import { useFirestore } from '..';

interface HookOptions {
    listen?: boolean;
}

const defaultOptions: HookOptions = {
    listen: true,
};

export function useCollection<T>(
    query: Query | null,
    options: HookOptions = defaultOptions
) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<FirestoreError | null>(null);

    const queryRef = useRef(query);

    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }
        
        setLoading(true);

        if (options.listen) {
            const unsubscribe = onSnapshot(
                query,
                (querySnapshot) => {
                    const data: T[] = [];
                    querySnapshot.forEach((doc) => {
                        data.push({ id: doc.id, ...doc.data() } as unknown as T);
                    });
                    setData(data);
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
            getDocs(query)
                .then((querySnapshot) => {
                    const data: T[] = [];
                    querySnapshot.forEach((doc) => {
                        data.push({ id: doc.id, ...doc.data() } as unknown as T);
                    });
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [query, options.listen]);

    return { data, loading, error };
}
