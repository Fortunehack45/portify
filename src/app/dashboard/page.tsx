
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useDoc, useFirestore, useUser } from '@/firebase';
import type { User, Portfolio } from '@/types';
import { collection, doc, query, where } from 'firebase/firestore';
import { ArrowRight, Edit, PlusCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useMemoFirebase } from '@/hooks/use-memo-firebase';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user: authUser } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: currentUser } = useDoc<User>(userProfileRef);

  const portfoliosQuery = useMemoFirebase(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'portfolios'), where('userId', '==', authUser.uid));
  }, [firestore, authUser]);

  const { data: portfolios, loading: portfoliosLoading } = useCollection<Portfolio>(portfoliosQuery);

  const publicUsername = currentUser?.username || 'preview';

  return (
    <div className="space-y-6">
       <div className="space-y-1">
         <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
         <p className="text-muted-foreground">Welcome back, {currentUser?.name || 'User'}!</p>
       </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Your Portfolios</CardTitle>
          <CardDescription>
            Manage your portfolios. The primary portfolio is shown on your public `/{'username'}` URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {portfoliosLoading ? (
                <p>Loading portfolios...</p>
            ) : (
                <div className="space-y-3">
                {portfolios?.sort((a,b) => (a.isPrimary ? -1 : 1)).map(p => (
                    <div key={p.id} className={cn("flex items-center justify-between rounded-lg border p-4", p.isPrimary && "border-primary/50 bg-primary/5")}>
                        <div className="flex items-center gap-3">
                           {p.isPrimary && <Star className="h-5 w-5 text-primary" />}
                           <span className="font-medium text-base">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" asChild>
                                <Link href={`/dashboard/editor?portfolioId=${p.id}`}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </Button>
                            {p.isPrimary && (
                                <Button asChild>
                                    <Link href={`/${publicUsername}`} target="_blank">
                                        View Public Site <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                </div>
            )}
        </CardContent>
      </Card>

      <Card className="bg-muted/50 border-dashed hover:border-primary/50 hover:bg-muted transition-colors">
         <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Portfolio
              </Link>
            </Button>
         </CardContent>
      </Card>
    </div>
  );
}
