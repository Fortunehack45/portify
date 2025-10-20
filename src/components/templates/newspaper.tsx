
import { User, Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import React from 'react';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const Newspaper: React.FC<TemplateProps> = ({ user, projects }) => {

  return (
    <div style={{fontFamily: "'Times New Roman', Times, serif"}} className="bg-[#F8F7F4] text-[#1a1a1a] min-h-screen">
        <header className="container mx-auto px-4 pt-12 pb-8 max-w-7xl">
            <div className="text-center border-y-4 border-black py-4">
                <h1 className="text-6xl md:text-8xl font-black uppercase">{user.name}'s Portfolio</h1>
            </div>
            <div className="flex justify-between items-center border-b-2 border-black py-2 text-sm">
                <span>Vol. 1, No. 1</span>
                <span className="font-bold">{user.jobTitle}</span>
                <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                <div className="lg:col-span-1 lg:border-r lg:pr-6 border-gray-300">
                    <aside className="space-y-8 lg:sticky lg:top-8">
                        <section>
                            <h2 className="text-2xl font-bold border-b border-black pb-2 mb-4">About the Author</h2>
                            <p className="text-base leading-relaxed">{user.bio}</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold border-b border-black pb-2 mb-4">Expertise</h2>
                            <ul className="list-disc list-inside space-y-1">
                                {user.skills.map(skill => <li key={skill}>{skill}</li>)}
                            </ul>
                        </section>
                        <section>
                             <h2 className="text-2xl font-bold border-b border-black pb-2 mb-4">Contact</h2>
                            <div className="space-y-2 text-sm">
                                {user.email && <p className="break-all"><a href={`mailto:${user.email}`} className="hover:underline">{user.email}</a></p>}
                                {user.socials?.map(s => (
                                    <p key={s.platform} className="capitalize break-all"><a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{s.platform}</a></p>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>

                <div className="lg:col-span-3">
                    <section id="projects" className="space-y-10">
                        {projects.map((project, index) => (
                        <article key={project.id} className={index > 0 ? "border-t border-gray-300 pt-8" : ""}>
                            <h3 className="text-4xl font-bold mb-2">{project.title}</h3>
                            <div className="flex flex-wrap gap-x-2 text-sm text-gray-600 mb-4">
                                {project.techStack.map(t => <span key={t}>#{t}</span>)}
                            </div>
                            <p className="text-lg leading-relaxed mb-4 columns-1 sm:columns-2 gap-8">{project.description}</p>
                            <div className="flex gap-4">
                                {project.githubLink && <Button variant="outline" className="border-black rounded-none text-black hover:bg-gray-200" asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> View Source</a></Button>}
                                {project.liveDemo && <Button className="bg-black text-white rounded-none hover:bg-gray-800" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Read Article</a></Button>}
                            </div>
                        </article>
                        ))}
                    </section>
                </div>
            </div>
        </main>
      <footer className="text-center py-6 text-xs text-gray-600 border-t border-gray-300 mt-8">
        Made by Fortune
      </footer>
    </div>
  );
};

export default Newspaper;
