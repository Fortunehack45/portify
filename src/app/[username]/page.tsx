'use client';

import { notFound } from 'next/navigation';
import { useCollection } from '@/firebase';
import ThemeRenderer from '@/components/themes/theme-renderer';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User, Project } from '@/types';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    username: string;
  };
}

export default function UserPortfolioPage({ params }: PageProps) {
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);

  const userQuery = firestore
    ? query(collection(firestore, 'users'), where('username', '==', params.username))
    : null;

  const { data: userData, loading: userLoading } = useCollection<User>(userQuery, { listen: false });
  
  useEffect(() => {
    if (userData && userData.length > 0) {
      setUser(userData[0]);
    } else if (!userLoading && (!userData || userData.length === 0)) {
      notFound();
    }
  }, [userData, userLoading]);


  const projectsQuery =
    firestore && user
      ? query(collection(firestore, 'projects'), where('userId', '==', user.id))
      : null;
      
  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery, { listen: false }
  );

  const isLoading = userLoading || projectsLoading || !user || !projects;

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }
  
  if (!user) {
    // This will be caught by notFound() in useEffect, but as a safeguard.
    return notFound();
  }
  
  return (
    <ThemeRenderer 
      theme={user.selectedTheme}
      user={user}
      projects={projects || []}
    />
  );
}
