
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Share2 } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

const featureList = [
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: 'Powerful Theme Options',
    description:
      'Choose from a variety of professionally designed themes. Switch between them with a single click to find the perfect fit.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Intuitive Content Editing',
    description:
      'Our intuitive editor allows you to add projects, skills, and your bio with a real-time preview of your changes.',
  },
  {
    icon: <Share2 className="w-8 h-8 text-primary" />,
    title: 'Instant Live Publishing',
    description:
      'Get a unique, shareable URL at /[username] to showcase your work to potential employers and colleagues instantly.',
  },
];

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl font-headline">
                  Build your portfolio. Publish in minutes.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  The easiest way to build and share a professional developer
                  portfolio. Sign up, create projects, choose a theme, and get a
                  unique public URL instantly.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started for Free</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl shadow-primary/10"
                      data-ai-hint={heroImage.imageHint}
                    />
                  )}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-24 md:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                Everything You Need to Shine
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                FolioForge provides all the tools to create a standout
                portfolio that truly represents your skills and projects.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
              {featureList.map((feature) => (
                <Card key={feature.title} className="text-left bg-card hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                            {feature.icon}
                        </div>
                        <CardTitle className="text-2xl font-bold font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
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
                Join hundreds of developers who have built their online presence with FolioForge. It's free to get started.
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
