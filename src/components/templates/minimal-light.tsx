import { User, Project } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const MinimalLight: React.FC<TemplateProps> = ({ user, projects }) => {
  return (
    <div className="font-body bg-white text-gray-800 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <div className="md:flex md:gap-12">
          {/* Left Sidebar for Profile */}
          <aside className="md:w-1/3 md:sticky md:top-16 self-start mb-12 md:mb-0">
            <div className="p-4 border-r border-gray-200 h-full">
              <h1 className="text-4xl font-bold font-headline text-gray-900">{user.name}</h1>
              <p className="text-md text-gray-600 mt-2">@{user.username}</p>
              <p className="mt-6 text-gray-700">{user.bio}</p>
              <div className="flex flex-wrap gap-1 mt-6">
                {user.socials?.github && <Button variant="ghost" size="sm" asChild><a href={user.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</a></Button>}
                {user.socials?.linkedin && <Button variant="ghost" size="sm" asChild><a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</a></Button>}
                {user.socials?.twitter && <Button variant="ghost" size="sm" asChild><a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter</a></Button>}
                {user.socials?.website && <Button variant="ghost" size="sm" asChild><a href={user.socials.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Website</a></Button>}
                {user.email && <Button variant="ghost" size="sm" asChild><a href={`mailto:${user.email}`} aria-label="Email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</a></Button>}
              </div>

              <hr className="my-8 border-gray-200" />

              <h2 className="text-2xl font-bold font-headline mb-4 text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-gray-100 text-gray-700 font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Section for Projects */}
          <div className="md:w-2/3">
            <section id="projects">
              <h2 className="text-3xl font-bold font-headline mb-8 text-gray-900 md:hidden">Projects</h2>
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <div key={project.id}>
                    <h3 className="text-2xl font-bold font-headline text-gray-900">{project.title}</h3>
                    <p className="text-gray-700 my-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-gray-300 font-normal">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubLink && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </a>
                        </Button>
                      )}
                      {project.liveDemo && (
                        <Button size="sm" asChild className="bg-gray-800 text-white hover:bg-gray-700">
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                    {index < projects.length - 1 && <hr className="mt-8 border-gray-200" />}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-gray-500">Made with FolioForge</footer>
    </div>
  );
};

export default MinimalLight;
