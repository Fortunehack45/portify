'use client';
import { Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { PlusCircle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import ProjectForm from './project-form';

interface ProjectsListProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function ProjectsList({ projects, setProjects }: ProjectsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleSaveProject = (project: Project) => {
    const projectExists = projects.some(p => p.id === project.id);
    if (projectExists) {
        setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
        setProjects([...projects, project]);
    }
    setIsDialogOpen(false);
    setEditingProject(null);
  };
  
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };
  
  const handleAddNew = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">Projects</CardTitle>
          <CardDescription>Add, edit, or remove projects from your portfolio.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="font-headline">{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              <DialogDescription>
                Fill in the details for your project. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSave={handleSaveProject}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingProject(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between rounded-lg border p-3">
              <span className="font-medium">{project.title}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => handleEdit(project)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleDelete(project.id)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No projects added yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
