
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import React from 'react';
import { SocialPlatform } from '@/types';
import Image from 'next/image';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const BoldAndBlue: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-6 h-6 text-white/70 group-hover:text-white transition-colors";
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
    <div className="font-body bg-gray-100 text-gray-800 min-h-screen">
        <header className="bg-blue-700 text-white py-20 md:py-32">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter">{user.name}</h1>
                <p className="text-xl md:text-2xl text-blue-200 mt-4">{user.jobTitle}</p>
                <div className="flex justify-center gap-6 mt-8">
                    {user.socials?.map(social => (
                        <React.Fragment key={social.platform}>
                            {getSocialIcon(social.platform, social.url)}
                        </React.Fragment>
                    ))}
                    {user.email && <a href={`mailto:${user.email}`} aria-label="Email" className="group"><Mail className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" /></a>}
                </div>
            </div>
        </header>

        <main className="container mx-auto px-4 py-16 max-w-6xl -mt-24">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-8 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                             <h2 className="text-2xl font-bold font-headline text-gray-900 mb-4">About Me</h2>
                             <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold font-headline text-gray-900 mb-4">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map((skill) => (
                                <Badge key={skill} className="bg-blue-100 text-blue-800 border border-blue-200 text-sm">
                                    {skill}
                                </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                     <section id="projects">
                        <h2 className="text-4xl font-bold font-headline mb-8 text-gray-900">Projects</h2>
                        <div className="space-y-8">
                            {projects.map((project) => (
                            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-transform hover:-translate-y-1">
                                {project.imageUrl && (
                                    <div className="md:w-1/3 flex-shrink-0">
                                        <Image src={project.imageUrl} alt={project.title} width={300} height={300} className="w-full h-48 md:h-full object-cover"/>
                                    </div>
                                )}
                                <div className="p-6 flex flex-col">
                                    <h3 className="text-2xl font-bold font-headline text-gray-900">{project.title}</h3>
                                    <p className="text-gray-600 my-3 flex-grow">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.map((tech) => (
                                        <Badge key={tech} variant="outline">{tech}</Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 mt-auto">
                                        {project.githubLink && <Button variant="outline" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                                        {project.liveDemo && <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
      <footer className="text-center py-6 text-sm text-gray-500">Made with Portify</footer>
    </div>
  );
};

export default BoldAndBlue;
