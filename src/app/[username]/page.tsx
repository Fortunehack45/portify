'use client';

import { notFound } from 'next/navigation';
import { useCollection } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User, Project } from '@/types';
import { useEffect, useState, useMemo } from 'react';

interface PageProps {
  params: {
    username: string;
  };
}

export default function UserPortfolioPage({ params }: PageProps) {
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);

  // Memoize the user query to prevent re-fetching on every render
  const userQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'), where('username', '==', params.username));
  }, [firestore, params.username]);

  const { data: userData, loading: userLoading, error: userError } = useCollection<User>(userQuery, { listen: false });
  
  // Set user state when data is fetched
  useEffect(() => {
    if (userData && userData.length > 0) {
      setUser(userData[0]);
    }
  }, [userData]);

  // Memoize the projects query, depending on the user ID
  const projectsQuery = useMemo(() => {
    if (!firestore || !user?.id) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', user.id));
  }, [firestore, user?.id]);
      
  const { data: projects, loading: projectsLoading, error: projectsError } = useCollection<Project>(
    projectsQuery, { listen: false }
  );

  // Handle not found case after user query finishes and finds no user
  if (!userLoading && !user) {
    notFound();
  }

  const isLoading = userLoading || projectsLoading || !user || !projects;

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }
  
  // This check is unlikely to be hit due to the one above, but it's good practice
  if (!user) {
    return notFound();
  }
  
  return (
    <TemplateRenderer 
      template={user.selectedTemplate}
      user={user}
      projects={projects || []}
    />
  );
}
