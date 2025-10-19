// Bold Typography
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const BoldTypography: React.FC<TemplateProps> = ({ user, projects }) => {
  return (
    <div className="font-body bg-black text-white min-h-screen antialiased">
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Hero */}
        <header className="mb-20 text-center md:text-left">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold font-headline uppercase tracking-tighter break-words">
            {user.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mt-4 max-w-2xl mx-auto md:mx-0">
            {user.bio}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-8">
            {user.socials?.github && <Button variant="link" className="text-gray-300 hover:text-white" asChild><a href={user.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="w-5 h-5 mr-2" />GitHub</a></Button>}
            {user.socials?.linkedin && <Button variant="link" className="text-gray-300 hover:text-white" asChild><a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5 mr-2" />LinkedIn</a></Button>}
            {user.socials?.twitter && <Button variant="link" className="text-gray-300 hover:text-white" asChild><a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5 mr-2" />Twitter</a></Button>}
            {user.email && <Button variant="link" className="text-gray-300 hover:text-white" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5 mr-2" />Email</a></Button>}
          </div>
        </header>

        {/* Skills */}
        <section id="skills" className="mb-20">
          <div className="flex flex-wrap gap-3 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} className="text-md md:text-lg px-5 py-2 rounded-full bg-white text-black font-bold uppercase tracking-wide">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div key={project.id} className="border-t border-gray-700 pt-8">
                <h2 className="text-3xl md:text-4xl font-bold font-headline uppercase">{project.title}</h2>
                <p className="text-gray-400 my-4 text-lg">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-gray-600 text-gray-400">{tech}</Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubLink && (
                    <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800 hover:border-gray-500" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveDemo && (
                    <Button className="bg-white text-black hover:bg-gray-300" asChild>
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="text-center py-6 text-sm text-gray-600">Made with FolioForge</footer>
    </div>
  );
};

export default BoldTypography;
