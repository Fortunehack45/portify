import { Timestamp } from "firebase/firestore";

export type Project = {
  id: string;
  userId: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveDemo?: string;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
};

export type Socials = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  socials?: Socials;
  selectedTheme: Theme;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
};

export type Theme = 
  | 'minimal-light' 
  | 'modern-dark' 
  | 'professional-blue'
  | 'retro-gamer'
  | 'brutalist-web'
  | 'cyberpunk-neon'
  | 'elegant-serif'
  | 'cosmic-dream'
  | 'hacker-terminal'
  | 'craftsman-paper'
  | 'photo-grid'
  | 'lakeside-dawn';
