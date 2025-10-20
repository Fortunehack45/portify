
'use client';
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import React from 'react';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const CraftsmanPaper: React.FC<TemplateProps> = ({ user, projects }) => {

    const getSocialButton = (platform: SocialPlatform, url: string) => {
        const iconClass = "mr-2 h-4 w-4";
        const buttonClass = "border-stone-300 hover:bg-stone-200/80 hover:border-stone-400";
        switch (platform) {
            case 'github': return <Button variant="outline" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer"><Github className={iconClass} /> GitHub</a></Button>;
            case 'linkedin': return <Button variant="outline" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer"><Linkedin className={iconClass} /> LinkedIn</a></Button>;
            case 'twitter': return <Button variant="outline" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer"><Twitter className={iconClass} /> Twitter</a></Button>;
            case 'website': return <Button variant="outline" className={buttonClass} asChild><a href={url} target="_blank" rel="noopener noreferrer"><LinkIcon className={iconClass} /> Website</a></Button>;
            default: return null;
        }
    }

  return (
    <div style={{fontFamily: "'Merriweather', serif"}} className="font-body bg-[#f9f6f1] text-stone-800 min-h-screen">
      <header className="py-12 bg-[#edeae4] border-b-2 border-stone-300/80">
        <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-stone-900">{user.name}</h1>
            <p className="text-lg text-stone-600 mt-2">@{user.username}</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-stone-200/80">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="bg-white/80 shadow-sm border-stone-200/90">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-headline mb-4 border-b pb-2 border-stone-200">About Me</h2>
                  <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{user.bio}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-headline mb-4 border-b pb-2 border-stone-200">Contact & Socials</h2>
                  <div className="flex flex-wrap gap-3">
                    {user.email && <Button variant="outline" className="border-stone-300 hover:bg-stone-200/80 hover:border-stone-400" asChild><a href={`mailto:${user.email}`}><Mail className="mr-2 h-4 w-4" /> Email</a></Button>}
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
                <Card key={project.id} className="bg-white/80 shadow-sm border-stone-200/90 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold font-headline text-stone-900">{project.title}</h3>
                    <p className="text-stone-700 my-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-stone-200 text-stone-700">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubLink && <Button variant="outline" size="sm" className="border-stone-300 hover:bg-stone-200/80 hover:border-stone-400" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                      {project.liveDemo && <Button size="sm" className="bg-stone-800 text-white hover:bg-stone-700" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="bg-white/80 shadow-sm border-stone-200/90">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill) => (
                    <Badge key={skill} className="text-base px-4 py-2 bg-stone-700 text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="text-center py-6 text-sm text-stone-500">Made by Fortune</footer>
    </div>
  );
};

export default CraftsmanPaper;
