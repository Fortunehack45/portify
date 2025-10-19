import DashboardClient from '@/components/dashboard/dashboard-client';
import { mockUser, mockProjects } from '@/lib/mock-data';

// Mock data fetching functions
async function getAuthenticatedUser() {
  // In a real app, this would get the logged-in user from Firebase Auth
  return Promise.resolve(mockUser);
}

async function getProjectsForUser(userId: string) {
  // In a real app, this would fetch projects from Firestore
  return Promise.resolve(mockProjects.filter(p => p.userId === userId));
}

export default async function DashboardPage() {
  // In a real app, you'd have logic to handle unauthenticated users,
  // probably in middleware or a layout.
  const user = await getAuthenticatedUser();
  const projects = await getProjectsForUser(user.id);

  return <DashboardClient initialUser={user} initialProjects={projects} />;
}
