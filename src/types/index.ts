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

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'website';

export type Social = {
  platform: SocialPlatform;
  url: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  socials: Social[];
  selectedTemplate: Template;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
};

export type Template = 
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