
'use client';

import { useState, useMemo } from 'react';
import type { User, Project, Template } from '@/types';
import TemplateSelector from '@/components/dashboard/template-selector';
import { useFirestore, useUser as useAuthUser, useDoc, useCollection } from '@/firebase';
import { doc, query, where } from 'firebase/firestore';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';

export default function TemplatesPage() {
  const { user: authUser, loading: userLoading } = useAuthUser();
  const firestore = useFirestore();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('minimal-light');

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: user, loading: profileLoading } = useDoc<User>(userProfileRef);
  
  const projectsQuery = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);

  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery
  );

  const isLoading = userLoading || profileLoading || projectsLoading;

  if (isLoading) {
    return <div className="p-4 md:p-6">Loading templates...</div>;
  }
  
  if (!user || !projects) {
    return <div className="p-4 md:p-6">Could not load user or project data to preview templates.</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-headline">Explore Templates</h1>
        <p className="text-muted-foreground text-sm">
            Browse the available designs. You can assign a template to a portfolio in the editor.
        </p>
      </div>
      <TemplateSelector
        display='grid'
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        user={user}
        projects={projects}
      />
    </div>
  );
}
