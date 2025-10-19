'use client';

import { User, Project } from '@/types';
import ThemeRenderer from '../themes/theme-renderer';
import { Frame, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  user: User;
  projects: Project[];
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function PreviewPanel({ user, projects, isCollapsed, onToggle }: PreviewPanelProps) {
  return (
    <div className="h-full bg-muted/40 flex flex-col">
      <div className="flex-shrink-0 bg-background border-b p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
            <Frame className="w-4 h-4 text-muted-foreground" />
            <p className={cn("text-sm font-medium text-muted-foreground transition-opacity", isCollapsed && "opacity-0")}>
                Live Preview
            </p>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onToggle}>
            {isCollapsed ? <PanelRightOpen className="w-4 h-4" /> : <PanelRightClose className="w-4 h-4" />}
            <span className="sr-only">Toggle Preview</span>
        </Button>
      </div>
      <div className={cn("flex-grow overflow-auto transition-opacity", isCollapsed && "opacity-0")}>
        <div className="w-full h-full bg-white">
            <ThemeRenderer
                theme={user.selectedTheme}
                user={user}
                projects={projects}
            />
        </div>
      </div>
    </div>
  );
}
