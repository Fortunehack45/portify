'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, getDocs, Query, FirestoreError } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
                    const permissionError = new FirestorePermissionError({
                        path: (query as any)._query.path.segments.join('/'),
                        operation: 'list',
                    });
                    errorEmitter.emit('permission-error', permissionError);
                    setError(err);
                    setLoading(false);
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
                    const permissionError = new FirestorePermissionError({
                        path: (query as any)._query.path.segments.join('/'),
                        operation: 'list',
                    });
                    errorEmitter.emit('permission-error', permissionError);
                    setError(err);
                    setLoading(false);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, options.listen]);

    return { data, loading, error };
}
