'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState } from 'react';

export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const firestore = useFirestore();

  const [user, setUser] = useState<User | null | undefined>(undefined); // Use undefined for initial loading state
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!firestore || !username) {
        return;
      }

      try {
        // Fetch user data
        const usersRef = collection(firestore, 'users');
        const userQuery = query(usersRef, where('username', '==', username), limit(1));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          setUser(null); // User not found
        } else {
          const userData = userSnapshot.docs[0].data() as Omit<User, 'id'>;
          const userId = userSnapshot.docs[0].id;
          const userWithId = { id: userId, ...userData }
          setUser(userWithId);

          // Fetch projects for that user
          const projectsQuery = query(collection(firestore, 'projects'), where('userId', '==', userId));
          const projectsSnapshot = await getDocs(projectsQuery);
          const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
          setProjects(projectsData);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setUser(null); // Set to null on error to prevent infinite loading
      }
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
