import { Hammer } from 'lucide-react';

export const Logo = () => (
  <div className="flex items-center gap-2">
    <Hammer className="w-6 h-6 text-primary" />
    <span className="text-xl font-bold font-headline text-foreground">
      FolioForge
    </span>
  </div>
);
