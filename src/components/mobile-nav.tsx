'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Palette, Pencil, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/editor", icon: Pencil, label: "Editor" },
  { href: "/dashboard/templates", icon: Palette, label: "Templates" },
  { href: "/dashboard/preview", icon: Eye, label: "Preview" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-background border-t z-50">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
