'use client';

import React, { lazy, Suspense } from 'react';
import type { User, Project, Template } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const MinimalLight = lazy(() => import('./minimal-light'));
const ModernDark = lazy(() => import('./modern-dark'));
const ProfessionalBlue = lazy(() => import('./professional-blue'));
const RetroGamer = lazy(() => import('./retro-gamer'));
const BrutalistWeb = lazy(() => import('./brutalist-web'));
const CyberpunkNeon = lazy(() => import('./cyberpunk-neon'));
const ElegantSerif = lazy(() => import('./elegant-serif'));
const CosmicDream = lazy(() => import('./cosmic-dream'));
const HackerTerminal = lazy(() => import('./hacker-terminal'));
const CraftsmanPaper = lazy(() => import('./craftsman-paper'));
const PhotoGrid = lazy(() => import('./photo-grid'));
const LakesideDawn = lazy(() => import('./lakeside-dawn'));
const GeometricDark = lazy(() => import('./geometric-dark'));
const MinimalSerif = lazy(() => import('./minimal-serif'));
const CorporateClean = lazy(() => import('./corporate-clean'));
const Glassmorphism = lazy(() => import('./glassmorphism'));
const Neobrutalism = lazy(() => import('./neobrutalism'));
const Storybook = lazy(() => import('./storybook'));
const TwoColumnImage = lazy(() => import('./two-column-image'));
const BoldAndBlue = lazy(() => import('./bold-and-blue'));
const Newspaper = lazy(() => import('./newspaper'));
const DarkAcademia = lazy(() => import('./dark-academia'));

interface TemplateProps {
  user: User;
  projects: Project[];
}

const templateMap: Record<Template, React.LazyExoticComponent<React.FC<TemplateProps>>> = {
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

  return (
    <Suspense fallback={<TemplateSkeleton />}>
      <SelectedTemplate user={user} projects={projects} />
    </Suspense>
  );
};

const TemplateSkeleton = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl animate-pulse">
    <header className="flex items-center gap-8 mb-12">
      <Skeleton className="w-[150px] h-[150px] rounded-full" />
      <div className="space-y-4 flex-1">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </header>
    <section className="mb-16">
      <Skeleton className="h-10 w-1/3 mb-6" />
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-24 rounded-full" />)}
      </div>
    </section>
    <section>
      <Skeleton className="h-10 w-1/3 mb-8" />
      <div className="grid gap-8">
        <div className="space-y-4 p-6 border rounded-lg">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </section>
  </div>
)


export default TemplateRenderer;
