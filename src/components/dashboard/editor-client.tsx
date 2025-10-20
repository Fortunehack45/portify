
'use client';

import { useState, useEffect } from 'react';
import type { User, Project, Template } from '@/types';
import { Button } from '../ui/button';
import { Save, Eye } from 'lucide-react';
import ProfileForm from './profile-form';
import ProjectsList from './projects-list';
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import TemplateSelector from './template-selector';

interface EditorClientProps {
  initialUser: User;
  initialProjects: Project[];
  onTogglePreview: () => void;
  isPreviewCollapsed: boolean;
}

export default function EditorClient({
  initialUser,
  initialProjects,
  onTogglePreview,
  isPreviewCollapsed,
}: EditorClientProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const firestore = useFirestore();
  const { user: authUser } = useAuthUser();
  const { toast } = useToast();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleUserChange = (updatedUser: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const handleTemplateChange = (template: Template) => {
    setUser(prev => ({ ...prev, selectedTemplate: template }));
  };

  const handleSave = async () => {
    if (!firestore || !authUser) {
      toast({ title: "Error", description: "Could not save. User not authenticated.", variant: "destructive" });
      return;
    }
  
    try {
      const userDocRef = doc(firestore, 'users', authUser.uid);
      const userData: User = {
        ...user,
        updatedAt: new Date(),
      };
      await setDoc(userDocRef, userData, { merge: true });
  
      toast({
        title: 'Portfolio Saved!',
        description: 'Your changes have been successfully saved.',
      });
    } catch (error: any) {
      console.error('Error saving portfolio:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem with saving your portfolio.',
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
          <div className="flex items-center gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="ghost" size="icon" onClick={onTogglePreview}>
                            <Eye className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isPreviewCollapsed ? 'Show Preview' : 'Hide Preview'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
            </Button>
          </div>
      </div>
      <div className="p-6 space-y-6 h-full overflow-y-auto">
        <Accordion type="multiple" defaultValue={['profile', 'projects', 'template']} className="w-full space-y-4">
            <ProfileForm user={user} onUserChange={handleUserChange} />
            <ProjectsList projects={projects} setProjects={setProjects} />
            <AccordionItem value="template">
              <AccordionTrigger className="p-4 bg-background rounded-lg border shadow-sm text-base font-medium">
                Template
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="bg-background p-4 rounded-b-lg border-x border-b">
                  <TemplateSelector 
                    selectedTemplate={user.selectedTemplate}
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
