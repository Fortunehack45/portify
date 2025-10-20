
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Share2, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const featureList = [
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: 'Instant Professionalism',
    description:
      'Choose from a library of meticulously crafted templates. Find the perfect design that matches your personal brand and style.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Effortless Content Management',
    description:
      'Our intuitive editor allows you to add projects, skills, and your bio with a real-time preview of your changes, saving automatically.',
  },
  {
    icon: <Share2 className="w-8 h-8 text-primary" />,
    title: 'Publish and Share Instantly',
    description:
      'Get a unique, shareable URL at /[username] to showcase your work to potential employers and colleagues instantly.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-headline">
                Craft Your Digital Presence.
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Portify provides the tools to build a stunning developer portfolio in minutes. No code required. Just your talent, your projects, and your unique story.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-24 md:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">Key Features</div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                Designed for Developers Who Build
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                From template selection to instant publishing, every feature is designed to get your portfolio online and in front of the right people, effortlessly.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
              {featureList.map((feature) => (
                <div key={feature.title} className="text-left bg-card rounded-lg border shadow-sm hover:shadow-lg transition-shadow p-6 space-y-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-headline">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-24 md:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter md:text-5xl font-headline">
                Ready to Forge Your Legacy?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Join hundreds of developers who have built their online presence with Portify. It's free to get started.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/signup">Create Your Portfolio Now</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
