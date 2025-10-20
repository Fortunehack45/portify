'use client';

import { Template, Project, User } from '@/types';
import AiTemplateAssistant from './ai-template-assistant';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Import all templates directly for rendering
import MinimalLight from '../templates/minimal-light';
import ModernDark from '../templates/modern-dark';
import ProfessionalBlue from '../templates/professional-blue';
import RetroGamer from '../templates/retro-gamer';
import BrutalistWeb from '../templates/brutalist-web';
import CyberpunkNeon from '../templates/cyberpunk-neon';
import ElegantSerif from '../templates/elegant-serif';
import CosmicDream from '../templates/cosmic-dream';
import HackerTerminal from '../templates/hacker-terminal';
import CraftsmanPaper from '../templates/craftsman-paper';
import PhotoGrid from '../templates/photo-grid';
import LakesideDawn from '../templates/lakeside-dawn';
import GeometricDark from '../templates/geometric-dark';
import MinimalSerif from '../templates/minimal-serif';
import CorporateClean from '../templates/corporate-clean';
import Glassmorphism from '../templates/glassmorphism';
import Neobrutalism from '../templates/neobrutalism';
import Storybook from '../templates/storybook';
import TwoColumnImage from '../templates/two-column-image';
import BoldAndBlue from '../templates/bold-and-blue';
import Newspaper from '../templates/newspaper';
import DarkAcademia from '../templates/dark-academia';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
  projects: Project[];
  user: User;
}

const templateOptions: { value: Template; label: string; component: React.FC<{user: User, projects: Project[]}> }[] = [
    { value: 'minimal-light', label: 'Minimal Light', component: MinimalLight },
    { value: 'modern-dark', label: 'Modern Dark', component: ModernDark },
    { value: 'professional-blue', label: 'Professional Blue', component: ProfessionalBlue },
    { value: 'retro-gamer', label: 'Retro Gamer', component: RetroGamer },
    { value: 'brutalist-web', label: 'Brutalist Web', component: BrutalistWeb },
    { value: 'cyberpunk-neon', label: 'Cyberpunk Neon', component: CyberpunkNeon },
    { value: 'elegant-serif', label: 'Elegant Serif', component: ElegantSerif },
    { value: 'cosmic-dream', label: 'Cosmic Dream', component: CosmicDream },
    { value: 'hacker-terminal', label: 'Hacker Terminal', component: HackerTerminal },
    { value: 'craftsman-paper', label: 'Craftsman Paper', component: CraftsmanPaper },
    { value: 'photo-grid', label: 'Photo Grid', component: PhotoGrid },
    { value: 'lakeside-dawn', label: 'Lakeside Dawn', component: LakesideDawn },
    { value: 'geometric-dark', label: 'Geometric Dark', component: GeometricDark },
    { value: 'minimal-serif', label: 'Minimal Serif', component: MinimalSerif },
    { value: 'corporate-clean', label: 'Corporate Clean', component: CorporateClean },
    { value: 'glassmorphism', label: 'Glassmorphism', component: Glassmorphism },
    { value: 'neobrutalism', label: 'Neobrutalism', component: Neobrutalism },
    { value: 'storybook', label: 'Storybook', component: Storybook },
    { value: 'two-column-image', label: 'Two Column Image', component: TwoColumnImage },
    { value: 'bold-and-blue', label: 'Bold and Blue', component: BoldAndBlue },
    { value: 'newspaper', label: 'Newspaper', component: Newspaper },
    { value: 'dark-academia', label: 'Dark Academia', component: DarkAcademia },
];

export default function TemplateSelector({ selectedTemplate, onTemplateChange, projects, user }: TemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Choose a Template</h3>
        <p className="text-sm text-muted-foreground">Select a template to change the look of your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templateOptions.map(option => {
          const TemplateComponent = option.component;
          return (
            <div key={option.value} className="space-y-2">
                <div
                    role="button"
                    aria-label={`Select ${option.label} template`}
                    tabIndex={0}
                    className={cn(
                        "relative block w-full rounded-lg border-2 bg-card overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 aspect-[4/3] cursor-pointer",
                        selectedTemplate === option.value ? "border-primary" : "border-border"
                    )}
                    onClick={() => onTemplateChange(option.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                        onTemplateChange(option.value);
                        }
                    }}
                >
                    {selectedTemplate === option.value && (
                        <div className="absolute top-2 right-2 z-20 bg-primary text-primary-foreground rounded-full p-0.5">
                        <CheckCircle className="h-5 w-5" />
                        </div>
                    )}
                    <div className="absolute inset-0 transform scale-[0.25] origin-top-left pointer-events-none">
                        <div className="w-[1280px] h-[960px] bg-background">
                            <Suspense fallback={<Skeleton className="w-full h-full" />}>
                                <TemplateComponent user={user} projects={projects} />
                            </Suspense>
                        </div>
                    </div>
                </div>
                <p className="text-sm font-medium text-center">{option.label}</p>
            </div>
          )
        })}
      </div>

      <AiTemplateAssistant projects={projects} onSelectTemplate={onTemplateChange} />
    </div>
  );
}
