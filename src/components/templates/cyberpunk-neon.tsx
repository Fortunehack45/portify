
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

const CyberpunkNeon: React.FC<TemplateProps> = ({ user, projects }) => {
    const getSocialButton = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-5 h-5 mr-2";
        const buttonClass = "text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition-colors";
        switch (platform) {
            case 'github': return <Button variant="link" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className={iconClass} />GitHub</a></Button>;
            case 'linkedin': return <Button variant="link" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className={iconClass} />LinkedIn</a></Button>;
            case 'twitter': return <Button variant="link" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className={iconClass} />Twitter</a></Button>;
            case 'website': return <Button variant="link" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer" aria-label="Website"><LinkIcon className={iconClass} />Website</a></Button>;
            default: return null;
        }
    }

  return (
    <div className="font-mono bg-black text-cyan-300 min-h-screen antialiased" style={{textShadow: '0 0 5px rgba(0, 255, 255, 0.3), 0 0 10px rgba(0, 255, 255, 0.2)'}}>
      <div className="fixed inset-0 bg-[url(/grid.svg)] bg-repeat opacity-20" />
      <main className="relative container mx-auto px-4 py-16 md:py-24 max-w-4xl z-10">
        
        <header className="mb-20 text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-headline uppercase tracking-tighter break-words text-white">
            {user.name}
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 mt-4 max-w-2xl mx-auto md:mx-0">
            {`> ${user.bio}`}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-8">
            {user.socials?.map(social => (
                <React.Fragment key={social.platform}>
                    {getSocialButton(social.platform, social.url)}
                </React.Fragment>
            ))}
            {user.email && <Button variant="link" className="text-cyan-300 hover:text-white" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5 mr-2" />Email</a></Button>}
          </div>
        </header>

        <section id="skills" className="mb-20">
            <h2 className="text-2xl font-bold font-headline uppercase text-center mb-6 text-white tracking-widest">[ Skills Matrix ]</h2>
            <div className="flex flex-wrap gap-3 justify-center">
                {user.skills.map((skill) => (
                <Badge key={skill} className="text-md md:text-lg px-5 py-2 rounded-none bg-cyan-400 text-black font-bold uppercase tracking-wide border-2 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                    {skill}
                </Badge>
                ))}
            </div>
        </section>

        <section id="projects">
          <h2 className="text-2xl font-bold font-headline uppercase text-center mb-10 text-white tracking-widest">[ Project Files ]</h2>
          <div className="space-y-12">
            {projects.map((project) => (
              <div key={project.id} className="border-t-2 border-cyan-500/30 pt-8">
                <h2 className="text-3xl md:text-4xl font-bold font-headline uppercase text-white">{project.title}</h2>
                <p className="text-cyan-200 my-4 text-lg">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-cyan-700 text-cyan-400">{tech}</Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubLink && (
                    <Button variant="outline" className="text-cyan-300 border-cyan-700 hover:bg-cyan-900/50 hover:border-cyan-500 hover:text-white" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> View Source
                      </a>
                    </Button>
                  )}
                  {project.liveDemo && (
                    <Button className="bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.6)]" asChild>
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Launch Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="relative z-10 text-center py-6 text-sm text-cyan-800">system.log(&#39;Made with FolioForge&#39;)</footer>
    </div>
  );
};

export default CyberpunkNeon;
