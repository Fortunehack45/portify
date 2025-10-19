'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { ArrowRight, Edit, Eye, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useUser();

  const username = user?.displayName?.replace(/\s+/g, '').toLowerCase() || 'preview';

  return (
    <div className="p-4 md:p-6 space-y-6">
       <div className="space-y-1">
         <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
         <p className="text-muted-foreground">Welcome back, {user?.displayName || 'User'}!</p>
       </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Your Portfolio</CardTitle>
          <CardDescription>
            This is your main portfolio. Continue editing or view the public version.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium text-sm sm:text-base">FolioForge Portfolio</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/editor">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
                <Button size="sm" asChild>
                    <Link href={`/${username}`} target="_blank">
                        View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
          </div>
           <p className="text-xs text-muted-foreground">
              Your public portfolio is live at: <Link href={`/${username}`} className="underline font-medium" target='_blank'>{`/${username}`}</Link>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-dashed">
         <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Button variant="ghost" disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Portfolio
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Multiple portfolios coming soon!</p>
         </CardContent>
      </Card>
    </div>
  );
}
