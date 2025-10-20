'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const firestore = useFirestore();

  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined for loading, null for not found
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!firestore || !username) {
        setUser(null); // Mark as not found if firestore or username is missing
        return;
      }

      const userQuery = query(collection(firestore, 'users'), where('username', '==', username), limit(1));
      
      getDocs(userQuery)
        .then(async (userSnapshot) => {
          if (userSnapshot.empty) {
            setUser(null); // User not found
            return;
          }
          
          const foundUser = { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() } as User;
          setUser(foundUser);
          const userId = foundUser.id;

          // Fetch projects for that user
          const projectsQuery = query(collection(firestore, 'projects'), where('userId', '==', userId));
          const projectsSnapshot = await getDocs(projectsQuery);
          const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
          setProjects(projectsData);
        })
        .catch(serverError => {
          const permissionError = new FirestorePermissionError({
            path: `users`,
            operation: 'list',
          });
          errorEmitter.emit('permission-error', permissionError);
          setUser(null); // Set to null on error to trigger notFound
        });
    };

    fetchData();
  }, [firestore, username]);

  // Initial loading state before fetch completes
  if (user === undefined) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }

  // After fetch: user is null, so not found
  if (user === null) {
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
