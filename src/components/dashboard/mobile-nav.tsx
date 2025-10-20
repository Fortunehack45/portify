'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Palette, Pencil, Settings } from 'lucide-react';

const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/dashboard/templates", icon: Palette, label: "Templates" },
    { href: "/dashboard/editor", icon: Pencil, label: "Editor" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function MobileNav({ editorHref }: { editorHref: string }) {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <div className="grid h-full grid-cols-4">
        {navItems.map((item) => {
          const href = item.href === '/dashboard/editor' ? editorHref : item.href;
          const isActive = pathname === href || (pathname.startsWith('/dashboard/editor') && item.href === '/dashboard/editor');
          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
