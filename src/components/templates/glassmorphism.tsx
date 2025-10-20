
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

const Glassmorphism: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-5 h-5 text-white/80 group-hover:text-white transition-colors";
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform} className="group">
                {platform === 'github' && <Github className={iconClass} />}
                {platform === 'linkedin' && <Linkedin className={iconClass} />}
                {platform === 'twitter' && <Twitter className={iconClass} />}
                {platform === 'website' && <LinkIcon className={iconClass} />}
            </a>
        );
    }

    const GlassCard: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => (
        <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg ${className}`}>
            {children}
        </div>
    )

  return (
    <div className="font-body bg-gray-900 text-white min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-500 z-0" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAyMEwyMCAwWk0tNSA1TDUsLTVaTS0xMCAxMEwxMCAtMTBaIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50"/>
      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="fixed -top-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      <div className="fixed -bottom-40 -right-20 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        <GlassCard className="p-8 md:p-12 mb-12">
            <header className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold font-headline text-white">{user.name}</h1>
                <p className="text-xl text-white/80 mt-2">{user.jobTitle}</p>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-white/90">{user.bio}</p>
                 <div className="flex justify-center gap-6 mt-8">
                    {user.socials?.map(social => (
                        <React.Fragment key={social.platform}>
                            {getSocialIcon(social.platform, social.url)}
                        </React.Fragment>
                    ))}
                    {user.email && <a href={`mailto:${user.email}`} aria-label="Email" className="group"><Mail className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" /></a>}
                </div>
            </header>
        </GlassCard>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <GlassCard className="p-6 h-full">
                    <h2 className="text-2xl font-bold font-headline text-white mb-4">Skills</h2>
                     <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-white/20 border-white/30 text-white backdrop-blur-sm">
                            {skill}
                        </Badge>
                        ))}
                    </div>
                </GlassCard>
            </div>
            <div className="md:col-span-2">
                <section id="projects">
                    <h2 className="text-3xl font-bold font-headline mb-8 text-white">Projects</h2>
                    <div className="space-y-8">
                    {projects.map((project) => (
                        <GlassCard key={project.id} className="p-6 transition-all duration-300 hover:border-white/40">
                             <h3 className="text-2xl font-bold font-headline text-white">{project.title}</h3>
                            <p className="text-white/80 my-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech) => (
                                <Badge key={tech} variant="outline" className="bg-white/10 border-white/20 text-white/90 backdrop-blur-sm">{tech}</Badge>
                            ))}
                            </div>
                            <div className="flex gap-4 mt-auto">
                                {project.githubLink && <Button variant="outline" size="sm" className="bg-transparent border-white/40 text-white hover:bg-white/10" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                                {project.liveDemo && <Button size="sm" className="bg-white/90 text-black hover:bg-white" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                            </div>
                        </GlassCard>
                    ))}
                    </div>
                </section>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Glassmorphism;
