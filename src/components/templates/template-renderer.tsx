'use client';

import React from 'react';
import type { User, Project, Template } from '@/types';

import MinimalLight from './minimal-light';
import ModernDark from './modern-dark';
import ProfessionalBlue from './professional-blue';
import RetroGamer from './retro-gamer';
import BrutalistWeb from './brutalist-web';
import CyberpunkNeon from './cyberpunk-neon';
import ElegantSerif from './elegant-serif';
import CosmicDream from './cosmic-dream';
import HackerTerminal from './hacker-terminal';
import CraftsmanPaper from './craftsman-paper';
import PhotoGrid from './photo-grid';
import LakesideDawn from './lakeside-dawn';
import GeometricDark from './geometric-dark';
import MinimalSerif from './minimal-serif';
import CorporateClean from './corporate-clean';
import Glassmorphism from './glassmorphism';
import Neobrutalism from './neobrutalism';
import Storybook from './storybook';
import TwoColumnImage from './two-column-image';
import BoldAndBlue from './bold-and-blue';
import Newspaper from './newspaper';
import DarkAcademia from './dark-academia';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const templateMap: Record<Template, React.FC<TemplateProps>> = {
  'minimal-light': MinimalLight,
  'modern-dark': ModernDark,
  'professional-blue': ProfessionalBlue,
  'retro-gamer': RetroGamer,
  'brutalist-web': BrutalistWeb,
  'cyberpunk-neon': CyberpunkNeon,
  'elegant-serif': ElegantSerif,
  'cosmic-dream': CosmicDream,
  'hacker-terminal': HackerTerminal,
  'craftsman-paper': CraftsmanPaper,
  'photo-grid': PhotoGrid,
  'lakeside-dawn': LakesideDawn,
  'geometric-dark': GeometricDark,
  'minimal-serif': MinimalSerif,
  'corporate-clean': CorporateClean,
  'glassmorphism': Glassmorphism,
  'neobrutalism': Neobrutalism,
  'storybook': Storybook,
  'two-column-image': TwoColumnImage,
  'bold-and-blue': BoldAndBlue,
  'newspaper': Newspaper,
  'dark-academia': DarkAcademia,
};

interface TemplateRendererProps {
  template: Template;
  user: User;
  projects: Project[];
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ template, user, projects }) => {
  const SelectedTemplate = templateMap[template] || MinimalLight;

  return <SelectedTemplate user={user} projects={projects} />;
};

export default TemplateRenderer;
