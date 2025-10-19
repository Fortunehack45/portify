// This is a server component by default
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { mockUser, mockProjects } from '@/lib/mock-data';
import ThemeRenderer from '@/components/themes/theme-renderer';

interface PageProps {
  params: {
    username: string;
  };
}

// Mock function to fetch user data. In a real app, this would query Firebase.
async function getUserByUsername(username: string) {
  if (username === mockUser.username) {
    return mockUser;
  }
  return null;
}

// Mock function to fetch projects.
async function getProjectsByUserId(userId: string) {
  return mockProjects.filter((p) => p.userId === userId);
}


export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return {
      title: 'User Not Found',
    }
  }

  return {
    title: `${user.name} | Portfolio`,
    description: user.bio,
    openGraph: {
      title: `${user.name} | Portfolio`,
      description: user.bio,
      images: [
        {
          url: `https://picsum.photos/seed/${user.username}/1200/630`,
          width: 1200,
          height: 630,
          alt: user.name,
        },
      ],
    },
  }
}

export default async function UserPortfolioPage({ params }: PageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const projects = await getProjectsByUserId(user.id);
  
  return (
    <ThemeRenderer 
      theme={user.selectedTheme}
      user={user}
      projects={projects}
    />
  );
}

// This function can be used to generate static paths if you have a list of users
// For a fully dynamic app, this might not be needed if you're using server-side rendering on-demand.
// export async function generateStaticParams() {
//   // In a real app, fetch all usernames from your database
//   const users = [{ username: 'janedoe' }];
 
//   return users.map((user) => ({
//     username: user.username,
//   }));
// }
