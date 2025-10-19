import { User, Project } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

interface ThemeProps {
  user: User;
  projects: Project[];
}

const ProfessionalBlue: React.FC<ThemeProps> = ({ user, projects }) => {
    const avatarImage = placeholderImages.find(p => p.id === 'avatar1');
  return (
    <div className="font-body bg-slate-100 text-slate-800 min-h-screen">
      <header className="bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
                {avatarImage && (
                    <Image
                    src={avatarImage.imageUrl}
                    alt={user.name}
                    width={180}
                    height={180}
                    className="rounded-full border-4 border-slate-500 shadow-xl"
                    data-ai-hint={avatarImage.imageHint}
                    />
                )}
                <div className="text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-bold font-headline">{user.name}</h1>
                    <p className="text-xl text-slate-300 mt-2">@{user.username}</p>
                    <div className="flex justify-center md:justify-start gap-2 mt-4">
                        <Button variant="ghost" className="text-slate-300 hover:bg-slate-700 hover:text-white" size="icon" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5" /></a></Button>
                        {user.socials?.github && <Button variant="ghost" className="text-slate-300 hover:bg-slate-700 hover:text-white" size="icon" asChild><a href={user.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="w-5 h-5" /></a></Button>}
                        {user.socials?.linkedin && <Button variant="ghost" className="text-slate-300 hover:bg-slate-700 hover:text-white" size="icon" asChild><a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a></Button>}
                        {user.socials?.twitter && <Button variant="ghost" className="text-slate-300 hover:bg-slate-700 hover:text-white" size="icon" asChild><a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5" /></a></Button>}
                        {user.socials?.website && <Button variant="ghost" className="text-slate-300 hover:bg-slate-700 hover:text-white" size="icon" asChild><a href={user.socials.website} target="_blank" rel="noopener noreferrer" aria-label="Website"><LinkIcon className="w-5 h-5" /></a></Button>}
                    </div>
                </div>
            </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 max-w-6xl grid md:grid-cols-3 gap-12">
        <aside className="md:col-span-1">
          <Card className="bg-white shadow-sm sticky top-8">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-slate-900">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">{user.bio}</p>
              <h3 className="font-bold font-headline text-lg text-slate-800 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="md:col-span-2">
          <section id="projects">
            <h2 className="text-4xl font-bold font-headline mb-8 text-slate-900">Projects</h2>
            <div className="grid gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-blue-700">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-slate-300 text-slate-600">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubLink && (
                        <Button variant="outline" asChild>
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> Source Code
                          </a>
                        </Button>
                      )}
                      {project.liveDemo && (
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
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
        </div>
      </main>
    </div>
  );
};

export default ProfessionalBlue;
