'use client';

import { User, Project } from '@/types';
import TemplateRenderer from '../templates/template-renderer';
import { Frame, PanelRightOpen, PanelRightClose } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface PreviewPanelProps {
  user: User;
  projects: Project[];
  isMobile?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function PreviewPanel({ user, projects, isMobile = false, isCollapsed = false, onToggle }: PreviewPanelProps) {
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
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
                            {isCollapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
                            <span className="sr-only">Toggle Preview</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isCollapsed ? 'Show Preview' : 'Hide Preview'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
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
