'use client';

import { notFound, useParams } from 'next/navigation';
import { useFirestore } from '@/firebase';
import TemplateRenderer from '@/components/templates/template-renderer';
import { collection, query, where, getDocs, limit, DocumentData } from 'firebase/firestore';
import type { User, Project } from '@/types';
import { useEffect, useState, useMemo } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Custom hook to fetch user by username
const useUserByUsername = (username: string) => {
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (!firestore || !username) {
      setUser(null);
      return;
    }

    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));

    getDocs(q)
      .then((snapshot) => {
        if (snapshot.empty) {
          setUser(null);
        } else {
          const userData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as User;
          setUser(userData);
        }
      })
      .catch((err) => {
        const permissionError = new FirestorePermissionError({
          path: 'users',
          operation: 'list', // Querying is a 'list' operation
        });
        errorEmitter.emit('permission-error', permissionError);
        setUser(null);
      });
  }, [firestore, username]);

  return user;
};

// Custom hook to fetch projects by user ID
const useProjectsByUserId = (userId: string | null) => {
    const firestore = useFirestore();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (!firestore || !userId) {
            setProjects([]);
            return;
        }

        const projectsRef = collection(firestore, 'projects');
        const q = query(projectsRef, where('userId', '==', userId));

        getDocs(q)
            .then((snapshot) => {
                const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
                setProjects(projectsData);
            })
            .catch(err => {
                const permissionError = new FirestorePermissionError({
                    path: 'projects',
                    operation: 'list',
                    requestResourceData: { userId }
                });
                errorEmitter.emit('permission-error', permissionError);
                setProjects([]);
            });

    }, [firestore, userId]);

    return projects;
}


export default function UserPortfolioPage() {
  const params = useParams();
  const username = params.username as string;
  
  const user = useUserByUsername(username);
  const projects = useProjectsByUserId(user?.id ?? null);

  // Initial loading state while user is being fetched
  if (user === undefined) {
    return <div className="flex h-screen w-full items-center justify-center">Loading portfolio...</div>;
  }

  // After fetch: if user is null, they were not found
  if (user === null) {
    notFound();
  }

  return (
    <TemplateRenderer
      template={user.selectedTemplate}
      user={user}
      projects={projects}
    />
  );
}
