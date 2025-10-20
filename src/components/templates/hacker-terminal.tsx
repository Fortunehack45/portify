
import { User, Project } from '@/types';
import { Github, ExternalLink, Mail, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SocialPlatform } from '@/types';

interface TemplateProps {
  user: User;
  projects: Project[];
}

const HackerTerminal: React.FC<TemplateProps> = ({ user, projects }) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const commands = ['bio', 'skills', 'socials', 'projects', 'clear', 'help'];
    let i = 0;

    const initialCommands = [
      `Welcome, ${user.username}.`,
      "Type 'help' to see available commands."
    ];
    setHistory(initialCommands);

    const typeCommand = (cmd: string, callback: () => void) => {
      let j = 0;
      const interval = setInterval(() => {
        setCommand(cmd.slice(0, j + 1));
        j++;
        if (j >= cmd.length) {
          clearInterval(interval);
          setTimeout(callback, 500);
        }
      }, 100);
    };

    const runCommand = (cmd: string) => {
        let output: React.ReactNode[] = [];
        switch (cmd) {
            case 'help':
                output = ["Available commands:", "'bio', 'skills', 'socials', 'projects', 'email', 'clear', 'help'"];
                break;
            case 'bio':
                output = [user.bio];
                break;
            case 'skills':
                output = [user.skills.join(' | ')];
                break;
            case 'socials':
                output = user.socials.map(s => <SocialLink key={s.platform} {...s} />);
                break;
            case 'projects':
                output = projects.map(p => <ProjectDisplay key={p.id} {...p} />);
                break;
            case 'email':
                output = [<a key="email" href={`mailto:${user.email}`} className="text-green-400 hover:underline">{user.email}</a>];
                break;
            case 'clear':
                setHistory([]);
                return;
            default:
                output = [`Command not found: ${cmd}. Type 'help' for a list of commands.`];
        }
        setHistory(prev => [...prev, `> ${cmd}`, ...output, ' ']);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            runCommand(command.toLowerCase());
            setCommand('');
        }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    }

  }, [command, user, projects]);

  const SocialLink: React.FC<{platform: SocialPlatform, url: string}> = ({ platform, url }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center gap-2">
      {platform.charAt(0).toUpperCase() + platform.slice(1)} <ExternalLink size={14} />
    </a>
  );

  const ProjectDisplay: React.FC<Project> = (project) => (
    <div className="mt-2">
        <p className="font-bold text-white">{project.title}</p>
        <p className="text-green-300">{project.description}</p>
        <p className="text-green-500 text-sm">Stack: {project.techStack.join(', ')}</p>
        <div className="flex gap-4">
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center gap-1"><Github size={14} /> Source</a>}
            {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline flex items-center gap-1"><ExternalLink size={14} /> Demo</a>}
        </div>
    </div>
  );

  return (
    <div className="font-mono bg-black text-green-400 min-h-screen p-4 sm:p-6 md:p-8 flex flex-col" onClick={() => document.getElementById('command-input')?.focus()}>
      <div id="terminal" className="flex-grow overflow-auto">
        {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div className="flex">
            <span>&gt;&nbsp;</span>
            <input
                id="command-input"
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="bg-transparent border-none text-green-400 focus:outline-none w-full"
                autoFocus
                spellCheck="false"
            />
        </div>
      </div>
      <footer className="text-center pt-8 text-xs text-green-800">Portify v1.0.0</footer>
    </div>
  );
};

export default HackerTerminal;
