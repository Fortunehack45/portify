
import { notFound } from 'next/navigation';
import { getFirebaseForServer } from '@/firebase/server';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import type { User, Project, Portfolio } from '@/types';

export default async function SpecificPortfolioPage({ params }: { params: { username: string, portfolioSlug: string } }) {
  const { username, portfolioSlug } = params;
  const { firestore } = getFirebaseForServer();

  if (!firestore) {
    console.error("Firestore is not initialized on the server.");
    notFound();
  }

  try {
    // 1. Get User ID from username
    const usernameRef = doc(firestore, 'usernames', username.toLowerCase());
    const usernameSnap = await getDoc(usernameRef);
    if (!usernameSnap.exists()) {
      console.log(`Username document not found for: ${username.toLowerCase()}`);
      notFound();
    }
    const { userId } = usernameSnap.data();

    // 2. Get User Profile
    const userRef = doc(firestore, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.log(`User profile not found for userId: ${userId}`);
      notFound();
    }
    const user = { id: userSnap.id, ...userSnap.data() } as User;

    // 3. Get the specific portfolio by slug
    const portfolioQuery = query(
        collection(firestore, 'portfolios'), 
        where('userId', '==', userId), 
        where('slug', '==', portfolioSlug), 
        limit(1)
    );
    const portfolioSnapshot = await getDocs(portfolioQuery);
    if (portfolioSnapshot.empty) {
      console.log(`Portfolio not found for slug: ${portfolioSlug}`);
      notFound();
    }
    const portfolioDoc = portfolioSnapshot.docs[0];
    const portfolio = { id: portfolioDoc.id, ...portfolioDoc.data() } as Portfolio;

    // 4. Get Projects
    let projects: Project[] = [];
    if (portfolio.projectIds && portfolio.projectIds.length > 0) {
        // Firestore 'in' queries are limited to 30 items per query.
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
    
    return (
      <TemplateRenderer
        template={portfolio.selectedTemplate}
        user={user}
        projects={projects}
      />
    );

  } catch (err: any) {
    console.error("Error fetching portfolio data:", err);
    // In case of permission errors or other server issues, treat as not found.
    notFound();
  }
}
