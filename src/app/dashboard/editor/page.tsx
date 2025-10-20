

'use client';

import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser, useCollection, useDoc, useFirestore } from '@/firebase';
import { collection, query, where, doc, getDocs } from 'firebase/firestore';
import type { User, Project, Portfolio } from '@/types';
import EditorClient from '@/components/dashboard/editor-client';
import PreviewPanel from '@/components/dashboard/preview-panel';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';

const EDITOR_TAB_STORAGE_KEY = 'portify-editor-active-tab';

export default function EditorPage() {
  const { user: authUser, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const panelGroupRef = React.useRef<ImperativePanelGroupHandle>(null);
  
  const portfolioId = searchParams.get('portfolioId');

  const [activeTab, setActiveTab] = useState('editor');
  const [liveUser, setLiveUser] = useState<User | null>(null);
  const [liveProjects, setLiveProjects] = useState<Project[]>([]);
  const [livePortfolio, setLivePortfolio] = useState<Portfolio | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(true);

  // If no portfolioId is present, find the primary one and redirect.
  useEffect(() => {
    if (!portfolioId && firestore && authUser && !userLoading) {
      const findAndRedirect = async () => {
        const q = query(
          collection(firestore, 'portfolios'),
          where('userId', '==', authUser.uid),
          where('isPrimary', '==', true)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const primaryPortfolio = snapshot.docs[0];
          router.replace(`/dashboard/editor?portfolioId=${primaryPortfolio.id}`);
        } else {
          // If no primary, try to find *any* portfolio
          const anyPortfolioQuery = query(collection(firestore, 'portfolios'), where('userId', '==', authUser.uid));
          const anySnapshot = await getDocs(anyPortfolioQuery);
          if(!anySnapshot.empty) {
            router.replace(`/dashboard/editor?portfolioId=${anySnapshot.docs[0].id}`);
          } else {
            // No portfolios exist for the user, redirect to dashboard to create one.
            router.replace('/dashboard');
          }
        }
      };
      findAndRedirect();
    } else {
      setIsRedirecting(false);
    }
  }, [portfolioId, firestore, authUser, userLoading, router]);

  // Fetch user profile
  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);
  const { data: userProfile, loading: profileLoading } = useDoc<User>(userProfileRef);

  // Fetch all user projects
  const projectsQuery = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'projects'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);
  const { data: projects, loading: projectsLoading } = useCollection<Project>(projectsQuery);

  // Fetch the specific portfolio to edit
  const portfolioRef = useMemoFirebase(() => {
    if (!firestore || !portfolioId) return null;
    return doc(firestore, 'portfolios', portfolioId);
  }, [firestore, portfolioId]);
  const { data: portfolio, loading: portfolioLoading } = useDoc<Portfolio>(portfolioRef);

  useEffect(() => {
    if (userProfile) setLiveUser(userProfile);
  }, [userProfile]);

  useEffect(() => {
    if (projects) setLiveProjects(projects);
  }, [projects]);
  
  useEffect(() => {
    if (portfolio) setLivePortfolio(portfolio);
  }, [portfolio]);

  useEffect(() => {
    const savedTab = localStorage.getItem(EDITOR_TAB_STORAGE_KEY);
    if (savedTab) setActiveTab(savedTab);
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem(EDITOR_TAB_STORAGE_KEY, value);
  };
  
  const handleTogglePreview = () => {
    const panelGroup = panelGroupRef.current;
    if (!panelGroup) return;
    const layout = panelGroup.getLayout();
    panelGroup.setLayout(layout[1] === 0 ? [50, 50] : [100, 0]);
  };

  const isLoading = isRedirecting || userLoading || profileLoading || projectsLoading || portfolioLoading || !liveUser || !livePortfolio;

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading editor...</div>;
  }
  
  if (isMobile) {
    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col -m-4 md:-m-6 h-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none h-14">
                <TabsTrigger value="editor" className="text-base h-full rounded-none">Editor</TabsTrigger>
                <TabsTrigger value="preview" className="text-base h-full rounded-none">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="flex-grow overflow-y-auto">
                <EditorClient 
                  user={liveUser as User} portfolio={livePortfolio as Portfolio} projects={liveProjects}
                  onUserChange={setLiveUser} onPortfolioChange={setLivePortfolio} onProjectsChange={setLiveProjects}
                  onTogglePreview={handleTogglePreview}
                  isMobile={isMobile}
                />
            </TabsContent>
            <TabsContent value="preview" className="flex-grow overflow-y-auto bg-muted/30">
                <div className="w-full h-full bg-white">
                    <PreviewPanel user={liveUser as User} portfolio={livePortfolio as Portfolio} projects={liveProjects} isMobile={true} />
                </div>
            </TabsContent>
        </Tabs>
    );
  }
  
  return (
    <div className="flex flex-col h-full -m-4 lg:-m-6">
      <ResizablePanelGroup ref={panelGroupRef} direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={50} minSize={30}>
          <EditorClient 
            user={liveUser as User} portfolio={livePortfolio as Portfolio} projects={liveProjects}
            onUserChange={setLiveUser} onPortfolioChange={setLivePortfolio} onProjectsChange={setLiveProjects}
            onTogglePreview={handleTogglePreview}
            isMobile={isMobile}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30} collapsible={true} collapsedSize={0}>
          <PreviewPanel 
            user={liveUser as User} portfolio={livePortfolio as Portfolio} projects={liveProjects}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
