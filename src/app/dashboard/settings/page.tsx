'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useUser } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const { user } = useUser();
    const auth = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    
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

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold font-headline">Settings</h1>
                <p className="text-muted-foreground text-sm">Manage your account and app settings.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Manage your account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-md border p-4">
                        <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                     <div className="flex items-center justify-between rounded-md border p-4">
                        <div>
                            <p className="text-sm font-medium">Password</p>
                            <p className="text-sm text-muted-foreground">**********</p>
                        </div>
                        <Button variant="outline" disabled>Change</Button>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between rounded-md border border-destructive/50 bg-destructive/10 p-4">
                        <div>
                            <p className="text-sm font-medium text-destructive">Sign Out</p>
                            <p className="text-sm text-destructive/80">You will be returned to the login screen.</p>
                        </div>
                        <Button variant="destructive" onClick={handleLogout}>Sign Out</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
