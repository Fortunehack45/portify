// Timeline Style
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const TimelineStyle: React.FC<TemplateProps> = ({ user, projects }) => {
  return (
    <div className="font-mono bg-gray-100 text-gray-800 min-h-screen">
      <header className="bg-white border-b-4 border-gray-800 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 uppercase tracking-widest">{user.name}</h1>
          <p className="text-lg text-gray-600 mt-2">@{user.username}</p>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{user.bio}</p>
          <div className="flex justify-center gap-4 mt-6">
            {user.socials?.github && <Button variant="outline" size="sm" asChild><a href={user.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="w-4 h-4" /></a></Button>}
            {user.socials?.linkedin && <Button variant="outline" size="sm" asChild><a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a></Button>}
            {user.socials?.twitter && <Button variant="outline" size="sm" asChild><a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-4 h-4" /></a></Button>}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <section id="skills" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center uppercase tracking-wider">Skills</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {user.skills.map((skill) => (
              <Badge key={skill} className="text-sm px-3 py-1 bg-blue-500 text-white border-2 border-blue-700 shadow-md">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 uppercase tracking-wider">Projects</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 w-1 h-full bg-gray-300" />
            <div className="space-y-12">
              {projects.map((project, index) => (
                <div key={project.id} className="relative flex items-start">
                  <div className="absolute left-4 md:left-1/2 top-1 w-8 h-8 bg-gray-800 rounded-full border-4 border-white -translate-x-1/2 flex items-center justify-center text-white font-bold">{index + 1}</div>
                  <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-0' : 'md:pl-8 md:ml-auto'}`}>
                    <div className={`bg-white border-2 border-gray-800 p-6 rounded-lg shadow-lg text-left ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                      <p className="text-gray-700 my-3">{project.description}</p>
                      <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                      <div className={`flex gap-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {project.githubLink && <Button variant="outline" size="sm" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                        {project.liveDemo && <Button size="sm" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Demo</a></Button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center py-4 text-xs text-gray-500">Made with FolioForge</footer>
    </div>
  );
};

export default TimelineStyle;
