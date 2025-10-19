import { User, Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

interface ThemeProps {
  user: User;
  projects: Project[];
}

const ModernDark: React.FC<ThemeProps> = ({ user, projects }) => {
  const accentColor = 'text-cyan-400';
  const accentBorder = 'border-cyan-400';
  const avatarImage = placeholderImages.find(p => p.id === 'avatar1');

  return (
    <div className="font-body bg-[#111827] text-gray-300 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <header className="text-center mb-16">
          {avatarImage && (
            <Image
              src={avatarImage.imageUrl}
              alt={user.name}
              width={160}
              height={160}
              className={cn("rounded-full mx-auto mb-6 border-4 border-gray-700 shadow-lg", accentBorder)}
              data-ai-hint={avatarImage.imageHint}
            />
          )}
          <h1 className={cn("text-5xl md:text-7xl font-bold font-headline text-white", accentColor)}>{user.name}</h1>
          <p className="text-xl text-gray-400 mt-2">@{user.username}</p>
          <p className="mt-6 text-lg max-w-3xl mx-auto">{user.bio}</p>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="ghost" size="icon" asChild><a href={`mailto:${user.email}`}><Mail className="w-6 h-6 text-gray-400 hover:text-cyan-400" /></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Linkedin className="w-6 h-6 text-gray-400 hover:text-cyan-400" /></a></Button>
            <Button variant="ghost" size="icon" asChild><a href="#"><Twitter className="w-6 h-6 text-gray-400 hover:text-cyan-400" /></a></Button>
          </div>
        </header>

        <section id="skills" className="mb-20">
          <h2 className={cn("text-4xl font-bold font-headline text-center mb-8 text-white", accentColor)}>Toolkit</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} className="text-lg px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className={cn("text-4xl font-bold font-headline text-center mb-12 text-white", accentColor)}>Creations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-800/50 border border-gray-700 shadow-lg hover:border-cyan-400/50 hover:shadow-cyan-400/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-white">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-cyan-400 border-cyan-400/50">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubLink && (
                      <Button variant="outline" className="border-gray-600 hover:bg-gray-700" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                    )}
                    {project.liveDemo && (
                      <Button className="bg-cyan-500 text-gray-900 hover:bg-cyan-400" asChild>
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ModernDark;
