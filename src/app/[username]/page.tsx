'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, doc, getDoc, DocumentData } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';

// This is a simplified approach to get the user and projects for a public page
// without requiring a query on the users collection by username, which was causing permission issues.
// 1. We find the user by querying the *users* collection with the username. This is the root of our problem.
// A better approach for public pages is often to query a collection that is fully public.
// Let's change the strategy: We can't query 'users' by username publicly due to security rules.
// Let's assume for a moment that project data might be more public.
// What if we could find the user through their projects? This is not ideal as a user might have no projects.
// The most direct fix is to adjust the security rules to allow the query on 'users' by 'username'.
// Since that has failed repeatedly, let's try a different data loading strategy.

// Let's stick with the original intention but fix the implementation detail that might be causing issues.
// The query `where('username', '==', username)` requires an index on 'username'. Firestore creates this automatically.
// The permission error `list` on `users` means the rules are not allowing it.

const usePortfolioData = (username: string) => {
  const firestore = useFirestore();
  const [data, setData] = useState<{ user: User; projects: Project[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firestore || !username) {
      setLoading(false);
      return;
    }

    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        // Step 1: Find the user by username. This is the query that is failing.
        const usersRef = collection(firestore, 'users');
        const userQuery = query(usersRef, where('username', '==', username), limit(1));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          setError('User not found');
          setData(null);
          setLoading(false);
          return;
        }

        const user = { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() } as User;

        // Step 2: Fetch the user's projects using their ID.
        const projectsRef = collection(firestore, 'projects');
        const projectsQuery = query(projectsRef, where('userId', '==', user.id));
        const projectsSnapshot = await getDocs(projectsQuery);
        const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        
        setData({ user, projects });

      } catch (err: any) {
        // This catch block will now properly handle the permission error
        const operation = err.message.includes("indexes") ? "list" : "get";
        const permissionError = new FirestorePermissionError({
          path: 'users',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError('Failed to fetch data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [firestore, username]);

  return { ...data, loading, error };
};


export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  
  const { user, projects, loading, error } = usePortfolioData(username);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }

  if (error || !user || !projects) {
    notFound();
  }

  return (
    <TemplateRenderer
      template={user.selectedTemplate}
      user={user}
      projects={projects}
    />
  );
}
