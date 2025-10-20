
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon, BookOpen } from 'lucide-react';
import React from 'react';
import { SocialPlatform } from '@/types';
import Image from 'next/image';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const Storybook: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-5 h-5 text-gray-500 group-hover:text-amber-700 transition-colors";
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
    <div style={{fontFamily: "'Cormorant Garamond', serif"}} className="bg-[#fdf8f0] text-[#4a4a4a] min-h-screen">
        <div className="w-full border-b-[3px] border-amber-800/40" />
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-amber-900">{user.name}</h1>
          <p className="text-2xl text-amber-700/90 mt-2">{user.jobTitle}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-12">
            <aside className="md:col-span-1 md:border-r border-amber-800/20 md:pr-8">
                <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3"><BookOpen /> Prologue</h2>
                <div className="space-y-6 text-lg leading-relaxed">
                    <p>{user.bio}</p>
                    <div>
                        <h3 className="text-xl font-bold text-amber-900 mt-8 mb-4">Skills</h3>
                         <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="bg-amber-100/50 border-amber-600/30 text-amber-800 font-normal">
                                {skill}
                            </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <div className="md:col-span-2">
                <section id="projects">
                    <h2 className="text-3xl font-bold text-amber-900 mb-8">Chapters of Work</h2>
                    <div className="space-y-12">
                    {projects.map((project, index) => (
                        <div key={project.id} className="border-t border-amber-800/20 pt-8">
                            <p className="text-sm text-amber-600/80 mb-2">Chapter {index + 1}</p>
                            <h3 className="text-4xl font-bold text-amber-900">{project.title}</h3>
                            <div className="flex flex-wrap gap-x-3 text-sm my-4">
                                {project.techStack.map((tech) => (
                                <span key={tech} className="text-amber-700/90">{tech}</span>
                                ))}
                            </div>
                            <p className="text-lg text-gray-700/90 my-4 leading-relaxed">{project.description}</p>
                            <div className="flex gap-4 mt-6">
                                {project.githubLink && <Button variant="link" className="text-amber-800 hover:text-amber-900 p-0" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> View Manuscript</a></Button>}
                                {project.liveDemo && <Button variant="link" className="text-amber-800 hover:text-amber-900 p-0" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Read Published Work</a></Button>}
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
            </div>
        </div>
      </main>
      <footer className="mt-20 py-8 border-t-2 border-dotted border-amber-800/30">
        <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-2xl font-bold text-amber-900">Epilogue</h2>
            <p className="mt-2 text-lg">Let's write the next chapter together.</p>
            <a href={`mailto:${user.email}`} className="mt-4 inline-block text-lg font-medium text-amber-700 hover:text-amber-900">{user.email}</a>
            <div className="flex justify-center gap-8 mt-6">
                {user.socials?.map(social => (
                    <React.Fragment key={social.platform}>
                        {getSocialIcon(social.platform, social.url)}
                    </React.Fragment>
                ))}
            </div>
            <p className="text-xs text-amber-800/50 mt-10">Made with Portify</p>
        </div>
      </footer>
    </div>
  );
};

export default Storybook;
