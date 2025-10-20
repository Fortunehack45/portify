
'use client';

import EditorClient from '@/components/dashboard/editor-client';
import { useUser, useCollection, useDoc, useFirestore } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState, useMemo, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PreviewPanel from '@/components/dashboard/preview-panel';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';

const EDITOR_TAB_STORAGE_KEY = 'folioforge-editor-active-tab';

export default function EditorPage() {
  const { user: authUser, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const isMobile = useIsMobile();
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  
  const [activeTab, setActiveTab] = useState('editor');
  const [liveUser, setLiveUser] = useState<User | null>(null);
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);
  
  const projectsQuery = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);

  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery
  );

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, loading: profileLoading } = useDoc<User>(userProfileRef);

  useEffect(() => {
    if (userProfile) {
      setLiveUser(userProfile);
    } else if (authUser && !profileLoading && !userProfile) {
      // If authUser exists but there's no profile, create a default one in state
      setLiveUser({
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
      setLiveProjects(formattedProjects);
    }
  }, [projects]);
  
  useEffect(() => {
    const savedTab = localStorage.getItem(EDITOR_TAB_STORAGE_KEY);
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem(EDITOR_TAB_STORAGE_KEY, value);
  };

  const isLoading = userLoading || projectsLoading || profileLoading || !liveUser;
  
  const handleTogglePreview = () => {
    const panelGroup = panelGroupRef.current;
    if (panelGroup) {
      const layout = panelGroup.getLayout();
      if (layout[1] === 0) {
        panelGroup.setLayout([50, 50]);
      } else {
        panelGroup.setLayout([100, 0]);
      }
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading editor...</div>;
  }
  
  // Mobile View
  if (isMobile) {
    return (
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full flex flex-col -m-4 md:-m-6 h-full"
        >
            <TabsList className="grid w-full grid-cols-2 rounded-none h-14">
                <TabsTrigger value="editor" className="text-base h-full rounded-none">Editor</TabsTrigger>
                <TabsTrigger value="preview" className="text-base h-full rounded-none">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="flex-grow overflow-y-auto">
                <EditorClient 
                  user={liveUser as User} 
                  projects={liveProjects}
                  onUserChange={setLiveUser}
                  onProjectsChange={setLiveProjects}
                />
            </TabsContent>
            <TabsContent value="preview" className="flex-grow overflow-y-auto bg-muted/30">
                <div className="w-full h-full bg-white">
                    <PreviewPanel 
                        user={liveUser as User} 
                        projects={liveProjects} 
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
        ref={panelGroupRef}
        direction="horizontal" 
        className="flex-grow"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <EditorClient 
            user={liveUser as User} 
            projects={liveProjects}
            onUserChange={setLiveUser}
            onProjectsChange={setLiveProjects}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel 
            defaultSize={50}
            minSize={30}
            collapsible={true}
            collapsedSize={0}
        >
          <PreviewPanel 
            user={liveUser as User} 
            projects={liveProjects}
            onTogglePreview={handleTogglePreview}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
