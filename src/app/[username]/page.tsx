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

function PortfolioContent({ user }: { user: User }) {
  const firestore = useFirestore();

  const projectsQuery = useMemo(() => {
    if (!firestore || !user.id) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', user.id));
  }, [firestore, user.id]);

  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery,
    { listen: false }
  );

  if (projectsLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading projects...</div>;
  }
  
  return (
    <TemplateRenderer
      template={user.selectedTemplate}
      user={user}
      projects={projects || []}
    />
  );
}


export default function UserPortfolioPage({ params }: PageProps) {
  const firestore = useFirestore();

  const userQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'), where('username', '==', params.username));
  }, [firestore, params.username]);

  const { data: userData, loading: userLoading } = useCollection<User>(userQuery, { listen: false });
  
  if (userLoading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }

  const user = userData?.[0];

  if (!user) {
    notFound();
  }
  
  return <PortfolioContent user={user} />;
}
