
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

const DarkAcademia: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-5 h-5 text-amber-200/60 group-hover:text-amber-100 transition-colors";
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform} className="group">
                {platform === 'github' && <Github className={iconClass} />}
                {platform === 'linkedin' && <Linkedin className={iconClass} />}
                {platform === 'twitter' && <Twitter className={iconClass} />}
                {platform === 'website' && <LinkIcon className={iconClass} />}
            </a>
        );
    }

  return (
    <div style={{fontFamily: "'Playfair Display', serif"}} className="bg-[#2a231d] text-amber-50 min-h-screen">
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/leather.png')"
        }}
      />
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold">{user.name}</h1>
          <p className="text-xl text-amber-200/80 mt-3">{user.jobTitle}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-10">
            <aside className="md:col-span-1 md:border-r border-amber-200/20 md:pr-8">
                <div className="md:sticky md:top-10">
                    <h2 className="text-2xl font-semibold border-b border-amber-200/20 pb-2 mb-4 text-amber-100">Vita</h2>
                    <p className="text-amber-100/80 leading-relaxed">{user.bio}</p>

                     <h3 className="text-2xl font-semibold border-b border-amber-200/20 pb-2 mt-10 mb-4 text-amber-100">Ars</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-amber-100/90 border-amber-200/30 bg-amber-900/10">
                            {skill}
                        </Badge>
                        ))}
                    </div>

                    <h3 className="text-2xl font-semibold border-b border-amber-200/20 pb-2 mt-10 mb-4 text-amber-100">Epistulae</h3>
                    <div className="flex items-center gap-6">
                        {user.socials?.map(social => (
                            <React.Fragment key={social.platform}>
                                {getSocialIcon(social.platform, social.url)}
                            </React.Fragment>
                        ))}
                        {user.email && <a href={`mailto:${user.email}`} aria-label="Email" className="group"><Mail className="w-5 h-5 text-amber-200/60 group-hover:text-amber-100 transition-colors" /></a>}
                    </div>
                </div>
            </aside>

            <div className="md:col-span-2">
                <section id="projects">
                    <h2 className="text-3xl font-bold mb-8 text-amber-100">Corpus Operum</h2>
                    <div className="space-y-12">
                    {projects.map((project) => (
                        <div key={project.id} className="border-l-2 border-amber-200/20 pl-6">
                            <h3 className="text-2xl font-semibold text-amber-100">{project.title}</h3>
                            <p className="text-amber-100/80 my-3 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech) => (
                                <Badge key={tech} variant="secondary" className="bg-amber-950/40 text-amber-100/70">{tech}</Badge>
                            ))}
                            </div>
                            <div className="flex gap-4">
                                {project.githubLink && <Button variant="link" className="text-amber-200/80 hover:text-amber-100 p-0" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> Manuscript</a></Button>}
                                {project.liveDemo && <Button variant="link" className="text-amber-200/80 hover:text-amber-100 p-0" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Exhibit</a></Button>}
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
            </div>
        </div>
      </main>
      <footer className="relative z-10 text-center py-8 mt-12 text-sm text-amber-200/40">Finis.</footer>
    </div>
  );
};

export default DarkAcademia;
