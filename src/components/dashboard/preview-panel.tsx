
'use client';

import { User, Project, Portfolio } from '@/types';
import TemplateRenderer from '../templates/template-renderer';
import { Eye } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Button } from '../ui/button';

interface PreviewPanelProps {
  user: User;
  portfolio: Portfolio;
  projects: Project[];
  isMobile?: boolean;
  onTogglePreview?: () => void;
  isPreviewCollapsed?: boolean;
}

export default function PreviewPanel({ user, portfolio, projects, isMobile = false, onTogglePreview, isPreviewCollapsed }: PreviewPanelProps) {
  return (
    <div className="h-full bg-muted/40 flex flex-col">
      {!isMobile && (
        <div className="flex-shrink-0 bg-background border-b p-3 flex items-center justify-between gap-2 h-[57px]">
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground transition-opacity">
                    Live Preview
                </p>
            </div>
             {onTogglePreview && (
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onTogglePreview}>
                                <Eye className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isPreviewCollapsed ? 'Show Preview' : 'Hide Preview'}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
      )}
      <div className="flex-grow overflow-auto">
        <div className="w-full h-full bg-white">
            <TemplateRenderer
                template={portfolio.selectedTemplate}
                user={user}
                projects={projects}
            />
        </div>
      </div>
    </div>
  );
}
