'use client';

import Link from "next/link";
import { CircleUser, Home, Pencil, Palette, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/icons";
import { useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useAuth, useCollection, useFirestore } from "@/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import MobileNav from "@/components/dashboard/mobile-nav";
import type { User } from '@/types';
import { collection, query, where } from "firebase/firestore";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/editor", icon: Pencil, label: "Editor" },
  { href: "/dashboard/templates", icon: Palette, label: "Templates" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: authUser, loading: userLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const userProfileQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'users'), where('id', '==', authUser.uid));
  }, [firestore, authUser]);

  const { data: userProfile, loading: profileLoading } = useCollection<User>(userProfileQuery);
  const currentUser = userProfile?.[0];

  useEffect(() => {
    if (!userLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, userLoading, router]);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        router.push('/login');
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to log out. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  const isLoading = userLoading || profileLoading;

  if (isLoading || !authUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const publicUsername = currentUser?.username || 'preview';

  return (
    <div className="min-h-screen w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-[220px] lg:w-[280px] flex-col fixed inset-y-0 z-50 border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start p-2 text-sm font-medium lg:p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )})}
          </nav>
        </div>
      </div>

      <div className="md:pl-[220px] lg:pl-[280px] flex flex-col min-h-screen">
        {/* Desktop and Mobile Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 bg-background z-40">
          <div className="w-full flex-1">
             <Button variant="outline" size="sm" asChild>
                <Link href={`/${publicUsername}`} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Public View
                </Link>
            </Button>
          </div>
          {/* Mobile-only logo */}
          <div className="md:hidden">
            <Logo />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{authUser.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem disabled>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto pb-20 md:pb-6">
          {children}
        </main>
        
        {/* Mobile Bottom Nav */}
        <MobileNav />
      </div>
    </div>
  );
}
