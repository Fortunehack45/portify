
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

const GeometricDark: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-5 h-5 text-gray-400 group-hover:text-teal-300 transition-colors";
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform} className="group p-2 bg-gray-800/50 rounded-full border border-gray-700 hover:border-teal-400/50">
                {platform === 'github' && <Github className={iconClass} />}
                {platform === 'linkedin' && <Linkedin className={iconClass} />}
                {platform === 'twitter' && <Twitter className={iconClass} />}
                {platform === 'website' && <LinkIcon className={iconClass} />}
            </a>
        );
    }

  return (
    <div className="font-body bg-gray-900 text-gray-300 min-h-screen">
      <div 
        className="fixed inset-0 z-0 opacity-10"
        style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #2d3748 2%, transparent 2%), radial-gradient(circle at 75% 75%, #2d3748 2%, transparent 2%)',
            backgroundSize: '50px 50px'
        }}
      />
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        <header className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black font-headline text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-300 uppercase tracking-tighter">
            {user.name}
          </h1>
          <p className="text-xl text-gray-400 mt-4">{user.jobTitle}</p>
          <p className="mt-8 text-lg max-w-3xl mx-auto leading-relaxed">{user.bio}</p>
          <div className="flex justify-center gap-4 mt-8">
            {user.socials?.map(social => (
                <React.Fragment key={social.platform}>
                    {getSocialIcon(social.platform, social.url)}
                </React.Fragment>
            ))}
            {user.email && <a href={`mailto:${user.email}`} aria-label="Email" className="group p-2 bg-gray-800/50 rounded-full border border-gray-700 hover:border-teal-400/50"><Mail className="w-5 h-5 text-gray-400 group-hover:text-teal-300 transition-colors" /></a>}
          </div>
        </header>

        <section id="skills" className="mb-20">
          <h2 className="text-4xl font-bold font-headline text-center mb-10 text-white">Core Competencies</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} className="text-base px-5 py-2 bg-gray-800 border border-gray-700 text-gray-300 font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-4xl font-bold font-headline text-center mb-12 text-white">Project Showcase</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10">
                <div className="p-6">
                    <h3 className="text-2xl font-bold font-headline text-white mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-gray-600 text-gray-400">{tech}</Badge>
                    ))}
                    </div>
                    <p className="text-gray-400 mb-6">{project.description}</p>
                    <div className="flex gap-4">
                    {project.githubLink && (
                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> Source
                        </a>
                        </Button>
                    )}
                    {project.liveDemo && (
                        <Button className="bg-teal-500 text-gray-900 font-bold hover:bg-teal-400" asChild>
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
        </section>
      </main>
      <footer className="relative z-10 text-center py-6 text-sm text-gray-600">Engineered with FolioForge</footer>
    </div>
  );
};

export default GeometricDark;
