'use client';

import type { User, Project, Template, Portfolio } from '@/types';
import { Button } from '../ui/button';
import { Eye, Save } from 'lucide-react';
import ProfileForm from './profile-form';
import ProjectsList from './projects-list';
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { doc, setDoc, writeBatch, serverTimestamp, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import TemplateSelector from './template-selector';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface EditorClientProps {
  user: User;
  portfolio: Portfolio;
  projects: Project[];
  onUserChange: (user: User) => void;
  onPortfolioChange: (portfolio: Portfolio) => void;
  onProjectsChange: (projects: Project[]) => void;
  onTogglePreview: () => void;
  isMobile: boolean;
}

export default function EditorClient({
  user,
  portfolio,
  projects,
  onUserChange,
  onPortfolioChange,
  onProjectsChange,
  onTogglePreview,
  isMobile
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
    if (!firestore || !authUser || !portfolio) {
      toast({ title: "Error", description: "Could not save. User or portfolio not available.", variant: "destructive" });
      return;
    }
  
    const batch = writeBatch(firestore);

    // 1. Update the user profile
    const userDocRef = doc(firestore, 'users', authUser.uid);
    const userData = {
      ...user,
      updatedAt: serverTimestamp(),
    };
    // remove id from userData to avoid saving it in the document
    const { id, ...userDataWithoutId } = userData;
    batch.set(userDocRef, userDataWithoutId, { merge: true });
    
    // 2. Update the portfolio
    const portfolioDocRef = doc(firestore, 'portfolios', portfolio.id);
    const portfolioData = {
        ...portfolio,
        updatedAt: serverTimestamp(),
    };
    const { id: portfolioIdToRemove, ...portfolioDataWithoutId } = portfolioData;
    batch.set(portfolioDocRef, portfolioDataWithoutId, { merge: true });
    
    batch.commit().then(() => {
        toast({
            title: 'Content Saved!',
            description: 'Your changes have been successfully saved.',
        });
    }).catch(async (error: any) => {
        const permissionError = new FirestorePermissionError({
            path: `users/${authUser.uid}`,
            operation: 'update',
            requestResourceData: { user: userDataWithoutId, portfolio: portfolioDataWithoutId },
        });
        errorEmitter.emit('permission-error', permissionError);

        toast({
            title: 'Uh oh! Something went wrong.',
            description: 'Could not save your changes.',
            variant: 'destructive',
        });
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:relative">
          <div className="space-y-1">
              <h1 className="text-2xl font-bold font-headline">Editor</h1>
              <p className="text-muted-foreground text-sm">Editing: <span className="font-semibold text-foreground">{portfolio.name}</span></p>
          </div>
          <div className='flex items-center gap-2'>
            {!isMobile && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={onTogglePreview}>
                        <Eye className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle Preview</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
            )}
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
          </div>
      </div>
      <div className="p-6 space-y-6 h-full overflow-y-auto">
        <Accordion type="multiple" defaultValue={['profile', 'projects', 'template']} className="w-full space-y-4">
            <ProfileForm user={user} onUserChange={handleUserPropChange} />
            <ProjectsList 
              projects={projects}
              setProjects={onProjectsChange}
              portfolio={portfolio}
              onPortfolioChange={onPortfolioChange}
             />
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
