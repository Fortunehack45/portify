'use client';

import { useMemo, useState, useEffect } from 'react';
import { useCollection, useUser, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { User, Project } from '@/types';
import PreviewPanel from '@/components/dashboard/preview-panel';


export default function PreviewPage() {
  const { user: authUser, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const projectsQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);
      
  const { data: projectData, loading: projectsLoading } = useCollection<Project>(projectsQuery);

  const userProfileQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'users'), where('id', '==', authUser.uid))
  }, [firestore, authUser]);

  const { data: userProfile, loading: profileLoading } = useCollection<User>(userProfileQuery);

  useEffect(() => {
    if (userProfile && userProfile.length > 0) {
      setUser(userProfile[0]);
    }
  }, [userProfile]);

  useEffect(() => {
    if (projectData) {
      setProjects(projectData);
    }
  }, [projectData]);

  const isLoading = userLoading || projectsLoading || profileLoading || !user;

  if (isLoading) {
      return (
          <div className="flex h-full items-center justify-center">
              <p>Loading Preview...</p>
          </div>
      )
  }

  return <PreviewPanel user={user as User} projects={projects} />;
}
