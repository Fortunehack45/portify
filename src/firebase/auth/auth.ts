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

    try {
        await runTransaction(firestore, async (transaction) => {
            const usernameDoc = await transaction.get(usernameDocRef);
            if (usernameDoc.exists()) {
                throw new Error("Username is already taken.");
            }

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
            transaction.set(userDocRef, finalUserData);
            
            const usernameData = { userId: user.uid };
            transaction.set(usernameDocRef, usernameData);

            // Using a batch inside a transaction is not standard.
            // Let's create the sample data in a separate batch after the main transaction succeeds.
        });

        // If the transaction was successful, create the sample portfolio.
        const batch = writeBatch(firestore);
        createSampleProjectAndPortfolio(user.uid, batch);
        await batch.commit();

    } catch (error: any) {
        if (error.message === "Username is already taken.") {
            throw error; // Re-throw the specific error for the UI to catch
        }
        
        // Handle potential permission errors
        const permissionError = new FirestorePermissionError({
            path: `users/${user.uid} or usernames/${lowercaseUsername}`,
            operation: 'create',
            requestResourceData: {
                username: lowercaseUsername,
                userId: user.uid
            }
        });
        errorEmitter.emit('permission-error', permissionError);
        // re-throw the original error
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
    const username = (emailUsername || user.displayName?.replace(/\s+/g, '').toLowerCase() || `user${Date.now()}`);
    
    // Check if this generated username already exists
    const usernameDocRef = doc(firestore, 'usernames', username);
    const usernameDoc = await getDoc(usernameDocRef);

    // If the generated username exists, append a random number.
    const finalUsername = usernameDoc.exists() ? `${username}${Math.floor(Math.random() * 1000)}` : username;

    await createUserProfileAndUsername(user, name, finalUsername);
  }
};

export const signUpWithEmail = async (email: string, password: string, name: string, username: string) => {
  if (!auth || !firestore) {
    throw new Error('Firebase not initialized');
  }
  
  // First, check if username is valid
  if (!username || username.length < 3) {
      throw new Error("Username must be at least 3 characters long.");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error("Username can only contain letters, numbers, and underscores.");
  }


  // This will throw if the username is taken, and it will be caught in the UI.
  await createUserProfileAndUsername(
    { uid: 'temp-uid-check', email } as AuthUser, // Pass a mock user object for the check
    name,
    username
  ).catch(error => {
      // Re-throw username error to be caught by the signup page
      if(error.message === "Username is already taken.") throw error;
      // For other errors, we let it proceed to user creation, which will handle its own errors.
  });


  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });
  
  // This re-runs the logic, but this time with the actual user, to create the profile.
  // The username check is technically redundant, but it's safe.
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
