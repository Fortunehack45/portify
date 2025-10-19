
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const CosmicDream: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: SocialPlatform) => {
        switch (platform) {
            case 'github': return <Github className="w-5 h-5 text-purple-300 group-hover:text-purple-100 transition-colors" />;
            case 'linkedin': return <Linkedin className="w-5 h-5 text-purple-300 group-hover:text-purple-100 transition-colors" />;
            case 'twitter': return <Twitter className="w-5 h-5 text-purple-300 group-hover:text-purple-100 transition-colors" />;
            case 'website': return <LinkIcon className="w-5 h-5 text-purple-300 group-hover:text-purple-100 transition-colors" />;
            default: return <LinkIcon className="w-5 h-5 text-purple-300 group-hover:text-purple-100 transition-colors" />;
        }
    }

  return (
    <div className="font-body bg-gradient-to-br from-gray-900 to-purple-900 text-purple-100 min-h-screen">
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <aside className="w-full md:w-1/3 lg:w-1/4 p-8 border-b md:border-b-0 md:border-r border-purple-400/20 flex flex-col space-y-8 md:sticky md:top-0 md:h-screen">
                <div className="flex-grow">
                    <h1 className="text-4xl font-bold font-headline text-white">{user.name}</h1>
                    <p className="text-md text-purple-300 mt-1">@{user.username}</p>
                    <p className="mt-6 text-purple-200">{user.bio}</p>

                    <h2 className="text-xl font-bold font-headline mt-8 mb-4 text-white border-b border-purple-400/20 pb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="font-normal bg-purple-500/20 border-purple-400/30 text-purple-200">
                            {skill}
                        </Badge>
                        ))}
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <div className="flex flex-wrap gap-4">
                        {user.socials?.map(social => (
                            <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform} className="group">
                                {getSocialIcon(social.platform)}
                            </a>
                        ))}
                        {user.email && <a href={`mailto:${user.email}`} aria-label="Email" className="group"><Mail className="w-5 h-5 text-purple-300 group-hover:text-purple-100 transition-colors" /></a>}
                    </div>
                    <p className="text-xs text-purple-400/50 mt-6">Made with FolioForge</p>
                </div>
            </aside>
            
            {/* Main content */}
            <main className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-12">
                <section id="projects">
                <h2 className="text-4xl font-bold font-headline mb-8 text-white">Projects</h2>
                <div className="space-y-8">
                    {projects.map((project) => (
                    <div key={project.id} className="bg-purple-900/30 p-6 rounded-lg border border-purple-400/20 backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-purple-900/50">
                        <h3 className="text-2xl font-bold font-headline text-white">{project.title}</h3>
                        <p className="text-purple-200 my-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="border-purple-400/30 text-purple-300">{tech}</Badge>
                        ))}
                        </div>
                        <div className="flex gap-4 mt-6">
                        {project.githubLink && <Button variant="outline" size="sm" className="bg-transparent text-purple-200 border-purple-400/50 hover:bg-purple-500/20 hover:text-white" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                        {project.liveDemo && <Button size="sm" className="bg-purple-500 text-white hover:bg-purple-400" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                        </div>
                    </div>
                    ))}
                </div>
                </section>
            </main>
        </div>
    </div>
  );
};

export default CosmicDream;
