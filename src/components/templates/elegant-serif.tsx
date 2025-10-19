import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const ElegantSerif: React.FC<TemplateProps> = ({ user, projects }) => {
    const getSocialIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github className="w-5 h-5 text-gray-500 hover:text-gray-800" />;
            case 'linkedin': return <Linkedin className="w-5 h-5 text-gray-500 hover:text-gray-800" />;
            case 'twitter': return <Twitter className="w-5 h-5 text-gray-500 hover:text-gray-800" />;
            default: return <LinkIcon className="w-5 h-5 text-gray-500 hover:text-gray-800" />;
        }
    }

  return (
    <div style={{ fontFamily: "'Lora', serif" }} className="bg-[#fdfcf9] text-[#3d3d3d] min-h-screen">
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <header className="text-center mb-16 border-b border-gray-200 pb-10">
          <h1 className="text-5xl md:text-6xl font-normal">{user.name}</h1>
          <p className="text-lg text-gray-500 mt-4">@{user.username}</p>
          <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed">{user.bio}</p>
          <div className="flex justify-center gap-2 mt-6">
            {user.socials?.map(social => (
                <Button key={social.platform} variant="ghost" size="icon" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                        {getSocialIcon(social.platform)}
                    </a>
                </Button>
            ))}
            {user.email && <Button variant="ghost" size="icon" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5 text-gray-500 hover:text-gray-800" /></a></Button>}
          </div>
        </header>

        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-normal text-center mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-base px-4 py-1 rounded-full border-gray-300 font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-3xl font-normal text-center mb-10">Projects</h2>
          <div className="space-y-12">
            {projects.map((project) => (
              <div key={project.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                <h3 className="text-3xl font-normal text-gray-900">{project.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 my-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-sm text-gray-500 italic">{tech}</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
                <div className="flex gap-4">
                  {project.githubLink && (
                    <Button variant="link" className="p-0 text-gray-600 hover:text-gray-900" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        View Source <Github className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.liveDemo && (
                     <Button variant="link" className="p-0 text-gray-600 hover:text-gray-900" asChild>
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="text-center py-6 text-sm text-gray-400">Made with FolioForge</footer>
    </div>
  );
};

export default ElegantSerif;