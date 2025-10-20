
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HardHat, Wrench, Bot } from 'lucide-react';

export default function NotFound() {
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
      <Button asChild className="mt-8">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
