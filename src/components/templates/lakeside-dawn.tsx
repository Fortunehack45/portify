// Split Hero
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const SplitHero: React.FC<TemplateProps> = ({ user, projects }) => {
    const getSocialIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github className="w-6 h-6 text-gray-600 hover:text-gray-900" />;
            case 'linkedin': return <Linkedin className="w-6 h-6 text-gray-600 hover:text-gray-900" />;
            case 'twitter': return <Twitter className="w-6 h-6 text-gray-600 hover:text-gray-900" />;
            default: return <LinkIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" />;
        }
    }

  return (
    <div className="font-body bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <header className="relative py-20 md:py-28 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-3">
              <h1 className="text-5xl md:text-7xl font-bold font-headline text-gray-900">{user.name}</h1>
              <p className="text-lg text-gray-600 mt-2">@{user.username}</p>
              <p className="mt-6 text-lg max-w-xl">{user.bio}</p>
              <div className="flex gap-2 mt-6">
                {user.socials?.map(social => (
                    <Button key={social.platform} variant="ghost" size="icon" asChild>
                        <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                            {getSocialIcon(social.platform)}
                        </a>
                    </Button>
                ))}
                {user.email && <Button variant="ghost" size="icon" asChild><a href={`mailto:${user.email}`}><Mail className="w-6 h-6 text-gray-600 hover:text-gray-900" /></a></Button>}
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold font-headline mb-4 text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} className="text-sm px-3 py-1 bg-teal-100 text-teal-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
      </header>

      {/* Projects Section */}
      <main className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold font-headline text-center mb-12 text-gray-900">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-50/50 border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-gray-800">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
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
      <footer className="text-center py-6 text-sm text-gray-500 border-t">Made with FolioForge</footer>
    </div>
  );
};

export default SplitHero;