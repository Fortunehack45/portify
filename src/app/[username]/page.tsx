
'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import type { User, Project, Portfolio } from '@/types';
import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const usePortfolioData = (username: string) => {
  const firestore = useFirestore();
  const [data, setData] = useState<{ user: User; projects: Project[], portfolio: Portfolio } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firestore || !username) {
      setLoading(false);
      return;
    }

    const fetchPortfolio = async () => {
      setLoading(true);
      setError(null);
      try {
        const lookupUsername = username.toLowerCase();
        
        const usernameRef = doc(firestore, 'usernames', lookupUsername);
        const usernameSnap = await getDoc(usernameRef);

        if (!usernameSnap.exists()) {
          setError('User not found');
          setData(null);
          setLoading(false);
          notFound();
          return;
        }

        const { userId } = usernameSnap.data();

        const userRef = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            setError('User profile not found');
            setData(null);
            setLoading(false);
            notFound();
            return;
        }

        const user = { id: userSnap.id, ...userSnap.data() } as User;

        // Fetch the primary portfolio
        const portfolioRef = collection(firestore, 'portfolios');
        const portfolioQuery = query(portfolioRef, where('userId', '==', userId), where('isPrimary', '==', true), limit(1));
        const portfolioSnapshot = await getDocs(portfolioQuery);

        if (portfolioSnapshot.empty) {
            setError('Primary portfolio not found');
            setData(null);
            setLoading(false);
            notFound();
            return;
        }

        const portfolio = { id: portfolioSnapshot.docs[0].id, ...portfolioSnapshot.docs[0].data() } as Portfolio;

        let projects: Project[] = [];
        if (portfolio.projectIds && portfolio.projectIds.length > 0) {
            const projectsRef = collection(firestore, 'projects');
            // Firestore 'in' query is limited to 30 items. If more, we need multiple queries.
            // For now, assuming less than 30 projects per portfolio for simplicity.
            const projectsQuery = query(projectsRef, where('__name__', 'in', portfolio.projectIds));
            const projectsSnapshot = await getDocs(projectsQuery);
            projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        }
        
        setData({ user, projects, portfolio });

      } catch (err: any) {
        if (err.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
              path: `usernames/${username.toLowerCase()}`, 
              operation: 'get', 
            });
            errorEmitter.emit('permission-error', permissionError);
            setError('Failed to fetch data due to permission issues.');
        } else {
            setError('An unexpected error occurred.');
            console.error("Portfolio fetch error:", err);
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [firestore, username]);

  return { data, loading, error };
};


export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  
  const { data, loading, error } = usePortfolioData(username);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }

  if (error || !data?.user || !data?.portfolio) {
    if (error?.includes('permission')) {
      throw new Error(`Firestore Permission Denied: Could not fetch portfolio for user "${username}". Check your Firestore security rules to allow public reads on 'users' and 'projects' collections.`);
    }
    notFound();
  }

  return (
    <TemplateRenderer
      template={data.portfolio.selectedTemplate}
      user={data.user}
      projects={data.projects}
    />
  );
}
