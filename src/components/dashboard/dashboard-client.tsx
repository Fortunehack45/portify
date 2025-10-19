'use client';

import { useState, useEffect } from 'react';
import type { User, Project, Theme } from '@/types';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';
import { Save } from 'lucide-react';
import ProfileForm from './profile-form';
import ProjectsList from './projects-list';
import ThemeSelector from './theme-selector';
import PreviewPanel from './preview-panel';
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { doc, setDoc, serverTimestamp, collection, addDoc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface DashboardClientProps {
  initialUser: User;
  initialProjects: Project[];
}

export default function DashboardClient({
  initialUser,
  initialProjects,
}: DashboardClientProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(initialUser.selectedTheme);

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
      // Save user profile
      const userDocRef = doc(firestore, 'users', authUser.uid);
      const userData: Partial<User> = {
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
  
  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
    handleUserChange({ selectedTheme: theme });
  };


  return (
    <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-4rem)]">
      <ResizablePanel defaultSize={40} minSize={30}>
        <ScrollArea className="h-full">
          <div className="p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Portfolio
              </Button>
            </div>
            <ProfileForm user={user} onUserChange={handleUserChange} />
            <ThemeSelector 
              selectedTheme={selectedTheme} 
              onThemeChange={handleThemeChange} 
              projects={projects}
            />
            <ProjectsList projects={projects} setProjects={setProjects} />
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={30}>
        <PreviewPanel user={{ ...user, selectedTheme }} projects={projects} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
