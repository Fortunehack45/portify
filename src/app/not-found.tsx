'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HardHat, Wrench, Bot, Loader2 } from 'lucide-react';
import { useUser } from '@/firebase';

export default function NotFound() {
  const { user, loading } = useUser();

  const getHomeUrl = () => {
    if (loading) {
      return '#'; // Prevent navigation while checking auth status
    }
    return user ? '/dashboard' : '/';
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-center p-4">
      <div className="relative mb-8 flex items-end justify-center">
        <Bot className="h-24 w-24 text-primary animate-bounce" style={{ animationDuration: '2s' }} />
        <HardHat className="h-16 w-16 text-muted-foreground absolute -top-4 -right-8 -rotate-12" />
        <Wrench className="h-12 w-12 text-muted-foreground absolute bottom-0 -left-8 rotate-12" />
      </div>
      <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Sorry, we couldn't find the page you're looking for. Our digital architects might still be building it!
      </p>
      <Button asChild className="mt-8" disabled={loading}>
        <Link href={getHomeUrl()}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Return to Home
        </Link>
      </Button>
    </div>
  );
}
