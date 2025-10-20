
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

const TwoColumnImage: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors";
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform} className="group p-2 rounded-full hover:bg-gray-100">
                {platform === 'github' && <Github className={iconClass} />}
                {platform === 'linkedin' && <Linkedin className={iconClass} />}
                {platform === 'twitter' && <Twitter className={iconClass} />}
                {platform === 'website' && <LinkIcon className={iconClass} />}
            </a>
        );
    }

  return (
    <div className="font-body bg-white text-gray-800 min-h-screen">
      <div className="grid md:grid-cols-2 min-h-screen">
        <aside className="md:col-span-1 p-8 md:p-16 flex flex-col justify-center bg-gray-50">
            <div className="max-w-md mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold font-headline text-gray-900">{user.name}</h1>
                <h2 className="text-xl text-indigo-600 font-medium mt-2">{user.jobTitle}</h2>
                <p className="mt-6 text-gray-600 leading-relaxed">{user.bio}</p>
                
                <div className="flex flex-wrap gap-2 mt-8">
                    {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-indigo-100 text-indigo-800">
                        {skill}
                    </Badge>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-8">
                    {user.socials?.map(social => (
                        <React.Fragment key={social.platform}>
                            {getSocialIcon(social.platform, social.url)}
                        </React.Fragment>
                    ))}
                    {user.email && <a href={`mailto:${user.email}`} aria-label="Email" className="group p-2 rounded-full hover:bg-gray-100"><Mail className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors" /></a>}
                </div>
            </div>
        </aside>

        <main className="md:col-span-1 p-8 md:p-12 overflow-y-auto h-screen">
             <section id="projects">
                <h2 className="text-3xl font-bold font-headline mb-8 text-gray-900">Featured Projects</h2>
                <div className="space-y-8">
                {projects.map((project) => (
                    <div key={project.id} className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                        {project.imageUrl && (
                            <div className="sm:col-span-1 aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <Image src={project.imageUrl} alt={project.title} width={200} height={200} className="w-full h-full object-cover"/>
                            </div>
                        )}
                        <div className={`sm:col-span-${project.imageUrl ? 2 : 3}`}>
                            <h3 className="text-xl font-bold font-headline text-gray-900">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                {project.techStack.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                            <div className="flex gap-2">
                                {project.githubLink && <Button variant="outline" size="sm" className="text-xs" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-1.5 h-3 w-3" /> GitHub</a></Button>}
                                {project.liveDemo && <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-1.5 h-3 w-3" /> Demo</a></Button>}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </section>
             <footer className="text-center py-6 mt-8 text-sm text-gray-400">Made with Portify</footer>
        </main>
      </div>
    </div>
  );
};

export default TwoColumnImage;
