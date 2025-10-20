
import { notFound } from 'next/navigation';
import { getFirebaseForServer } from '@/firebase/server';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import type { User, Project, Portfolio } from '@/types';

async function getPortfolioData(username: string, portfolioSlug: string) {
  const { firestore } = getFirebaseForServer();
  if (!firestore) {
    console.error("Firestore is not initialized on the server.");
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
    const portfolioQuery = query(
        portfolioRef, 
        where('userId', '==', userId), 
        where('slug', '==', portfolioSlug), 
        limit(1)
    );
    const portfolioSnapshot = await getDocs(portfolioQuery);

    if (portfolioSnapshot.empty) {
      console.log(`Portfolio not found for slug: ${portfolioSlug}`);
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
    // In a server component, throwing an error will be caught by Next.js error boundaries.
    // For permission errors, we might want to log it and return null to trigger a 404.
    if (err.code === 'permission-denied') {
      console.error(`Firestore Permission Denied: Could not fetch portfolio for user "${username}" with slug "${portfolioSlug}". Check your Firestore security rules.`);
    }
    return null;
  }
}

export default async function SpecificPortfolioPage({ params }: { params: { username: string, portfolioSlug: string } }) {
  const { username, portfolioSlug } = params;
  const data = await getPortfolioData(username, portfolioSlug);

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
