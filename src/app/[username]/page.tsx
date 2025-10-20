
import { notFound } from 'next/navigation';
import { getFirebase } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import type { User, Project, Portfolio } from '@/types';

async function getPortfolioData(username: string) {
  const { firestore } = getFirebase();
  if (!firestore) {
    console.error("Firestore is not initialized.");
    return null;
  }

  try {
    const lookupUsername = username.toLowerCase();
    
    const usernameRef = doc(firestore, 'usernames', lookupUsername);
    const usernameSnap = await getDoc(usernameRef);

    if (!usernameSnap.exists()) {
      console.log(`Username document not found for: ${lookupUsername}`);
      return null;
    }

    const { userId } = usernameSnap.data();

    const userRef = doc(firestore, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log(`User profile not found for userId: ${userId}`);
      return null;
    }

    const user = { id: userSnap.id, ...userSnap.data() } as User;

    const portfolioRef = collection(firestore, 'portfolios');
    const portfolioQuery = query(portfolioRef, where('userId', '==', userId), where('isPrimary', '==', true), limit(1));
    const portfolioSnapshot = await getDocs(portfolioQuery);

    if (portfolioSnapshot.empty) {
      console.log(`Primary portfolio not found for userId: ${userId}`);
      return null;
    }

    const portfolio = { id: portfolioSnapshot.docs[0].id, ...portfolioSnapshot.docs[0].data() } as Portfolio;

    let projects: Project[] = [];
    if (portfolio.projectIds && portfolio.projectIds.length > 0) {
        const projectChunks: string[][] = [];
        for (let i = 0; i < portfolio.projectIds.length; i += 30) {
          projectChunks.push(portfolio.projectIds.slice(i, i + 30));
        }
        
        const projectPromises = projectChunks.map(chunk => 
          getDocs(query(collection(firestore, 'projects'), where('__name__', 'in', chunk)))
        );
        
        const projectSnapshots = await Promise.all(projectPromises);
        projects = projectSnapshots.flatMap(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    }
    
    return { user, projects, portfolio };

  } catch (err: any) {
    console.error("Error fetching portfolio data:", err);
    // Re-throw permission errors to be caught by Next.js error boundary in dev
    if (err.code === 'permission-denied') {
      throw new Error(`Firestore Permission Denied: Could not fetch primary portfolio for user "${username}". Check your Firestore security rules.`);
    }
    return null;
  }
}

export default async function UserPortfolioPage({ params }: { params: { username: string } }) {
  const { username } = params;
  const data = await getPortfolioData(username);

  if (!data) {
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
