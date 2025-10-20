
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { User, Project, Template, Portfolio } from '@/types';
import TemplateSelector from '@/components/dashboard/template-selector';
import { useFirestore, useUser as useAuthUser, useDoc, useCollection } from '@/firebase';
import { doc, setDoc, collection, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';

export default function TemplatesPage() {
  const { user: authUser, loading: userLoading } = useAuthUser();
  const firestore = useFirestore();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | undefined>(undefined);
  const router = useRouter();
  const { toast } = useToast();

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

  const portfolioQuery = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'portfolios'), where('userId', '==', authUser.uid), where('isPrimary', '==', true));
  }, [firestore, authUser]);

  const { data: portfolios, loading: portfolioLoading } = useCollection<Portfolio>(portfolioQuery);
  const primaryPortfolio = useMemo(() => (portfolios && portfolios.length > 0 ? portfolios[0] : null), [portfolios]);

  useEffect(() => {
    if (primaryPortfolio) {
      setSelectedTemplate(primaryPortfolio.selectedTemplate);
    }
  }, [primaryPortfolio]);

  const handleSave = async () => {
    if (!firestore || !authUser || !selectedTemplate || !primaryPortfolio) {
        toast({ title: "Error", description: "Could not save. User or portfolio not available.", variant: "destructive" });
        return;
    }
    const portfolioDocRef = doc(firestore, 'portfolios', primaryPortfolio.id);
    try {
        await setDoc(portfolioDocRef, { selectedTemplate: selectedTemplate }, { merge: true });
        toast({
            title: 'Template Saved!',
            description: 'Your new template has been applied.',
        });
        router.push(`/dashboard/editor`);
    } catch (error: any) {
        console.error("Error saving template: ", error);
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const isLoading = userLoading || profileLoading || projectsLoading || portfolioLoading;

  if (isLoading) {
    return <div className="p-4 md:p-6">Loading...</div>;
  }
  
  if (!user || !projects || !primaryPortfolio) {
    return <div className="p-4 md:p-6">Could not load user or portfolio data.</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-headline">Templates</h1>
          <p className="text-muted-foreground text-sm">Choose a template for your primary portfolio.</p>
        </div>
        <Button onClick={handleSave} disabled={!selectedTemplate}>
          <Save className="mr-2 h-4 w-4" />
          Save Template
        </Button>
      </div>
      <TemplateSelector
        display='grid'
        selectedTemplate={selectedTemplate || primaryPortfolio.selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        user={user}
        projects={projects}
      />
    </div>
  );
}
