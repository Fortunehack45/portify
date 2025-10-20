
'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
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
        // Standardize on lowercase for the lookup
        const lookupUsername = username.toLowerCase();
        
        // Step 1: Look up the userId from the public 'usernames' collection.
        const usernameRef = doc(firestore, 'usernames', lookupUsername);
        const usernameSnap = await getDoc(usernameRef);

        if (!usernameSnap.exists()) {
          setError('User not found');
          setData(null);
          setLoading(false);
          notFound();
          return;
        }

        const { userId } = usernameSnap.data();

        // Step 2: Fetch the user's profile directly by their ID.
        const userRef = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            setError('User profile not found');
            setData(null);
            setLoading(false);
            notFound();
            return;
        }

        const user = { id: userSnap.id, ...userSnap.data() } as User;

        // Step 3: Fetch the user's projects using their ID.
        const projectsRef = collection(firestore, 'projects');
        const projectsQuery = query(projectsRef, where('userId', '==', userId));
        const projectsSnapshot = await getDocs(projectsQuery);
        const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        
        setData({ user, projects });

      } catch (err: any) {
        if (err.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
              path: `usernames/${username.toLowerCase()}`, // The initial failing query would be on the username lookup
              operation: 'get', 
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
