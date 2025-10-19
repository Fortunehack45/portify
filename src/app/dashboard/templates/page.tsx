'use client';

import { useState, useEffect, useMemo } from 'react';
import type { User, Project, Template } from '@/types';
import TemplateSelector from '@/components/dashboard/template-selector';
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { doc, setDoc, collection, query, where } from 'firebase/firestore';
import { useCollection } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export default function TemplatesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const { user: authUser, loading: userLoading } = useAuthUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'users'), where('id', '==', authUser.uid))
  }, [firestore, authUser]);

  const { data: userProfile, loading: profileLoading } = useCollection<User>(userProfileQuery);

  const projectsQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);
      
  const { data: projectData, loading: projectsLoading } = useCollection<Project>(projectsQuery);

  useEffect(() => {
    if (userProfile && userProfile.length > 0) {
      setUser(userProfile[0]);
      setSelectedTemplate(userProfile[0].selectedTemplate);
    }
  }, [userProfile]);

  useEffect(() => {
    if (projectData) {
      setProjects(projectData);
    }
  }, [projectData]);

  const handleSave = async () => {
    if (!firestore || !authUser || !selectedTemplate) {
      toast({ title: "Error", description: "Could not save. User or template not available.", variant: "destructive" });
      return;
    }
  
    try {
      const userDocRef = doc(firestore, 'users', authUser.uid);
      await setDoc(userDocRef, { selectedTemplate: selectedTemplate }, { merge: true });
  
      toast({
        title: 'Template Saved!',
        description: 'Your template choice has been updated.',
      });
    } catch (error: any) {
      console.error('Error saving template:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem saving your template.',
        variant: 'destructive',
      });
    }
  };

  const isLoading = userLoading || profileLoading || projectsLoading;

  if (isLoading || !user || !selectedTemplate) {
    return <div className="p-4 md:p-6">Loading templates...</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold font-headline">Templates</h1>
                <p className="text-muted-foreground text-sm">Choose a new look for your portfolio.</p>
            </div>
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
            </Button>
        </div>
        <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            projects={projects}
            user={user}
        />
    </div>
  );
}
