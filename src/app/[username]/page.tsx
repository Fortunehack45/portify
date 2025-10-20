'use client';

import { notFound, useParams } from 'next/navigation';
import { useCollection, useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';
import { useEffect, useState } from 'react';

export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const firestore = useFirestore();

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!firestore || !username) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Fetch user data
        const userQuery = query(collection(firestore, 'users'), where('username', '==', username));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = { id: userSnapshot.docs[0].id, ...userSnapshot.docs[0].data() } as User;
        setUser(userData);

        // Fetch projects for that user
        const projectsQuery = query(collection(firestore, 'projects'), where('userId', '==', userData.id));
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [firestore, username]);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }

  if (!user) {
    notFound();
  }

  return (
    <TemplateRenderer
      template={user.selectedTemplate}
      user={user}
      projects={projects || []}
    />
  );
}
