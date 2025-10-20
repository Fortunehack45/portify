'use client';

import { User, Project } from '@/types';
import TemplateRenderer from '../templates/template-renderer';
import { Frame } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface PreviewPanelProps {
  user: User;
  projects: Project[];
  isMobile?: boolean;
}

export default function PreviewPanel({ user, projects, isMobile = false }: PreviewPanelProps) {
  return (
    <div className="h-full bg-muted/40 flex flex-col">
      {!isMobile && (
        <div className="flex-shrink-0 bg-background border-b p-3 flex items-center justify-between gap-2 h-[57px]">
            <div className="flex items-center gap-2">
                <Frame className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground transition-opacity">
                    Live Preview
                </p>
            </div>
        </div>
      )}
      <div className="flex-grow overflow-auto">
        <div className="w-full h-full bg-white">
            <TemplateRenderer
                template={user.selectedTemplate}
                user={user}
                projects={projects}
            />
        </div>
      </div>
    </div>
  );
}
