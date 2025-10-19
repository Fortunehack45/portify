'use client';

import { User, Project } from '@/types';
import ThemeRenderer from '../themes/theme-renderer';
import { Frame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  user: User;
  projects: Project[];
}

export default function PreviewPanel({ user, projects }: PreviewPanelProps) {
  return (
    <div className="h-full bg-muted/40 flex flex-col">
      <div className="flex-shrink-0 bg-background border-b p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
            <Frame className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground transition-opacity">
                Live Preview
            </p>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
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
