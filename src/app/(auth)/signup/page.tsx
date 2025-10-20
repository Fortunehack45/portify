'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Chrome, Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { signUpWithEmail, signInWithGoogle, signInWithGithub } from "@/firebase/auth/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
        toast({
            title: "Agreement Required",
            description: "You must agree to the terms and conditions to sign up.",
            variant: "destructive"
        })
        return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password, name, username);
      toast({
        title: "Success!",
        description: "Your account has been created.",
      });
      router.push('/dashboard');
    } catch (error: any) {
        let description = error.message;
        if (error.message === "Username is already taken.") {
            description = "This username is not available. Please choose another one.";
        }
      toast({
        title: "Error",
        description: description,
        variant: "destructive",
      });
    } finally {
        setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const signInMethod = provider === 'google' ? signInWithGoogle : signInWithGithub;
      await signInMethod();
      toast({
        title: "Success!",
        description: "Your account has been created.",
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const isFormDisabled = loading || !agreedToTerms;

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
        <CardDescription>
          Join Portify and start building your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Max" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                placeholder="maxrob" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
                disabled={loading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pr-10"
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} disabled={loading} />
            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-snug">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary" target="_blank">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-primary" target="_blank">
                Privacy Policy
              </Link>
              .
            </Label>
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isFormDisabled}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                Or sign up with
                </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11" onClick={() => handleSocialSignup('github')} disabled={loading}>
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" className="h-11" onClick={() => handleSocialSignup('google')} disabled={loading}>
              <Chrome className="mr-2 h-5 w-5" />
              Google
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
