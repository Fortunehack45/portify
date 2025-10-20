
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

const MinimalSerif: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialLink = (platform: SocialPlatform, url: string) => {
        const baseClasses = "text-gray-500 hover:text-gray-900 transition-colors font-medium";
        switch (platform) {
            case 'github': return <a href={url} target="_blank" rel="noopener noreferrer" className={baseClasses}>GitHub</a>;
            case 'linkedin': return <a href={url} target="_blank" rel="noopener noreferrer" className={baseClasses}>LinkedIn</a>;
            case 'twitter': return <a href={url} target="_blank" rel="noopener noreferrer" className={baseClasses}>Twitter</a>;
            case 'website': return <a href={url} target="_blank" rel="noopener noreferrer" className={baseClasses}>Website</a>;
            default: return null;
        }
    }

  return (
    <div className="font-serif bg-[#fbfaf8] text-gray-800 min-h-screen">
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-normal text-gray-900">{user.name}</h1>
          <p className="text-lg text-gray-600 mt-3">{user.jobTitle}</p>
        </header>

        <section id="about" className="mb-16">
            <h2 className="text-lg font-bold uppercase tracking-widest text-gray-500 mb-4">About</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{user.bio}</p>
        </section>

        <section id="projects" className="mb-16">
            <h2 className="text-lg font-bold uppercase tracking-widest text-gray-500 mb-8">Selected Work</h2>
            <div className="space-y-12">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="text-2xl font-normal text-gray-900">{project.title}</h3>
                    <p className="text-gray-700 my-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="font-sans font-normal border-gray-300 text-gray-600">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-6 items-center mt-4">
                      {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
                            <Github className="h-4 w-4" /> View Source
                          </a>
                      )}
                      {project.liveDemo && (
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
                           <ExternalLink className="h-4 w-4" /> View Live
                          </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
        </section>
        
        <section id="skills" className="mb-20">
            <h2 className="text-lg font-bold uppercase tracking-widest text-gray-500 mb-4">Skills</h2>
            <div className="text-lg text-gray-700 leading-relaxed">
                {user.skills.join(' · ')}
            </div>
        </section>

        <footer className="border-t border-gray-200 pt-8 flex justify-between items-center text-sm">
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans">
                <a href={`mailto:${user.email}`} className="text-gray-500 hover:text-gray-900 transition-colors font-medium">Email</a>
                {user.socials?.map(social => (
                    <React.Fragment key={social.platform}>
                        {getSocialLink(social.platform, social.url)}
                    </React.Fragment>
                ))}
            </div>
            <p className="text-gray-400 font-sans">Made by Fortune</p>
        </footer>
      </main>
    </div>
  );
};

export default MinimalSerif;
