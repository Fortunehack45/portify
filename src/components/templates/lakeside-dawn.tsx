
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const LakesideDawn: React.FC<TemplateProps> = ({ user, projects }) => {
    const getSocialIcon = (platform: SocialPlatform) => {
        const iconClass = "w-6 h-6 text-gray-500 group-hover:text-teal-700 transition-colors";
        switch (platform) {
            case 'github': return <Github className={iconClass} />;
            case 'linkedin': return <Linkedin className={iconClass} />;
            case 'twitter': return <Twitter className={iconClass} />;
            case 'website': return <LinkIcon className={iconClass} />;
            default: return <LinkIcon className={iconClass} />;
        }
    }

  return (
    <div className="font-body bg-gray-50 text-gray-800 min-h-screen">
      <header className="relative py-20 md:py-28 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-3">
              <h1 className="text-5xl md:text-7xl font-bold font-headline text-gray-900">{user.name}</h1>
              <p className="text-lg text-gray-600 mt-2">@{user.username}</p>
              <p className="mt-6 text-lg max-w-xl">{user.bio}</p>
              <div className="flex gap-2 mt-6">
                {user.socials?.map(social => (
                    <Button key={social.platform} variant="ghost" size="icon" className="group" asChild>
                        <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                            {getSocialIcon(social.platform)}
                        </a>
                    </Button>
                ))}
                {user.email && <Button variant="ghost" size="icon" className="group" asChild><a href={`mailto:${user.email}`} aria-label="email"><Mail className="w-6 h-6 text-gray-500 group-hover:text-teal-700 transition-colors" /></a></Button>}
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold font-headline mb-4 text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} className="text-sm px-3 py-1 bg-teal-100 text-teal-800 border border-teal-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16 md:py-20 bg-gray-50/70">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold font-headline text-center mb-12 text-gray-900">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-white border hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-teal-800">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-gray-600">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubLink && <Button variant="outline" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                    {project.liveDemo && <Button className="bg-teal-600 hover:bg-teal-700 text-white" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500 border-t bg-white">Made with Portify</footer>
    </div>
  );
};

export default LakesideDawn;
