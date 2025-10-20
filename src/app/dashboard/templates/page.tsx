
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { User, Project, Template } from '@/types';
import TemplateSelector from '@/components/dashboard/template-selector';
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { doc, setDoc, collection, query, where } from 'firebase/firestore';
import { useCollection } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TemplatesPage() {
  const { user: authUser, loading: userLoading } = useAuthUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userProfileQuery = useMemo(() => {
    if (!firestore || !authUser) return null;
    return query(collection(firestore, 'users'), where('id', '==', authUser.uid))
  }, [firestore, authUser]);

  const { data: userProfile, loading: profileLoading } = useCollection<User>(userProfileQuery);
  
  const isLoading = userLoading || profileLoading;

  if (isLoading) {
    return <div className="p-4 md:p-6">Loading...</div>;
  }
  
  const user = userProfile?.[0];

  return (
    <div className="p-4 md:p-6 space-y-6 flex flex-col items-center justify-center text-center h-full">
        <div className="space-y-2">
            <h1 className="text-2xl font-bold font-headline">Template selection has moved!</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">To make editing your portfolio easier, you can now change your template directly inside the Editor.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/editor">
                Go to Editor
            </Link>
        </Button>
    </div>
  );
}
