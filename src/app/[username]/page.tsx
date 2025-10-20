
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

  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined for loading, null for not found
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!firestore || !username) {
        return;
      }

      try {
        // --- NEW LOGIC: Fetch all users and find by username in client ---
        const usersRef = collection(firestore, 'users');
        const usersSnapshot = await getDocs(usersRef);

        let foundUser: User | null = null;
        
        usersSnapshot.forEach((doc) => {
          const userData = doc.data() as Omit<User, 'id'>;
          if (userData.username === username) {
            foundUser = { id: doc.id, ...userData };
          }
        });
        // --- END NEW LOGIC ---

        if (!foundUser) {
          setUser(null); // User not found
        } else {
          setUser(foundUser);
          const userId = foundUser.id;

          // Fetch projects for that user
          const projectsQuery = query(collection(firestore, 'projects'), where('userId', '==', userId));
          const projectsSnapshot = await getDocs(projectsQuery);
          const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
          setProjects(projectsData);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setUser(null); // Set to null on error
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
