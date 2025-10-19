// Interactive Tabs
'use client';
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const InteractiveTabs: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialButton = (platform: string, url: string) => {
        switch (platform) {
            case 'github': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>;
            case 'linkedin': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a></Button>;
            case 'twitter': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><Twitter className="mr-2 h-4 w-4" /> Twitter</a></Button>;
            case 'website': return <Button variant="outline" asChild><a href={url} target="_blank" rel="noopener noreferrer"><LinkIcon className="mr-2 h-4 w-4" /> Website</a></Button>;
            default: return null;
        }
    }

  return (
    <div className="font-body bg-blue-50 text-gray-800 min-h-screen">
      <header className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-gray-900">{user.name}</h1>
            <p className="text-lg text-gray-600 mt-2">@{user.username}</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-headline mb-4">About Me</h2>
                  <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-headline mb-4">Contact & Socials</h2>
                  <div className="flex flex-wrap gap-4">
                    {user.email && <Button variant="outline" asChild><a href={`mailto:${user.email}`}><Mail className="mr-2 h-4 w-4" /> Email</a></Button>}
                    {user.socials?.map(social => (
                        <React.Fragment key={social.platform}>
                            {getSocialButton(social.platform, social.url)}
                        </React.Fragment>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="space-y-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold font-headline text-gray-900">{project.title}</h3>
                    <p className="text-gray-700 my-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubLink && <Button variant="outline" size="sm" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                      {project.liveDemo && <Button size="sm" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill) => (
                    <Badge key={skill} className="text-lg px-4 py-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">Made with FolioForge</footer>
    </div>
  );
};

export default InteractiveTabs;