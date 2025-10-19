import { User, Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

interface ThemeProps {
  user: User;
  projects: Project[];
}

const MinimalLight: React.FC<ThemeProps> = ({ user, projects }) => {
  const avatarImage = placeholderImages.find(p => p.id === 'avatar1');
  return (
    <div className="font-body bg-gray-50 text-gray-800 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {avatarImage && (
            <Image
              src={avatarImage.imageUrl}
              alt={user.name}
              width={150}
              height={150}
              className="rounded-full shadow-md"
              data-ai-hint={avatarImage.imageHint}
            />
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-900">{user.name}</h1>
            <p className="text-lg text-gray-600 mt-2">@{user.username}</p>
            <p className="mt-4 text-gray-700">{user.bio}</p>
            <div className="flex gap-2 mt-4">
              <Button variant="ghost" size="icon" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5 text-gray-600" /></a></Button>
              {user.socials?.github && <Button variant="ghost" size="icon" asChild><a href={user.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="w-5 h-5 text-gray-600" /></a></Button>}
              {user.socials?.linkedin && <Button variant="ghost" size="icon" asChild><a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5 text-gray-600" /></a></Button>}
              {user.socials?.twitter && <Button variant="ghost" size="icon" asChild><a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5 text-gray-600" /></a></Button>}
              {user.socials?.website && <Button variant="ghost" size="icon" asChild><a href={user.socials.website} target="_blank" rel="noopener noreferrer" aria-label="Website"><LinkIcon className="w-5 h-5 text-gray-600" /></a></Button>}
            </div>
          </div>
        </header>

        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold font-headline mb-6 text-gray-900 border-b pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-gray-200 text-gray-800">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-3xl font-bold font-headline mb-8 text-gray-900 border-b pb-2">Projects</h2>
          <div className="grid gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-gray-900">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-gray-300">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-auto">
                    {project.githubLink && (
                      <Button variant="outline" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                    )}
                    {project.liveDemo && (
                      <Button asChild className="bg-gray-800 text-white hover:bg-gray-700">
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

export default MinimalLight;
