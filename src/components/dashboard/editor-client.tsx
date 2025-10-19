'use client';

import { useState, useEffect } from 'react';
import type { User, Project } from '@/types';
import { Button } from '../ui/button';
import { Save, Eye, PanelRightClose, PanelRightOpen } from 'lucide-react';
import ProfileForm from './profile-form';
import ProjectsList from './projects-list';
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Accordion } from '@/components/ui/accordion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable';
import PreviewPanel from './preview-panel';

interface EditorClientProps {
  initialUser: User;
  initialProjects: Project[];
}

export default function EditorClient({
  initialUser,
  initialProjects,
}: EditorClientProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);

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
    <div className="flex flex-col h-full -m-4 lg:-m-6">
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b bg-background">
          <div className="space-y-1">
              <h1 className="text-2xl font-bold font-headline">Editor</h1>
              <p className="text-muted-foreground text-sm">Update your profile, skills, and projects.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
                {isPreviewOpen ? <PanelRightClose className="mr-2 h-4 w-4"/> : <PanelRightOpen className="mr-2 h-4 w-4"/>}
                Preview
            </Button>
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Portfolio
            </Button>
          </div>
      </div>
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="p-6 space-y-6 h-full overflow-y-auto">
            <Accordion type="multiple" defaultValue={['profile', 'projects']} className="w-full space-y-4">
                <ProfileForm user={user} onUserChange={handleUserChange} />
                <ProjectsList projects={projects} setProjects={setProjects} />
            </Accordion>
          </div>
        </ResizablePanel>
        {isPreviewOpen && (
           <>
             <ResizableHandle withHandle />
             <ResizablePanel defaultSize={50} minSize={30}>
                <PreviewPanel user={user} projects={projects} />
             </ResizablePanel>
           </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
