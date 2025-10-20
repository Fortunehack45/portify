
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const RetroGamer: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform) => {
        const iconClass = "w-4 h-4";
        switch (platform) {
            case 'github': return <Github className={iconClass} />;
            case 'linkedin': return <Linkedin className={iconClass} />;
            case 'twitter': return <Twitter className={iconClass} />;
            case 'website': return <LinkIcon className={iconClass} />;
            default: return <LinkIcon className={iconClass} />;
        }
    }

  return (
    <div className="font-mono bg-gray-100 text-gray-800 min-h-screen" style={{imageRendering: 'pixelated'}}>
      <header className="bg-white border-b-4 border-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 uppercase tracking-widest">{user.name}</h1>
          <p className="text-lg text-gray-600 mt-2">@{user.username}</p>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{user.bio}</p>
          <div className="flex justify-center gap-2 sm:gap-4 mt-6">
            {user.socials?.map(social => (
                <Button key={social.platform} variant="outline" className="rounded-none border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none transition-shadow transform hover:-translate-y-1" size="sm" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform} className="flex items-center gap-2">
                        {getSocialIcon(social.platform)} <span className="hidden sm:inline">{social.platform}</span>
                    </a>
                </Button>
            ))}
             {user.email && <Button variant="outline" className="rounded-none border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none transition-shadow transform hover:-translate-y-1" size="sm" asChild>
                <a href={`mailto:${user.email}`} aria-label="Email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> <span className="hidden sm:inline">Email</span></a>
            </Button>}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} className="text-sm px-3 py-1 bg-blue-500 text-white rounded-none border-2 border-blue-700 shadow-[2px_2px_0_0_#1d4ed8]">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 uppercase tracking-wider">Projects</h2>
          <div className="relative pb-12">
            <div className="absolute left-4 md:left-1/2 w-1 h-full bg-gray-400" />
            <div className="space-y-12">
              {projects.map((project, index) => (
                <div key={project.id} className="relative flex items-start group">
                  <div className="absolute left-4 md:left-1/2 top-1 w-8 h-8 bg-gray-800 rounded-full border-4 border-white -translate-x-1/2 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">{index + 1}</div>
                  <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}>
                    <div className={`bg-white border-2 border-gray-800 p-6 rounded-none shadow-[6px_6px_0_0_#888] text-left transition-shadow group-hover:shadow-[8px_8px_0_0_#000] ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                      <p className="text-gray-700 my-3">{project.description}</p>
                      <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="rounded-none">{tech}</Badge>
                        ))}
                      </div>
                      <div className={`flex gap-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {project.githubLink && <Button variant="outline" size="sm" className="rounded-none border-2 border-black" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                        {project.liveDemo && <Button size="sm" className="rounded-none bg-black text-white" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Demo</a></Button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-4 text-xs text-gray-500">Made with Portify</footer>
    </div>
  );
};

export default RetroGamer;
