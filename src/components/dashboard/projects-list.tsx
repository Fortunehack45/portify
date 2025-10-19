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
import { useFirestore, useUser as useAuthUser } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface ProjectsListProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function ProjectsList({ projects, setProjects }: ProjectsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const firestore = useFirestore();
  const { user: authUser } = useAuthUser();
  const { toast } = useToast();

  const handleSaveProject = async (project: Project) => {
    if (!firestore || !authUser) return;

    try {
      if (editingProject) {
        // Update existing project
        const projectRef = doc(firestore, 'projects', editingProject.id);
        await updateDoc(projectRef, {
            ...project,
            updatedAt: serverTimestamp(),
        });
        setProjects(projects.map(p => p.id === editingProject.id ? {...project, id: editingProject.id} : p));
        toast({ title: "Project Updated", description: `"${project.title}" has been updated.` });
      } else {
        // Add new project
        const docRef = await addDoc(collection(firestore, 'projects'), {
            ...project,
            userId: authUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        setProjects([...projects, {...project, id: docRef.id}]);
        toast({ title: "Project Added", description: `"${project.title}" has been added.` });
      }
      setIsDialogOpen(false);
      setEditingProject(null);
    } catch (error: any) {
        console.error("Error saving project: ", error);
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };
  
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    if (!firestore) return;
    try {
        await deleteDoc(doc(firestore, 'projects', projectId));
        setProjects(projects.filter(p => p.id !== projectId));
        toast({ title: "Project Deleted", description: "The project has been removed." });
    } catch (error: any) {
        console.error("Error deleting project: ", error);
        toast({ title: "Error", description: error.message, variant: "destructive" });
    }
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
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
          if (!isOpen) setEditingProject(null);
        }}>
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
