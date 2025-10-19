// One-Page Scroll
'use client'
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { useEffect } from 'react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const OnePageScroll: React.FC<TemplateProps> = ({ user, projects }) => {

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }, [])

    const getSocialIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github className="w-6 h-6 text-gray-400 hover:text-blue-400" />;
            case 'linkedin': return <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-400" />;
            case 'twitter': return <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400" />;
            default: return <LinkIcon className="w-6 h-6 text-gray-400 hover:text-blue-400" />;
        }
    }


  return (
    <div className="font-body bg-gray-900 text-white min-h-screen">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 max-w-5xl h-16 flex justify-between items-center">
          <span className="font-bold font-headline text-lg">{user.name}</span>
          <div className="space-x-4 md:space-x-6">
            <a href="#profile" className="text-sm hover:text-blue-400 transition-colors">Profile</a>
            <a href="#skills" className="text-sm hover:text-blue-400 transition-colors">Skills</a>
            <a href="#projects" className="text-sm hover:text-blue-400 transition-colors">Projects</a>
          </div>
        </nav>
      </header>
      
      <main className="scroll-smooth">
        {/* Profile Section */}
        <section id="profile" className="min-h-screen flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h1 className="text-6xl md:text-7xl font-bold font-headline">{user.name}</h1>
            <p className="text-xl text-gray-400 mt-2">@{user.username}</p>
            <p className="mt-8 text-lg text-gray-300 leading-relaxed">{user.bio}</p>
            <div className="flex justify-center gap-2 mt-8">
              {user.socials?.map(social => (
                  <Button key={social.platform} variant="ghost" size="icon" asChild>
                      <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                          {getSocialIcon(social.platform)}
                      </a>
                  </Button>
              ))}
              {user.email && <Button variant="ghost" size="icon" asChild><a href={`mailto:${user.email}`}><Mail className="w-6 h-6 text-gray-400 hover:text-blue-400" /></a></Button>}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center bg-gray-800/50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-5xl font-bold font-headline mb-12">Skills</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {user.skills.map((skill) => (
                <Badge key={skill} className="text-xl px-6 py-3 bg-gray-700 text-gray-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center pt-24 pb-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-5xl font-bold font-headline text-center mb-16">Projects</h2>
            <div className="space-y-16">
              {projects.map((project) => (
                <div key={project.id} className="text-center">
                  <h3 className="text-3xl font-bold font-headline text-blue-400">{project.title}</h3>
                  <p className="text-gray-400 my-4 max-w-2xl mx-auto">{project.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-gray-600 text-gray-400">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-center">
                    {project.githubLink && <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                    {project.liveDemo && <Button className="bg-blue-600 hover:bg-blue-500" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-6 text-sm text-gray-600">Made with FolioForge</footer>
    </div>
  );
};

export default OnePageScroll;