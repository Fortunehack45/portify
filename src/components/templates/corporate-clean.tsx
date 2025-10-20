
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon, MapPin, Briefcase } from 'lucide-react';
import React from 'react';
import { SocialPlatform } from '@/types';
import Image from 'next/image';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const CorporateClean: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform, url: string) => {
        const iconClass = "w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors";
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
    <div className="font-body bg-gray-50 text-gray-700 min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center max-w-7xl">
            <div className="font-bold text-xl text-gray-800 font-headline">{user.name}</div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
                <a href="#projects" className="text-gray-600 hover:text-blue-600">Projects</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <section id="hero" className="text-center py-16 md:py-24">
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-gray-900">{user.jobTitle}</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{user.bio}</p>
            <Button size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href="#projects">View My Work</a>
            </Button>
        </section>

        <section id="about" className="py-16 md:py-24 bg-white rounded-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold font-headline text-gray-900 mb-4">About Me</h2>
                    <div className="space-y-4 text-gray-600">
                        {user.location && <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-blue-500"/> {user.location}</p>}
                        {user.availability && <p className="flex items-center gap-3"><Briefcase className="w-5 h-5 text-blue-500"/> Currently {user.availability}</p>}
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold font-headline text-gray-900 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800 text-sm">
                            {skill}
                        </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section id="projects" className="py-16 md:py-24">
            <h2 className="text-4xl font-bold font-headline text-center mb-12 text-gray-900">Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1">
                    {project.imageUrl && <div className="aspect-video bg-gray-100"><Image src={project.imageUrl} alt={project.title} width={400} height={225} className="w-full h-full object-cover"/></div>}
                    <div className="p-6">
                        <h3 className="text-xl font-bold font-headline text-gray-900">{project.title}</h3>
                        <p className="text-gray-600 my-3 text-sm h-16 overflow-hidden">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-auto">
                            {project.githubLink && <Button variant="outline" size="sm" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                            {project.liveDemo && <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white"><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Demo</a></Button>}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </section>
      </main>

      <footer id="contact" className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-12 max-w-7xl text-center">
            <h2 className="text-3xl font-bold font-headline text-gray-900">Get In Touch</h2>
            <p className="mt-4 text-lg text-gray-600">Feel free to reach out for collaborations or just a friendly chat.</p>
            <a href={`mailto:${user.email}`} className="mt-6 inline-block text-lg font-medium text-blue-600 hover:underline">{user.email}</a>
            <div className="flex justify-center gap-6 mt-8">
                {user.socials?.map(social => (
                    <React.Fragment key={social.platform}>
                        {getSocialIcon(social.platform, social.url)}
                    </React.Fragment>
                ))}
            </div>
          </div>
      </footer>
    </div>
  );
};

export default CorporateClean;
