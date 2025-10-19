import { User, Project } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  username: 'janedoe',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  bio: "Full-stack developer with a passion for creating beautiful and functional web applications. I specialize in the MERN stack and love exploring new technologies. When I'm not coding, you can find me hiking or playing the guitar.",
  skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'Firebase', 'Tailwind CSS', 'GraphQL', 'Docker'],
  selectedTheme: 'minimal-light',
  createdAt: new Date('2023-01-15T09:30:00Z'),
  updatedAt: new Date(),
};

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    userId: 'user-1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with a custom CMS, payment gateway integration, and a recommendation engine. Built with Next.js, it offers server-side rendering for fast page loads and improved SEO. The backend is powered by Node.js and a PostgreSQL database.',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
    githubLink: 'https://github.com',
    liveDemo: 'https://example.com',
    createdAt: new Date('2023-03-20T14:00:00Z'),
    updatedAt: new Date('2023-05-10T11:00:00Z'),
  },
  {
    id: 'proj-2',
    userId: 'user-1',
    title: 'Real-time Chat Application',
    description: 'A WebSocket-based chat application allowing users to create rooms, send direct messages, and share files. Firebase is used for authentication and real-time data synchronization across clients, ensuring a seamless user experience.',
    techStack: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    githubLink: 'https://github.com',
    createdAt: new Date('2023-06-05T18:45:00Z'),
    updatedAt: new Date('2023-06-05T18:45:00Z'),
  },
  {
    id: 'proj-3',
    userId: 'user-1',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets. Using D3.js, it provides various chart types, data filtering, and the ability to export views. The application is built as a single-page app with React for a highly responsive interface.',
    techStack: ['React', 'D3.js', 'Redux', 'Express'],
    githubLink: 'https://github.com',
    liveDemo: 'https://example.com',
    createdAt: new Date('2022-11-10T10:00:00Z'),
    updatedAt: new Date('2023-02-01T16:20:00Z'),
  },
];
