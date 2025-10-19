'use client';

import React, { lazy, Suspense } from 'react';
import type { User, Project, Theme } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const MinimalLight = lazy(() => import('./minimal-light'));
const ModernDark = lazy(() => import('./modern-dark'));
const ProfessionalBlue = lazy(() => import('./professional-blue'));

const themeMap: Record<Theme, React.LazyExoticComponent<React.FC<ThemeProps>>> = {
  'minimal-light': MinimalLight,
  'modern-dark': ModernDark,
  'professional-blue': ProfessionalBlue,
};

interface ThemeProps {
  user: User;
  projects: Project[];
}

interface ThemeRendererProps {
  theme: Theme;
  user: User;
  projects: Project[];
}

const ThemeRenderer: React.FC<ThemeRendererProps> = ({ theme, user, projects }) => {
  const SelectedTheme = themeMap[theme] || MinimalLight;

  return (
    <Suspense fallback={<ThemeSkeleton />}>
      <SelectedTheme user={user} projects={projects} />
    </Suspense>
  );
};

const ThemeSkeleton = () => (
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


export default ThemeRenderer;
