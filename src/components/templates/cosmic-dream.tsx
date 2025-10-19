// Sidebar Profile
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const SidebarProfile: React.FC<TemplateProps> = ({ user, projects }) => {
  return (
    <div className="flex min-h-screen font-body bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-full md:w-72 lg:w-80 bg-white border-r border-gray-200 p-8 flex-col hidden md:flex">
        <div className="flex-grow overflow-y-auto">
            <h1 className="text-3xl font-bold font-headline text-gray-900">{user.name}</h1>
            <p className="text-md text-gray-500 mt-1">@{user.username}</p>
            <p className="mt-6 text-gray-700">{user.bio}</p>

            <h2 className="text-xl font-bold font-headline mt-8 mb-4 text-gray-900 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                </Badge>
                ))}
            </div>
        </div>
        <div className="flex-shrink-0 pt-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {user.socials?.github && <a href={user.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="w-5 h-5 text-gray-500 hover:text-gray-900" /></a>}
                {user.socials?.linkedin && <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-5 h-5 text-gray-500 hover:text-gray-900" /></a>}
                {user.socials?.twitter && <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="w-5 h-5 text-gray-500 hover:text-gray-900" /></a>}
                {user.socials?.website && <a href={user.socials.website} target="_blank" rel="noopener noreferrer" aria-label="Website"><LinkIcon className="w-5 h-5 text-gray-500 hover:text-gray-900" /></a>}
                {user.email && <a href={`mailto:${user.email}`} aria-label="Email"><Mail className="w-5 h-5 text-gray-500 hover:text-gray-900" /></a>}
            </div>
            <p className="text-xs text-gray-400 mt-4">Made with FolioForge</p>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="w-full md:ml-72 lg:ml-80 p-6 md:p-12">
        {/* Mobile Header */}
        <div className="md:hidden mb-8 p-4 bg-white rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold font-headline text-gray-900">{user.name}</h1>
            <p className="text-md text-gray-500 mt-1">@{user.username}</p>
            <p className="mt-4 text-gray-700">{user.bio}</p>
            <h2 className="text-xl font-bold font-headline mt-6 mb-3 text-gray-900 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="font-normal">
                    {skill}
                </Badge>
                ))}
            </div>
        </div>

        <section id="projects">
          <h2 className="text-3xl font-bold font-headline mb-8 text-gray-900">Projects</h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold font-headline text-gray-900">{project.title}</h3>
                <p className="text-gray-700 my-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubLink && <Button variant="outline" size="sm" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a></Button>}
                  {project.liveDemo && <Button size="sm" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</a></Button>}
                </div>
              </div>
            ))}
          </div>
        </section>
        <footer className="md:hidden text-center py-4 text-xs text-gray-500">Made with FolioForge</footer>
      </main>
    </div>
  );
};

export default SidebarProfile;
