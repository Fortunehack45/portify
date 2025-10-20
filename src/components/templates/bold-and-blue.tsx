
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import React from 'react';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const BoldAndBlue: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialButton = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-4 h-4";
        const buttonClass = "flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors";
        switch (platform) {
            case 'github': return <Button variant="ghost" size="sm" asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={buttonClass}><Github className={iconClass} /> GitHub</a></Button>;
            case 'linkedin': return <Button variant="ghost" size="sm" asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={buttonClass}><Linkedin className={iconClass} /> LinkedIn</a></Button>;
            case 'twitter': return <Button variant="ghost" size="sm" asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={buttonClass}><Twitter className={iconClass} /> Twitter</a></Button>;
            case 'website': return <Button variant="ghost" size="sm" asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="Website" className={buttonClass}><LinkIcon className={iconClass} /> Website</a></Button>;
            default: return null;
        }
    }

  return (
    <div className="font-body bg-white text-gray-800 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        <div className="md:flex md:gap-12">
          
          <aside className="md:w-1/3 md:sticky md:top-16 self-start mb-12 md:mb-0">
            <div className="md:border-r md:border-gray-200 md:h-full md:pr-8">
              <h1 className="text-4xl font-bold font-headline text-gray-900">{user.name}</h1>
              <p className="text-md text-gray-600 mt-2">@{user.username}</p>
              <p className="mt-6 text-gray-700">{user.bio}</p>
              
              <div className="flex flex-col items-start gap-1 mt-6">
                {user.socials?.map(social => (
                    <React.Fragment key={social.platform}>
                        {getSocialButton(social.platform, social.url)}
                    </React.Fragment>
                ))}
                {user.email && <Button variant="ghost" size="sm" asChild><a href={`mailto:${user.email}`} aria-label="Email" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"><Mail className="w-4 h-4" /> Email</a></Button>}
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

          <div className="md:w-2/3">
            <section id="projects">
              <h2 className="text-3xl font-bold font-headline mb-8 text-gray-900">Projects</h2>
              <div className="space-y-10">
                {projects.map((project, index) => (
                  <div key={project.id} className={`pt-2 ${index > 0 ? 'border-t border-gray-200 pt-10' : ''}`}>
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
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-gray-500 border-t border-gray-100 mt-8">Made with FolioForge</footer>
    </div>
  );
};

export default BoldAndBlue;
