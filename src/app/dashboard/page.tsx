
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDoc, useFirestore, useUser } from '@/firebase';
import type { User } from '@/types';
import { doc } from 'firebase/firestore';
import { ArrowRight, Edit, Eye, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';

export default function DashboardPage() {
  const { user: authUser } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: currentUser } = useDoc<User>(userProfileRef);

  const publicUsername = currentUser?.username || 'preview';

  return (
    <div className="space-y-6">
       <div className="space-y-1">
         <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
         <p className="text-muted-foreground">Welcome back, {authUser?.displayName || 'User'}!</p>
       </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Your Portfolio</CardTitle>
          <CardDescription>
            This is your main portfolio. Continue editing or view the public version.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
              <span className="font-medium text-base">FolioForge Portfolio</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                    <Link href="/dashboard/editor">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={`/${publicUsername}`} target="_blank">
                        View Public Site <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
          </div>
           <p className="text-sm text-muted-foreground">
              Your public portfolio is live at: <Link href={`/${publicUsername}`} className="underline font-medium" target='_blank'>{`/${publicUsername}`}</Link>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-muted/50 border-dashed hover:border-primary/50 hover:bg-muted transition-colors">
         <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Button variant="ghost" disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Portfolio
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Multiple portfolios coming soon!</p>
         </CardContent>
      </Card>
    </div>
  );
}
