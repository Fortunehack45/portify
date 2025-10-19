'use client';

import DashboardClient from '@/components/dashboard/dashboard-client';
import { useUser, useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const [initialUser, setInitialUser] = useState<User | null>(null);
  const [initialProjects, setInitialProjects] = useState<Project[]>([]);
  
  // Create a query for projects only when firestore and user are available
  const projectsQuery =
    firestore && user
      ? query(collection(firestore, 'projects'), where('userId', '==', user.uid))
      : null;
      
  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery
  );

  const { data: userProfile, loading: profileLoading } = useCollection<User>(
    firestore && user ? query(collection(firestore, 'users'), where('id', '==', user.uid)) : null
  );

  useEffect(() => {
    if (userProfile && userProfile.length > 0) {
      setInitialUser(userProfile[0]);
    } else if (user && !profileLoading && (!userProfile || userProfile.length === 0)) {
        // This is a fallback if the user profile is not in the collection yet.
        // This can happen on first sign up.
        setInitialUser({
          id: user.uid,
          email: user.email || '',
          name: user.displayName || 'New User',
          username: user.displayName?.replace(/\s+/g, '').toLowerCase() || 'newuser',
          bio: '',
          skills: [],
          selectedTheme: 'minimal-light',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
    }
  }, [user, userProfile, profileLoading]);

  useEffect(() => {
    if (projects) {
      // The dates will be Firebase Timestamps, convert them to JS Dates
      const formattedProjects = projects.map(p => ({
        ...p,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));
      setInitialProjects(formattedProjects);
    }
  }, [projects]);
  
  const isLoading = userLoading || projectsLoading || profileLoading || !initialUser;

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading dashboard...</div>;
  }

  return <DashboardClient initialUser={initialUser as User} initialProjects={initialProjects} />;
}
