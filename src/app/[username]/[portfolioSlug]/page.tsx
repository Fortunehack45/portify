
import { notFound } from 'next/navigation';
import TemplateRenderer from '@/components/templates/template-renderer';
import type { User, Project, Portfolio } from '@/types';
import { adminDb } from '@/firebase/server-admin';
import { Timestamp } from 'firebase-admin/firestore';

export default async function SpecificPortfolioPage({ params }: { params: { username: string, portfolioSlug: string } }) {
  const { username, portfolioSlug } = params;

  try {
    // 1. Get User ID from username
    const usernameDoc = await adminDb.collection('usernames').doc(username.toLowerCase()).get();
    
    if (!usernameDoc.exists) {
      console.log(`Username document not found for: ${username.toLowerCase()}`);
      notFound();
    }
    const { userId } = usernameDoc.data()!;

    // 2. Get User Profile
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      console.log(`User profile not found for userId: ${userId}`);
      notFound();
    }

    const convertTimestamp = (data: any): any => {
        if (!data) return data;
        const newData: { [key: string]: any } = {};
        for (const key in data) {
          const value = data[key];
          if (value instanceof Timestamp) {
            newData[key] = value.toDate();
          } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            newData[key] = convertTimestamp(value);
          } else if (Array.isArray(value)) {
            newData[key] = value.map(item => (typeof item === 'object' ? convertTimestamp(item) : item));
          } else {
            newData[key] = value;
          }
        }
        return newData;
    }

    const user = { id: userDoc.id, ...convertTimestamp(userDoc.data()) } as User;


    // 3. Get the specific portfolio by slug
    const portfolioSnapshot = await adminDb.collection('portfolios')
        .where('userId', '==', userId)
        .where('slug', '==', portfolioSlug)
        .limit(1)
        .get();

    if (portfolioSnapshot.empty) {
      console.log(`Portfolio not found for slug: ${portfolioSlug}`);
      notFound();
    }
    const portfolioDoc = portfolioSnapshot.docs[0];
    const portfolio = { id: portfolioDoc.id, ...convertTimestamp(portfolioDoc.data()) } as Portfolio;

    // 4. Get Projects
    let projects: Project[] = [];
    if (portfolio.projectIds && portfolio.projectIds.length > 0) {
        // Firestore 'in' queries are limited to 30 items per query.
        const projectChunks: string[][] = [];
        for (let i = 0; i < portfolio.projectIds.length; i += 30) {
          projectChunks.push(portfolio.projectIds.slice(i, i + 30));
        }
        
        const projectPromises = projectChunks.map(chunk => 
            adminDb.collection('projects').where('__name__', 'in', chunk).get()
        );
        
        const projectSnapshots = await Promise.all(projectPromises);
        projects = projectSnapshots.flatMap(snap => snap.docs.map(doc => ({ id: doc.id, ...convertTimestamp(doc.data()) } as Project)));
    }
    
    return (
      <TemplateRenderer
        template={portfolio.selectedTemplate}
        user={user}
        projects={projects}
      />
    );

  } catch (err: any) {
    console.error("Error fetching portfolio data with Admin SDK:", err);
    // If there's an error with the admin SDK, it's likely a config issue, not a permissions one.
    // We'll treat it as a not-found to the public user, but the error will be in the server logs.
    notFound();
  }
}
