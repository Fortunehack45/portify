'use client';
import { Project } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { useUser as useAuthUser } from '@/firebase';

interface ProjectFormProps {
    project?: Project | null;
    onSave: (project: Project) => void;
    onClose: () => void;
}

export default function ProjectForm({ project, onSave, onClose }: ProjectFormProps) {
    const { user: authUser } = useAuthUser();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [liveDemo, setLiveDemo] = useState('');
    const [techStack, setTechStack] = useState<string[]>([]);
    const [techInput, setTechInput] = useState('');

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setGithubLink(project.githubLink || '');
            setLiveDemo(project.liveDemo || '');
            setTechStack(project.techStack);
        } else {
            setTitle('');
            setDescription('');
            setGithubLink('');
            setLiveDemo('');
            setTechStack([]);
        }
    }, [project]);
    
    const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && techInput.trim() !== '') {
          e.preventDefault();
          if (!techStack.includes(techInput.trim())) {
            setTechStack([...techStack, techInput.trim()]);
          }
          setTechInput('');
        }
    };
    
    const removeTech = (techToRemove: string) => {
        setTechStack(techStack.filter(tech => tech !== techToRemove));
    };

    const handleSave = () => {
        if (!authUser) return;
        const newProject: Project = {
            id: project ? project.id : new Date().toISOString(), // This will be overwritten by firestore on create
            userId: authUser.uid,
            title,
            description,
            githubLink,
            liveDemo,
            techStack,
            createdAt: project ? project.createdAt : new Date(),
            updatedAt: new Date(),
        };
        onSave(newProject);
    };

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="tech-stack">Tech Stack</Label>
                <Input 
                    id="tech-stack" 
                    placeholder="Add tech and press Enter"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleTechKeyDown}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {techStack.map(tech => (
                        <Badge key={tech} variant="secondary" className="pl-2 pr-1 py-1 text-sm">
                            {tech}
                            <button onClick={() => removeTech(tech)} className="ml-1 p-0.5 rounded-full hover:bg-muted-foreground/20">
                                <X className="h-3 w-3"/>
                            </button>
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input id="githubLink" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="liveDemo">Live Demo Link</Label>
                <Input id="liveDemo" value={liveDemo} onChange={(e) => setLiveDemo(e.target.value)} />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save Project</Button>
            </DialogFooter>
        </div>
    );
}
