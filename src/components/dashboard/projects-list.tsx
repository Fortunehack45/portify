'use client';
import { Project, Portfolio } from '@/types';
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
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, runTransaction, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface ProjectsListProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  portfolio: Portfolio;
  onPortfolioChange: (portfolio: Portfolio) => void;
}

export default function ProjectsList({ projects, setProjects, portfolio, onPortfolioChange }: ProjectsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const firestore = useFirestore();
  const { user: authUser } = useAuthUser();
  const { toast } = useToast();

  const handleSaveProject = async (project: Project, slug: string) => {
    if (!firestore || !authUser) return;

    if (editingProject) {
        // TODO: Implement update logic that handles slug changes
        const projectRef = doc(firestore, 'projects', editingProject.id);
        const projectData = {
            ...project,
            updatedAt: serverTimestamp(),
        };
        
        updateDoc(projectRef, projectData).then(() => {
            setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...project, updatedAt: new Date() } : p));
            toast({ title: "Project Updated", description: `"${project.title}" has been updated.` });
        }).catch(async () => {
             const permissionError = new FirestorePermissionError({
                path: projectRef.path,
                operation: 'update',
                requestResourceData: projectData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

    } else {
      // Add new project with uniqueness check
      const projectRef = doc(collection(firestore, 'projects'));
      const projectNameRef = doc(firestore, 'projectNames', slug);

      runTransaction(firestore, async (transaction) => {
        const projectNameDoc = await transaction.get(projectNameRef);
        if (projectNameDoc.exists()) {
          throw new Error(`Project name "${slug}" is already taken.`);
        }

        transaction.set(projectNameRef, { 
          userId: authUser.uid, 
          projectId: projectRef.id 
        });

        const newProjectData = {
            ...project,
            id: projectRef.id,
            userId: authUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        transaction.set(projectRef, newProjectData);
      }).then(() => {
        const optimisticProject = {
            ...project,
            id: projectRef.id,
            userId: authUser.uid,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setProjects([...projects, optimisticProject]);
        toast({ title: "Project Added", description: `"${project.title}" has been added.` });
      }).catch(async (error: any) => {
        const permissionError = new FirestorePermissionError({
            path: projectNameRef.path,
            operation: 'create',
            requestResourceData: { userId: authUser.uid, projectId: projectRef.id }
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          title: "Error",
          description: error.message || "Could not add project.",
          variant: "destructive",
        });
        return; // Stop execution
      });
    }
    
    setIsDialogOpen(false);
    setEditingProject(null);
  };
  
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleDelete = async (projectToDelete: Project) => {
    if (!firestore || !projectToDelete.slug) return;
    
    const projectRef = doc(firestore, 'projects', projectToDelete.id);
    const projectNameRef = doc(firestore, 'projectNames', projectToDelete.slug);

    runTransaction(firestore, async (transaction) => {
        transaction.delete(projectRef);
        transaction.delete(projectNameRef);
    }).then(() => {
        setProjects(projects.filter(p => p.id !== projectToDelete.id));
        toast({ title: "Project Deleted", description: `"${projectToDelete.title}" has been removed.` });
    }).catch(async (err: any) => {
        const permissionError = new FirestorePermissionError({
          path: `projects/${projectToDelete.id}`,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ title: "Error", description: err.message || "Could not delete project.", variant: "destructive" });
    });
  };
  
  const handleAddNew = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleProjectToggle = (projectId: string, checked: boolean) => {
    let updatedProjectIds;
    if (checked) {
        updatedProjectIds = [...portfolio.projectIds, projectId];
    } else {
        updatedProjectIds = portfolio.projectIds.filter(id => id !== projectId);
    }
    onPortfolioChange({ ...portfolio, projectIds: updatedProjectIds });
  };

  return (
    <AccordionItem value="projects">
        <AccordionTrigger className="p-4 bg-background rounded-lg border shadow-sm text-base font-medium">
            Projects
        </AccordionTrigger>
        <AccordionContent className="pt-4">
             <div className="space-y-4 bg-background p-4 rounded-b-lg border-x border-b">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Select projects to include in this portfolio.</p>
                     <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
                        setIsDialogOpen(isOpen);
                        if (!isOpen) setEditingProject(null);
                        }}>
                        <DialogTrigger asChild>
                            <Button size="sm" onClick={handleAddNew}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add New Project
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
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    id={`project-${project.id}`}
                                    checked={portfolio.projectIds.includes(project.id)}
                                    onCheckedChange={(checked) => handleProjectToggle(project.id, !!checked)}
                                />
                                <Label htmlFor={`project-${project.id}`} className="font-medium text-sm cursor-pointer">{project.title}</Label>
                            </div>
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
                                <DropdownMenuItem onSelect={() => handleDelete(project)} className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))
                    ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">No projects created yet.</p>
                    )}
                </div>
            </div>
      </AccordionContent>
    </AccordionItem>
  );
}
