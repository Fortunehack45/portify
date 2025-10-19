// Card Grid
import { User, Project } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const CardGrid: React.FC<TemplateProps> = ({ user, projects }) => {
  return (
    <div className="font-body bg-gray-100 text-gray-800 min-h-screen p-4 sm:p-6 md:p-8">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Profile Card */}
        <Card className="md:col-span-2 lg:col-span-1 bg-white shadow-lg border-2 border-black rounded-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline border-b-2 border-black pb-2">{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md text-gray-600 mb-4">@{user.username}</p>
            <p className="mb-6">{user.bio}</p>
            <div className="flex flex-wrap gap-2">
              {user.socials?.github && <Button variant="outline" className="rounded-none border-2 border-black" size="icon" asChild><a href={user.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="w-5 h-5" /></a></Button>}
              {user.socials?.linkedin && <Button variant="outline" className="rounded-none border-2 border-black" size="icon" asChild><a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a></Button>}
              {user.socials?.twitter && <Button variant="outline" className="rounded-none border-2 border-black" size="icon" asChild><a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5" /></a></Button>}
              {user.email && <Button variant="outline" className="rounded-none border-2 border-black" size="icon" asChild><a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5" /></a></Button>}
            </div>
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card className="md:col-span-1 lg:col-span-1 bg-yellow-300 text-black shadow-lg border-2 border-black rounded-none">
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

        {/* Project Cards */}
        {projects.map((project, index) => (
          <Card key={project.id} className="bg-white shadow-lg border-2 border-black rounded-none flex flex-col hover:bg-blue-100 transition-colors">
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
                  <Button variant="outline" size="sm" className="rounded-none border-2 border-black" asChild>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </a>
                  </Button>
                )}
                {project.liveDemo && (
                  <Button size="sm" className="rounded-none bg-black text-white" asChild>
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
      <footer className="text-center pt-8 text-xs text-gray-500">Made with FolioForge</footer>
    </div>
  );
};

export default CardGrid;
