export type Project = {
  id: string;
  userId: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveDemo?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  selectedTheme: Theme;
  createdAt: Date;
  updatedAt: Date;
};

export type Theme = 'minimal-light' | 'modern-dark' | 'professional-blue';
