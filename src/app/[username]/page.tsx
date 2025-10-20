'use client';

import { notFound, useParams } from 'next/navigation';
import { useCollection, useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';

function PortfolioContent({ user }: { user: User }) {
  const firestore = useFirestore();

  const projectsQuery = useMemoFirebase(() => {
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


export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  const firestore = useFirestore();

  const userQuery = useMemoFirebase(() => {
    if (!firestore || !username) return null;
    return query(collection(firestore, 'users'), where('username', '==', username));
  }, [firestore, username]);

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
