
'use client';

import * as React from 'react';
import EditorClient from '@/components/dashboard/editor-client';
import { useUser, useCollection, useDoc, useFirestore } from '@/firebase';
import { collection, query, where, doc, Timestamp } from 'firebase/firestore';
import type { User, Project, Portfolio } from '@/types';
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
import { useMemoFirebase } from '@/hooks/use-memo-firebase';
import { useSearchParams } from 'next/navigation';

const EDITOR_TAB_STORAGE_KEY = 'folioforge-editor-active-tab';

export default function EditorPage() {
  const { user: authUser, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const isMobile = useIsMobile();
  const panelGroupRef = React.useRef<ImperativePanelGroupHandle>(null);
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolioId');

  const [activeTab, setActiveTab] = useState('editor');
  const [liveUser, setLiveUser] = useState<User | null>(null);
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);
  const [livePortfolio, setLivePortfolio] = useState<Portfolio | null>(null);

  // Fetch all user projects
  const projectsQuery = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);

  const { data: projects, loading: projectsLoading } = useCollection<Project>(
    projectsQuery
  );

  // Fetch the specific portfolio to edit (or the primary one if no ID is specified)
  const portfolioRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    if (portfolioId) {
      return doc(firestore, 'portfolios', portfolioId);
    }
    // This part will be handled by the collection query below if no ID is given
    return null;
  }, [firestore, authUser, portfolioId]);

  const { data: singlePortfolio, loading: singlePortfolioLoading } = useDoc<Portfolio>(portfolioRef);

  const primaryPortfolioQuery = useMemoFirebase(() => {
    // Only run this query if there's no portfolioId
    if (!firestore || !authUser || portfolioId) return null;
    return query(collection(firestore, 'portfolios'), where('userId', '==', authUser.uid), where('isPrimary', '==', true));
  }, [firestore, authUser, portfolioId]);

  const { data: primaryPortfolios, loading: primaryPortfolioLoading } = useCollection<Portfolio>(primaryPortfolioQuery);

  const portfolio = portfolioId ? singlePortfolio : (primaryPortfolios && primaryPortfolios[0]);
  const portfolioLoading = portfolioId ? singlePortfolioLoading : primaryPortfolioLoading;


  // Fetch user profile
  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, loading: profileLoading } = useDoc<User>(userProfileRef);

  useEffect(() => {
    if (userProfile) {
      setLiveUser(userProfile);
    } else if (authUser && !profileLoading && !userProfile) {
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
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
  }, [authUser, userProfile, profileLoading]);

  useEffect(() => {
    if (portfolio) {
      setLivePortfolio(portfolio);
    }
  }, [portfolio]);


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

  const isLoading = userLoading || projectsLoading || profileLoading || portfolioLoading || !liveUser || !livePortfolio;
  
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
                  portfolio={livePortfolio as Portfolio}
                  projects={liveProjects}
                  onUserChange={setLiveUser}
                  onPortfolioChange={setLivePortfolio}
                  onProjectsChange={setLiveProjects}
                />
            </TabsContent>
            <TabsContent value="preview" className="flex-grow overflow-y-auto bg-muted/30">
                <div className="w-full h-full bg-white">
                    <PreviewPanel 
                        user={liveUser as User} 
                        portfolio={livePortfolio as Portfolio}
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
          if (typeof document !== 'undefined') {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
          }
        }}
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <EditorClient 
            user={liveUser as User}
            portfolio={livePortfolio as Portfolio}
            projects={liveProjects}
            onUserChange={setLiveUser}
            onPortfolioChange={setLivePortfolio}
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
            portfolio={livePortfolio as Portfolio}
            projects={liveProjects}
            onTogglePreview={handleTogglePreview}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
