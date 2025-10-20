
'use client';

import type { User, Project, Template, Portfolio } from '@/types';
import { Button } from '../ui/button';
import { Save } from 'lucide-react';
import ProfileForm from './profile-form';
import ProjectsList from './projects-list';
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { doc, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import TemplateSelector from './template-selector';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface EditorClientProps {
  user: User;
  portfolio: Portfolio;
  projects: Project[];
  onUserChange: (user: User) => void;
  onPortfolioChange: (portfolio: Portfolio) => void;
  onProjectsChange: (projects: Project[]) => void;
}

export default function EditorClient({
  user,
  portfolio,
  projects,
  onUserChange,
  onPortfolioChange,
  onProjectsChange,
}: EditorClientProps) {

  const firestore = useFirestore();
  const { user: authUser } = useAuthUser();
  const { toast } = useToast();

  const handleUserPropChange = (updatedUser: Partial<User>) => {
    onUserChange({ ...user, ...updatedUser });
  };

  const handleTemplateChange = (template: Template) => {
    onPortfolioChange({ ...portfolio, selectedTemplate: template });
  };

  const handleSave = async () => {
    if (!firestore || !authUser) {
      toast({ title: "Error", description: "Could not save. User not authenticated.", variant: "destructive" });
      return;
    }
  
    const batch = writeBatch(firestore);

    // 1. Update the user profile
    const userDocRef = doc(firestore, 'users', authUser.uid);
    const userData: User = {
      ...user,
      updatedAt: new Date(),
    };
    batch.set(userDocRef, { ...userData, updatedAt: serverTimestamp() }, { merge: true });
    
    // 2. Update the portfolio
    if (portfolio) {
        const portfolioDocRef = doc(firestore, 'portfolios', portfolio.id);
        const portfolioData: Portfolio = {
            ...portfolio,
            updatedAt: new Date(),
        };
        batch.set(portfolioDocRef, { ...portfolioData, updatedAt: serverTimestamp() }, { merge: true });
    }

    try {
      await batch.commit();
  
      toast({
        title: 'Profile Saved!',
        description: 'Your profile changes have been successfully saved.',
      });
    } catch (error: any) {
      const permissionError = new FirestorePermissionError({
        path: userDocRef.path,
        operation: 'update',
        requestResourceData: userData
      });
      errorEmitter.emit('permission-error', permissionError);

      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'Could not save your profile changes.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:relative">
          <div className="space-y-1">
              <h1 className="text-2xl font-bold font-headline">Editor</h1>
              <p className="text-muted-foreground text-sm">Update your profile and projects.</p>
          </div>
          <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
          </Button>
      </div>
      <div className="p-6 space-y-6 h-full overflow-y-auto">
        <Accordion type="multiple" defaultValue={['profile', 'projects', 'template']} className="w-full space-y-4">
            <ProfileForm user={user} onUserChange={handleUserPropChange} />
            <ProjectsList projects={projects} setProjects={onProjectsChange} />
            <AccordionItem value="template">
              <AccordionTrigger className="p-4 bg-background rounded-lg border shadow-sm text-base font-medium">
                Template
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="bg-background p-4 rounded-b-lg border-x border-b">
                  <TemplateSelector 
                    display="select"
                    selectedTemplate={portfolio.selectedTemplate}
                    onTemplateChange={handleTemplateChange}
                    user={user}
                    projects={projects}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
