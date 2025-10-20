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
import { doc, setDoc, getDoc, collection, addDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { getFirebase } from '..';
import { User, Project, Portfolio } from '@/types';

const { auth, firestore } = getFirebase();

const createSampleProjectAndPortfolio = (userId: string, batch: import('firebase/firestore').WriteBatch) => {
    if (!firestore) return;
    
    // Create a sample project
    const projectRef = doc(collection(firestore, 'projects'));
    batch.set(projectRef, {
        userId: userId,
        title: "My First Project",
        description: "This is a sample project to get you started. You can edit or delete this in the dashboard editor.",
        techStack: ["Next.js", "Firebase", "Tailwind CSS"],
        githubLink: "https://github.com/your-username/your-repo",
        liveDemo: "",
        imageUrl: "https://picsum.photos/seed/1/600/400",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    // Create a primary portfolio and include the sample project
    const portfolioRef = doc(collection(firestore, 'portfolios'));
    batch.set(portfolioRef, {
        userId: userId,
        name: "Main Portfolio",
        slug: "main",
        projectIds: [projectRef.id],
        selectedTemplate: 'minimal-light',
        isPrimary: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    } as Omit<Portfolio, 'id'>);
};

// This function creates the user profile, public username mapping, and a sample project in a single transaction.
const createUserProfileAndUsername = async (user: import('firebase/auth').User, name: string, username: string) => {
    if (!firestore) {
        throw new Error('Firestore not initialized');
    }
    const batch = writeBatch(firestore);

    const userDocRef = doc(firestore, 'users', user.uid);
    const lowercaseUsername = username.toLowerCase();
    const usernameDocRef = doc(firestore, 'usernames', lowercaseUsername);

    const userProfile: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
      name: name,
      username: username, 
      email: user.email || '',
      bio: 'This is my bio! I can edit it in the editor.',
      jobTitle: 'Aspiring Developer',
      location: 'Planet Earth',
      availability: 'open to work',
      skills: ['React', 'TypeScript'],
      socials: [],
    };

    batch.set(userDocRef, { 
        ...userProfile,
        id: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    
    batch.set(usernameDocRef, { userId: user.uid });

    createSampleProjectAndPortfolio(user.uid, batch);
    
    await batch.commit();
};


const createProfileIfNotExists = async (user: import('firebase/auth').User) => {
  if (!firestore) {
    throw new Error('Firestore not initialized');
  }
  const userDocRef = doc(firestore, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    const name = user.displayName || 'New User';
    const emailUsername = user.email ? user.email.split('@')[0] : '';
    const username = (emailUsername || user.displayName?.replace(/\s+/g, '') || `user${Date.now()}`).toLowerCase();
    
    await createUserProfileAndUsername(user, name, username);
  }
};

export const signUpWithEmail = async (email: string, password: string, name: string, username: string) => {
  if (!auth || !firestore) {
    throw new Error('Firebase not initialized');
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });
  
  await createUserProfileAndUsername(user, name, username);

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
