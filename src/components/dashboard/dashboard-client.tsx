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
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '../ui/card';

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
  const isMobile = useIsMobile();

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
    <ResizablePanelGroup 
      direction={isMobile ? 'vertical' : 'horizontal'} 
      className="h-[calc(100vh-4rem)]"
    >
      <ResizablePanel defaultSize={isMobile ? 50 : 40} minSize={30}>
        <div className="flex flex-col h-full">
            <div className="p-4 md:p-6 border-b flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
                <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Portfolio
                </Button>
            </div>
            <ScrollArea className="flex-grow">
                <Tabs defaultValue="profile" className="p-4 md:p-6">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="theme">Theme</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <ProfileForm user={user} onUserChange={handleUserChange} />
                    </TabsContent>
                    <TabsContent value="theme">
                        <ThemeSelector 
                            selectedTheme={selectedTheme} 
                            onThemeChange={handleThemeChange} 
                            projects={projects}
                        />
                    </TabsContent>
                    <TabsContent value="projects">
                        <ProjectsList projects={projects} setProjects={setProjects} />
                    </TabsContent>
                </Tabs>
            </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={isMobile ? 50 : 60} minSize={30}>
        <PreviewPanel user={{ ...user, selectedTheme }} projects={projects} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
