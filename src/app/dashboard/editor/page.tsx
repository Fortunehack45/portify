'use client';

import EditorClient from '@/components/dashboard/editor-client';
import { useUser, useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PreviewPanel from '@/components/dashboard/preview-panel';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditorPage() {
  const { user: authUser, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const isMobile = useIsMobile();
  const [panelLayout, setPanelLayout] = useState([50, 50]);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);

  const [initialUser, setInitialUser] = useState<User | null>(null);
  const [initialProjects, setInitialProjects] = useState<Project[]>([]);

  const projectsQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);

  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery
  );

  const userProfileQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'users'), where('id', '==', authUser.uid));
  }, [firestore, authUser]);

  const { data: userProfile, loading: profileLoading } = useCollection<User>(userProfileQuery);

  useEffect(() => {
    if (userProfile && userProfile.length > 0) {
      setInitialUser(userProfile[0]);
    } else if (authUser && !profileLoading && (!userProfile || userProfile.length === 0)) {
      setInitialUser({
        id: authUser.uid,
        email: authUser.email || '',
        name: authUser.displayName || 'New User',
        username: authUser.displayName?.replace(/\s+/g, '').toLowerCase() || 'newuser',
        bio: '',
        jobTitle: '',
        location: '',
        availability: 'not available',
        skills: [],
        socials: [],
        selectedTemplate: 'minimal-light',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }, [authUser, userProfile, profileLoading]);

  useEffect(() => {
    if (projects) {
      const formattedProjects = projects.map(p => ({
        ...p,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));
      setInitialProjects(formattedProjects);
    }
  }, [projects]);

  const isLoading = userLoading || projectsLoading || profileLoading || !initialUser;
  
  const handleLayout = (sizes: number[]) => {
    setPanelLayout(sizes);
    setIsPreviewCollapsed(sizes[1] === 0);
  };

  const togglePreview = () => {
    if (isPreviewCollapsed) {
        setPanelLayout([50, 50]);
    } else {
        setPanelLayout([100, 0]);
    }
    setIsPreviewCollapsed(!isPreviewCollapsed);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading editor...</div>;
  }
  
  // Mobile View
  if (isMobile) {
    return (
        <Tabs defaultValue="editor" className="w-full flex flex-col -m-4 md:-m-6 h-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none h-14">
                <TabsTrigger value="editor" className="text-base h-full rounded-none">Editor</TabsTrigger>
                <TabsTrigger value="preview" className="text-base h-full rounded-none">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="flex-grow overflow-y-auto">
                <EditorClient initialUser={initialUser as User} initialProjects={initialProjects} />
            </TabsContent>
            <TabsContent value="preview" className="flex-grow overflow-y-auto bg-muted/30">
                <div className="w-full h-full bg-white">
                    <PreviewPanel 
                        user={initialUser as User} 
                        projects={initialProjects} 
                        isMobile={true} 
                    />
                </div>
            </TabsContent>
        </Tabs>
    );
  }
  
  // Desktop View
  return (
    <div className="flex flex-col h-full -m-4 lg:-m-6">
      <ResizablePanelGroup 
        direction="horizontal" 
        className="flex-grow"
        onLayout={handleLayout}
      >
        <ResizablePanel defaultSize={panelLayout[0]} minSize={30}>
          <EditorClient initialUser={initialUser as User} initialProjects={initialProjects} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel 
            defaultSize={panelLayout[1]} 
            minSize={30}
            collapsible={true}
            collapsedSize={0}
            onCollapse={() => setIsPreviewCollapsed(true)}
            onExpand={() => setIsPreviewCollapsed(false)}
        >
          <PreviewPanel 
            user={initialUser as User} 
            projects={initialProjects}
            isCollapsed={isPreviewCollapsed}
            onToggle={togglePreview}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
