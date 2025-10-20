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
import { doc, setDoc, getDoc, collection, addDoc, writeBatch } from 'firebase/firestore';
import { getFirebase } from '..';
import { User, Project } from '@/types';

const { auth, firestore } = getFirebase();

const createSampleProject = async (userId: string, batch: import('firebase/firestore').WriteBatch) => {
    if (!firestore) return;
    // Use a unique ID for the new project document
    const projectRef = doc(collection(firestore, 'projects'));
    batch.set(projectRef, {
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

// This function creates the public username mapping and the user profile.
const createUserProfileAndUsername = async (user: import('firebase/auth').User, name: string, username: string) => {
    if (!firestore) {
        throw new Error('Firestore not initialized');
    }
    const batch = writeBatch(firestore);

    const userDocRef = doc(firestore, 'users', user.uid);
    // Always use lowercase for the username lookup document
    const lowercaseUsername = username.toLowerCase();
    const usernameDocRef = doc(firestore, 'usernames', lowercaseUsername);

    const userProfile: User = {
      id: user.uid,
      name: name,
      username: username, // Store the original cased username in the profile
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

    // Add the user profile document to the batch
    batch.set(userDocRef, userProfile);
    
    // Add the public username mapping to the batch
    batch.set(usernameDocRef, { userId: user.uid });

    // Add a sample project to the batch
    await createSampleProject(user.uid, batch);
    
    // Commit all writes at once
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
    const username = user.email ? user.email.split('@')[0] : user.displayName?.replace(/\s+/g, '').toLowerCase() || `user${Date.now()}`;
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
