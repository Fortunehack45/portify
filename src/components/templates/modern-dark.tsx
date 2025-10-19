
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const ModernDark: React.FC<TemplateProps> = ({ user, projects }) => {
  const accentColor = 'text-cyan-400';

    const getSocialIcon = (platform: SocialPlatform) => {
        const iconClass = "w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors";
        switch (platform) {
            case 'github': return <Github className={iconClass} />;
            case 'linkedin': return <Linkedin className={iconClass} />;
            case 'twitter': return <Twitter className={iconClass} />;
            case 'website': return <LinkIcon className={iconClass} />;
            default: return <LinkIcon className={iconClass} />;
        }
    }

  return (
    <div className="font-body bg-[#101010] text-gray-300 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className={cn("text-5xl md:text-7xl font-bold font-headline text-white tracking-tighter")}>
            {user.name}
          </h1>
          <p className="text-xl text-gray-400 mt-3">@{user.username}</p>
          <p className="mt-6 text-lg max-w-3xl mx-auto">{user.bio}</p>
          <div className="flex justify-center gap-2 mt-6">
            {user.socials?.map(social => (
                <Button key={social.platform} variant="ghost" size="icon" className="group" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                        {getSocialIcon(social.platform)}
                    </a>
                </Button>
            ))}
            {user.email && <Button variant="ghost" size="icon" className="group" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" /></a></Button>}
          </div>
        </header>

        <section id="skills" className="mb-20">
          <h2 className={cn("text-3xl font-bold font-headline text-center mb-8 text-white")}>Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} className="text-base px-4 py-2 bg-gray-900 border border-gray-700 text-gray-300 hover:border-cyan-400/50 hover:text-white transition-colors">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className={cn("text-3xl font-bold font-headline text-center mb-12 text-white")}>Projects</h2>
          <div className="grid md:grid-cols-1 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-2xl font-headline text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-cyan-300 border-cyan-400/30 bg-cyan-900/20">{tech}</Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubLink && (
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-800 hover:text-white" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveDemo && (
                    <Button className="bg-cyan-500 text-gray-900 font-bold hover:bg-cyan-400" asChild>
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="text-center py-6 text-xs text-gray-600">Made with FolioForge</footer>
    </div>
  );
};

export default ModernDark;
