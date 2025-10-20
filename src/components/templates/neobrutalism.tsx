
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon, ArrowRight } from 'lucide-react';
import React from 'react';
import { SocialPlatform } from '@/types';
import Image from 'next/image';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const Neobrutalism: React.FC<TemplateProps> = ({ user, projects }) => {

    const colorClasses = ['bg-yellow-300', 'bg-blue-400', 'bg-pink-400', 'bg-green-400', 'bg-purple-400'];

    const Box: React.FC<{children: React.ReactNode, className?: string, as?: 'div' | 'section' | 'header' | 'footer'}> = ({ children, className, as: Component = 'div' }) => (
        <Component className={`border-2 border-black shadow-[8px_8px_0px_#000] ${className}`}>
            {children}
        </Component>
    )

  return (
    <div className="font-body bg-[#F4F4F4] text-black min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-12">
        <Box as="header" className="p-8 bg-white">
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline">{user.name}</h1>
            <p className="text-xl md:text-2xl mt-2">{user.jobTitle}</p>
            <p className="mt-6 text-lg max-w-3xl">{user.bio}</p>
            <div className="flex flex-wrap gap-4 mt-8">
                {user.email && <Button className="bg-yellow-300 text-black border-2 border-black rounded-md shadow-[4px_4px_0px_#000] hover:shadow-none hover:bg-yellow-400 transform hover:-translate-y-1 transition-all" asChild><a href={`mailto:${user.email}`}><Mail className="mr-2 h-4 w-4" /> Contact Me</a></Button>}
                {user.socials?.map(social => (
                    <Button key={social.platform} variant="outline" className="text-black border-2 border-black rounded-md shadow-[4px_4px_0px_#000] hover:shadow-none hover:bg-gray-200 transform hover:-translate-y-1 transition-all" size="icon" asChild>
                        <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                            {social.platform === 'github' && <Github />}
                            {social.platform === 'linkedin' && <Linkedin />}
                            {social.platform === 'twitter' && <Twitter />}
                            {social.platform === 'website' && <LinkIcon />}
                        </a>
                    </Button>
                ))}
            </div>
        </Box>

        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-12">
                <Box className="p-6 bg-blue-300">
                    <h2 className="text-3xl font-bold font-headline mb-4">Skills</h2>
                     <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                        <Badge key={skill} className="bg-black text-white rounded-md px-3 py-1 text-sm">
                            {skill}
                        </Badge>
                        ))}
                    </div>
                </Box>
            </div>
            <div className="lg:col-span-2">
                <section id="projects">
                    <h2 className="text-4xl font-bold font-headline mb-8">Projects</h2>
                    <div className="space-y-12">
                    {projects.map((project, index) => (
                        <Box key={project.id} className={`bg-white p-6 transition-all duration-300`}>
                             <h3 className="text-3xl font-bold font-headline">{project.title}</h3>
                             <div className={`w-full h-1 my-3 ${colorClasses[index % colorClasses.length]}`}/>
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech) => (
                                <Badge key={tech} variant="outline" className="border-black rounded-md">{tech}</Badge>
                            ))}
                            </div>
                            <div className="flex flex-wrap gap-3 mt-auto">
                                {project.githubLink && <Button variant="outline" size="sm" className="text-black border-2 border-black rounded-md hover:bg-gray-200" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                                {project.liveDemo && <Button size="sm" className="bg-black text-white rounded-md hover:bg-gray-800 group" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/></a></Button>}
                            </div>
                        </Box>
                    ))}
                    </div>
                </section>
            </div>
        </div>
        <Box as="footer" className="p-4 bg-white text-center">
            <p className="text-sm">Made by Fortune</p>
        </Box>
      </main>
    </div>
  );
};

export default Neobrutalism;
