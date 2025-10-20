'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreatePortfolioPage() {
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
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="My Awesome Portfolio" />
            </div>
            <Button disabled>Create Portfolio</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
