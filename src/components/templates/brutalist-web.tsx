
import { User, Project } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const BrutalistWeb: React.FC<TemplateProps> = ({ user, projects }) => {
  const getSocialIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'website': return <LinkIcon className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  }

  return (
    <div className="font-mono bg-yellow-50 text-black min-h-screen p-4 sm:p-6 md:p-8">
      <main className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white shadow-lg border-2 border-black rounded-none p-6">
            <CardTitle className="text-3xl sm:text-4xl font-bold font-headline border-b-2 border-black pb-2">{user.name}</CardTitle>
            <p className="text-md text-gray-700 mt-2">@{user.username}</p>
            <p className="mt-4">{user.bio}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {user.socials?.map(social => (
                  <Button key={social.platform} variant="outline" className="rounded-none border-2 border-black hover:bg-black hover:text-white transition-colors" size="icon" asChild>
                      <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                          {getSocialIcon(social.platform)}
                      </a>
                  </Button>
              ))}
              {user.email && <Button variant="outline" className="rounded-none border-2 border-black hover:bg-black hover:text-white transition-colors" size="icon" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5" /></a></Button>}
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <Card className="bg-blue-300 text-black shadow-lg border-2 border-black rounded-none h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold font-headline border-b-2 border-black pb-2">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                            <Badge key={skill} className="text-sm px-3 py-1 bg-black text-white rounded-none">
                            {skill}
                            </Badge>
                        ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                 <div className="space-y-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="bg-white shadow-lg border-2 border-black rounded-none flex flex-col transition-all hover:shadow-xl">
                            <CardHeader>
                            <CardTitle className="text-2xl font-bold font-headline">{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                            <p className="text-gray-700 mb-4 flex-grow">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech) => (
                                <Badge key={tech} variant="secondary" className="rounded-none">{tech}</Badge>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.githubLink && (
                                <Button variant="outline" size="sm" className="rounded-none border-2 border-black hover:bg-black hover:text-white" asChild>
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" /> Code
                                    </a>
                                </Button>
                                )}
                                {project.liveDemo && (
                                <Button size="sm" className="rounded-none bg-black text-white hover:bg-gray-700" asChild>
                                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                    </a>
                                </Button>
                                )}
                            </div>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>
        </div>
      </main>
      <footer className="text-center pt-8 mt-8 text-xs text-gray-600">Made with Portify</footer>
    </div>
  );
};

export default BrutalistWeb;
