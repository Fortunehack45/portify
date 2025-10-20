'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { getFirebase } from '..';
import { User, Project } from '@/types';

const { auth, firestore } = getFirebase();

const createSampleProject = async (userId: string) => {
    if (!firestore) return;
    const projectsCollection = collection(firestore, 'projects');
    await addDoc(projectsCollection, {
        userId: userId,
        title: "My First Project",
        description: "This is a sample project to get you started. You can edit or delete this in the dashboard editor.",
        techStack: ["Next.js", "Firebase", "Tailwind CSS"],
        githubLink: "https://github.com/your-username/your-repo",
        liveDemo: "",
        imageUrl: "https://picsum.photos/seed/1/600/400",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
};

const createProfileIfNotExists = async (user: import('firebase/auth').User) => {
  if (!firestore) {
    throw new Error('Firestore not initialized');
  }
  const userDocRef = doc(firestore, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    const username = user.email ? user.email.split('@')[0] : user.displayName?.replace(/\s+/g, '').toLowerCase() || `user${Date.now()}`;
    const userProfile: User = {
      id: user.uid,
      name: user.displayName || 'New User',
      username: username,
      email: user.email || '',
      bio: 'This is my bio! I can edit it in the editor.',
      jobTitle: 'Aspiring Developer',
      location: 'Planet Earth',
      availability: 'open to work',
      skills: ['React', 'TypeScript'],
      socials: [],
      selectedTemplate: 'minimal-light',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await setDoc(userDocRef, userProfile);
    // Create a sample project for the new user
    await createSampleProject(user.uid);
  }
};

export const signUpWithEmail = async (email: string, password: string, name: string, username: string) => {
  if (!auth || !firestore) {
    throw new Error('Firebase not initialized');
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  const userProfile: User = {
    id: user.uid,
    name,
    username,
    email: email,
    bio: 'This is my bio! I can edit it in the editor.',
    jobTitle: 'Aspiring Developer',
    location: 'Planet Earth',
    availability: 'open to work',
    skills: ['React', 'TypeScript'],
    socials: [],
    selectedTemplate: 'minimal-light',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(doc(firestore, 'users', user.uid), userProfile);
  // Create a sample project for the new user
  await createSampleProject(user.uid);

  return user;
};

export const signInWithEmail = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await createProfileIfNotExists(userCredential.user);
  return userCredential;
};

export const signInWithGoogle = async () => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await createProfileIfNotExists(result.user);
  return result;
};

export const signInWithGithub = async () => {
  if (!auth) {
    throw new Error('Firebase not initialized');
  }
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await createProfileIfNotExists(result.user);
  return result;
};
