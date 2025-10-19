// Sectioned Blocks
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import React from 'react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const SectionedBlocks: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialButton = (platform: string, url: string) => {
        switch (platform) {
            case 'github': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>;
            case 'linkedin': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a></Button>;
            case 'twitter': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><Twitter className="mr-2 h-4 w-4" /> Twitter</a></Button>;
            case 'website': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><LinkIcon className="mr-2 h-4 w-4" /> Website</a></Button>;
            default: return null;
        }
    }

  return (
    <div className="font-body bg-white text-gray-800 min-h-screen">
      
      {/* Profile Block */}
      <section id="profile" className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-headline text-gray-900">{user.name}</h1>
            <p className="text-xl text-gray-600 mt-2">@{user.username}</p>
            <p className="mt-6 text-lg max-w-3xl mx-auto">{user.bio}</p>
            <div className="flex justify-center gap-4 mt-8">
                {user.socials?.map(social => (
                    <React.Fragment key={social.platform}>
                        {getSocialButton(social.platform, social.url)}
                    </React.Fragment>
                ))}
              {user.email && <Button variant="outline" asChild><a href={`mailto:${user.email}`}><Mail className="mr-2 h-4 w-4" /> Email</a></Button>}
            </div>
        </div>
      </section>

      {/* Skills Block */}
      <section id="skills" className="py-16 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold font-headline text-center mb-8 text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} className="text-base px-4 py-2 bg-gray-200 text-gray-800">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Block */}
      <section id="projects" className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold font-headline text-center mb-12 text-gray-900">Projects</h2>
          <div className="space-y-12">
            {projects.map((project) => (
              <div key={project.id} className="grid md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold font-headline text-gray-900">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="font-normal">{tech}</Badge>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    {project.githubLink && (
                      <Button variant="ghost" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> View Source
                        </a>
                      </Button>
                    )}
                    {project.liveDemo && (
                      <Button asChild>
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200">Made with FolioForge</footer>
    </div>
  );
};

export default SectionedBlocks;