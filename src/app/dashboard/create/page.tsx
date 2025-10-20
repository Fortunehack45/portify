
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUser, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreatePortfolioPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user: authUser } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const handleCreatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !authUser || !name.trim()) {
        toast({
            title: "Error",
            description: "You must be logged in and provide a portfolio name.",
            variant: "destructive"
        });
        return;
    }
    setLoading(true);

    const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    try {
        await addDoc(collection(firestore, 'portfolios'), {
            userId: authUser.uid,
            name: name.trim(),
            slug: slug,
            projectIds: [],
            selectedTemplate: 'minimal-light',
            isPrimary: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        toast({
            title: "Success!",
            description: `Portfolio "${name.trim()}" has been created.`,
        });

        router.push('/dashboard');

    } catch (error: any) {
        console.error("Error creating portfolio:", error);
        toast({
            title: "Error",
            description: error.message || "Could not create portfolio.",
            variant: "destructive",
        });
        setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold font-headline">Create New Portfolio</h1>
                <p className="text-muted-foreground text-sm">
                    Give your new portfolio a name to get started.
                </p>
            </div>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Name</CardTitle>
          <CardDescription>
            What would you like to call this portfolio? (e.g. "Web Development", "Mobile Apps")
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreatePortfolio} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="My Awesome Portfolio" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Portfolio
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
