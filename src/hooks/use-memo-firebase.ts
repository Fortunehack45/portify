// hooks/useMemoFirebase.js
'use client';
import { useMemo } from 'react';
import { Query, DocumentReference } from 'firebase/firestore';

// A custom hook to memoize Firebase queries and references.
// This prevents re-renders from creating new query/ref objects, which can cause infinite loops in effects.
export function useMemoFirebase<T extends Query | DocumentReference | null>(
    factory: () => T,
    deps: React.DependencyList
): T {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(factory, deps);
}
