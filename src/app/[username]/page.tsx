
'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, doc } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
      setError(null);
      try {
        // Step 1: Find the user by username. This is a query that requires list permission on the users collection.
        const usersRef = collection(firestore, 'users');
        const userQuery = query(usersRef, where('username', '==', username), limit(1));
        
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          setError('User not found');
          setData(null);
          setLoading(false);
          notFound();
          return;
        }

        const userDoc = userSnapshot.docs[0];
        const user = { id: userDoc.id, ...userDoc.data() } as User;

        // Step 2: Fetch the user's projects using their ID. This requires list permission on the projects collection.
        let projects: Project[] = [];
        if (user.id) {
            const projectsRef = collection(firestore, 'projects');
            const projectsQuery = query(projectsRef, where('userId', '==', user.id));
            const projectsSnapshot = await getDocs(projectsQuery);
            projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        }
        
        setData({ user, projects });

      } catch (err: any) {
        // This is a critical part. We identify the permission error and surface it in a developer-friendly way.
        if (err.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
              path: `users`, // The failing query is on the 'users' collection
              operation: 'list', // The operation is 'list' due to the `where` clause
            });
            errorEmitter.emit('permission-error', permissionError);
            setError('Failed to fetch data due to permission issues.');
        } else {
            setError('An unexpected error occurred.');
            console.error("Portfolio fetch error:", err);
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [firestore, username]);

  return { data, loading, error };
};


export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  
  const { data, loading, error } = usePortfolioData(username);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }

  if (error || !data?.user) {
    // We explicitly throw the error here if it's a permission issue,
    // which will be caught by the Next.js overlay in development.
    if (error?.includes('permission')) {
      throw new Error(`Firestore Permission Denied: Could not fetch portfolio for user "${username}". Check your Firestore security rules to allow public reads on 'users' and 'projects' collections.`);
    }
    // For "User not found" or other errors, the hook already calls notFound(),
    // but we can call it again here as a fallback.
    notFound();
  }

  return (
    <TemplateRenderer
      template={data.user.selectedTemplate}
      user={data.user}
      projects={data.projects}
    />
  );
}
