'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import TemplateRenderer from '@/components/templates/template-renderer';
import type { User, Project, Portfolio } from '@/types';
import { Logo } from '@/components/icons';

export default function SpecificPortfolioPage({ params }: { params: { username: string, portfolioSlug: string } }) {
  const { username, portfolioSlug } = params;
  const firestore = useFirestore();

  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!firestore) return;

      try {
        setLoading(true);
        // 1. Get User ID from username
        const usernameDocRef = doc(firestore, 'usernames', username.toLowerCase());
        const usernameDoc = await getDoc(usernameDocRef);
        
        if (!usernameDoc.exists()) {
          throw new Error(`Username not found: ${username}`);
        }
        const { userId } = usernameDoc.data();

        // 2. Get User Profile
        const userDocRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          throw new Error(`User profile not found for userId: ${userId}`);
        }
        setUser({ id: userDoc.id, ...userDoc.data() } as User);

        // 3. Get the specific portfolio by slug
        const portfoliosRef = collection(firestore, 'portfolios');
        const portfolioQuery = query(portfoliosRef, where('userId', '==', userId), where('slug', '==', portfolioSlug));
        const portfolioSnapshot = await getDocs(portfolioQuery);

        if (portfolioSnapshot.empty) {
          throw new Error(`Portfolio not found for slug: ${portfolioSlug}`);
        }
        const portfolioData = { id: portfolioSnapshot.docs[0].id, ...portfolioSnapshot.docs[0].data() } as Portfolio;
        setPortfolio(portfolioData);

        // 4. Get Projects
        if (portfolioData.projectIds && portfolioData.projectIds.length > 0) {
            const projectChunks: string[][] = [];
            for (let i = 0; i < portfolioData.projectIds.length; i += 30) {
              projectChunks.push(portfolioData.projectIds.slice(i, i + 30));
            }
            
            const fetchedProjects: Project[] = [];
            for (const chunk of projectChunks) {
                const projectsQuery = query(collection(firestore, 'projects'), where('__name__', 'in', chunk));
                const projectsSnapshot = await getDocs(projectsQuery);
                projectsSnapshot.forEach(doc => {
                    fetchedProjects.push({ id: doc.id, ...doc.data() } as Project);
                });
            }
            setProjects(fetchedProjects);
        }
        
      } catch (err: any) {
        console.error("Error fetching portfolio data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [firestore, username, portfolioSlug]);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
            <Logo />
            <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
      </div>
    );
  }

  if (error) {
    notFound();
  }

  if (!user || !portfolio) {
    return notFound();
  }
    
  return (
    <TemplateRenderer
      template={portfolio.selectedTemplate}
      user={user}
      projects={projects}
    />
  );
}
