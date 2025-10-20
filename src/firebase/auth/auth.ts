'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  type User as AuthUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc, writeBatch, serverTimestamp, runTransaction } from 'firebase/firestore';
import { getFirebase } from '..';
import { User, Project, Portfolio } from '@/types';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

const { auth, firestore } = getFirebase();

const createSampleProjectAndPortfolio = (userId: string, batch: import('firebase/firestore').WriteBatch) => {
    if (!firestore) return;
    
    // Create a sample project
    const projectRef = doc(collection(firestore, 'projects'));
    batch.set(projectRef, {
        userId: userId,
        title: "My First Project",
        slug: "my-first-project",
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
const createUserProfileAndUsername = async (user: AuthUser, name: string, username: string) => {
    if (!firestore) {
        throw new Error('Firestore not initialized');
    }
    
    const lowercaseUsername = username.toLowerCase();
    const usernameDocRef = doc(firestore, 'usernames', lowercaseUsername);
    const userDocRef = doc(firestore, 'users', user.uid);

    const userProfileData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
        name: name,
        username: lowercaseUsername, 
        email: user.email || '',
        bio: 'This is my bio! I can edit it in the editor.',
        jobTitle: 'Aspiring Developer',
        location: 'Planet Earth',
        availability: 'open to work',
        skills: ['React', 'TypeScript'],
        socials: [],
    };
            
    const finalUserData = {
        ...userProfileData,
        id: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };
    
    const usernameData = { userId: user.uid };

    try {
        await runTransaction(firestore, async (transaction) => {
            const usernameDoc = await transaction.get(usernameDocRef);
            if (usernameDoc.exists()) {
                throw new Error("Username is already taken.");
            }

            transaction.set(userDocRef, finalUserData);
            transaction.set(usernameDocRef, usernameData);
        });

        // If the transaction was successful, create the sample portfolio.
        const batch = writeBatch(firestore);
        createSampleProjectAndPortfolio(user.uid, batch);
        await batch.commit();

    } catch (error: any) {
        if (error.message === "Username is already taken.") {
            throw error; // Re-throw the specific error for the UI to catch
        }
        
        // Handle potential permission errors from the transaction
        const permissionError = new FirestorePermissionError({
            path: `users/${user.uid} or usernames/${lowercaseUsername}`,
            operation: 'create',
            requestResourceData: {
                user: finalUserData,
                username: usernameData
            }
        });
        errorEmitter.emit('permission-error', permissionError);

        // also re-throw the original error to stop execution flow
        throw error;
    }
};


const createProfileIfNotExists = async (user: AuthUser) => {
  if (!firestore) {
    throw new Error('Firestore not initialized');
  }
  const userDocRef = doc(firestore, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    const name = user.displayName || 'New User';
    const emailUsername = user.email ? user.email.split('@')[0] : '';
    // Generate a more unique fallback username
    const baseUsername = (emailUsername || user.displayName?.replace(/\s+/g, '').toLowerCase() || `user`);
    
    let finalUsername = baseUsername;
    let isUnique = false;
    let attempt = 0;
    
    // Keep trying usernames until a unique one is found
    while(!isUnique) {
        const usernameToCheck = attempt > 0 ? `${baseUsername}${attempt}` : baseUsername;
        const usernameDocRef = doc(firestore, 'usernames', usernameToCheck);
        const usernameDoc = await getDoc(usernameDocRef);
        if (!usernameDoc.exists()) {
            finalUsername = usernameToCheck;
            isUnique = true;
        } else {
            attempt++;
        }
    }

    await createUserProfileAndUsername(user, name, finalUsername);
  }
};

export const signUpWithEmail = async (email: string, password: string, name: string, username: string) => {
  if (!auth || !firestore) {
    throw new Error('Firebase not initialized');
  }
  
  if (!username || username.length < 3) {
      throw new Error("Username must be at least 3 characters long.");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error("Username can only contain letters, numbers, and underscores.");
  }

  // Check for username uniqueness before creating the auth user.
  const usernameDocRef = doc(firestore, 'usernames', username.toLowerCase());
  const usernameDoc = await getDoc(usernameDocRef);
  if (usernameDoc.exists()) {
      throw new Error("Username is already taken.");
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });
  
  // Create profile, sample data etc. This will not throw a username error because we checked above.
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
