import { User, Project } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const ProfessionalBlue: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github className="w-5 h-5" />;
            case 'linkedin': return <Linkedin className="w-5 h-5" />;
            case 'twitter': return <Twitter className="w-5 h-5" />;
            default: return <LinkIcon className="w-5 h-5" />;
        }
    }

  return (
    <div className="font-body bg-slate-50 text-slate-800 min-h-screen">
      <header className="bg-slate-800 text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold font-headline">{user.name}</h1>
          <p className="text-xl text-slate-300 mt-2">@{user.username}</p>
          <div className="flex justify-center md:justify-start gap-2 mt-4">
            {user.socials?.map(social => (
                <Button key={social.platform} variant="ghost" className="text-slate-300 hover:bg-slate-700 hover:text-white" size="icon" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                        {getSocialIcon(social.platform)}
                    </a>
                </Button>
            ))}
            {user.email && <Button variant="ghost" className="text-slate-300 hover:bg-slate-700 hover:text-white" size="icon" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5" /></a></Button>}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <Card className="bg-white shadow-md sticky top-8">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-slate-900 border-b pb-2">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">{user.bio}</p>
                <h3 className="font-bold font-headline text-lg text-slate-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} className="bg-blue-100 text-blue-800 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <section id="projects">
              <h2 className="text-3xl font-bold font-headline mb-8 text-slate-900">Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl font-headline text-blue-700">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                      <p className="text-slate-600 mb-4 flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-slate-300 text-slate-600">{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.githubLink && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" /> Source
                            </a>
                          </Button>
                        )}
                        {project.liveDemo && (
                          <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
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
            </section>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-slate-500 bg-slate-100">Made with FolioForge</footer>
    </div>
  );
};

export default ProfessionalBlue;