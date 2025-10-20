'use client';
import { Project } from '@/types';
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
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

    if (editingProject) {
      // Update existing project
      const projectRef = doc(firestore, 'projects', editingProject.id);
      const updatedProjectData = {
          ...project,
          updatedAt: new Date(), // Use client-side date for optimistic update
      };
      
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...updatedProjectData } : p));
      setIsDialogOpen(false);
      setEditingProject(null);

      updateDoc(projectRef, {
          ...project,
          updatedAt: serverTimestamp(),
      }).then(() => {
        toast({ title: "Project Updated", description: `"${project.title}" has been updated.` });
      }).catch(err => {
        // Revert optimistic update on error
        setProjects(projects);
        const permissionError = new FirestorePermissionError({
          path: projectRef.path,
          operation: 'update',
          requestResourceData: project
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ title: "Error", description: "Could not update project.", variant: "destructive" });
      });

    } else {
      // Add new project
      const newProjectData = {
        ...project,
        userId: authUser.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // Optimistically update UI
      setProjects([...projects, newProjectData]);
      setIsDialogOpen(false);
      setEditingProject(null);

      addDoc(collection(firestore, 'projects'), {
          ...project,
          userId: authUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
      }).then(docRef => {
        // Update the optimistic entry with the real ID from firestore
        setProjects(projects => projects.map(p => p.id === newProjectData.id ? {...p, id: docRef.id} : p));
        toast({ title: "Project Added", description: `"${project.title}" has been added.` });
      }).catch(err => {
        // Revert optimistic update on error
        setProjects(projects);
        const permissionError = new FirestorePermissionError({
          path: 'projects',
          operation: 'create',
          requestResourceData: project
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ title: "Error", description: "Could not add project.", variant: "destructive" });
      });
    }
  };
  
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    if (!firestore) return;
    
    const originalProjects = projects;
    // Optimistic delete
    setProjects(projects.filter(p => p.id !== projectId));

    deleteDoc(doc(firestore, 'projects', projectId)).then(() => {
        toast({ title: "Project Deleted", description: "The project has been removed." });
    }).catch(err => {
        // Revert on error
        setProjects(originalProjects);
        const permissionError = new FirestorePermissionError({
          path: `projects/${projectId}`,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ title: "Error", description: "Could not delete project.", variant: "destructive" });
    });
  };
  
  const handleAddNew = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  return (
    <AccordionItem value="projects">
        <AccordionTrigger className="p-4 bg-background rounded-lg border shadow-sm text-base font-medium">
            Projects
        </AccordionTrigger>
        <AccordionContent className="pt-4">
             <div className="space-y-4 bg-background p-4 rounded-b-lg border-x border-b">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Add, edit, or remove projects.</p>
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
                        <DialogContent className="sm:max-w-[425px]">
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
                </div>
                
                <div className="space-y-3">
                    {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between rounded-lg border p-3 bg-muted/50">
                        <span className="font-medium text-sm">{project.title}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                    <p className="text-sm text-muted-foreground text-center py-8">No projects added yet.</p>
                    )}
                </div>
            </div>
      </AccordionContent>
    </AccordionItem>
  );
}
