'use client';

import DashboardClient from '@/components/dashboard/dashboard-client';
import { useUser, useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState, useMemo } from 'react';

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const [initialUser, setInitialUser] = useState<User | null>(null);
  const [initialProjects, setInitialProjects] = useState<Project[]>([]);
  
  // Memoize the query for projects to prevent re-renders.
  const projectsQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', user.uid));
  }, [firestore, user]);
      
  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery
  );

  // Memoize the query for the user profile to prevent re-renders.
  const userProfileQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users'), where('id', '==', user.uid))
  }, [firestore, user]);

  const { data: userProfile, loading: profileLoading } = useCollection<User>(userProfileQuery);

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
          socials: [],
          selectedTemplate: 'minimal-light',
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