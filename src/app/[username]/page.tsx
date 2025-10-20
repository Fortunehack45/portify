'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
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
        const permissionError = new FirestorePermissionError({
          path: 'users',
          operation: 'list', // The failing operation
        });
        errorEmitter.emit('permission-error', permissionError);
        setError('Failed to fetch data due to permission issues.');
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
