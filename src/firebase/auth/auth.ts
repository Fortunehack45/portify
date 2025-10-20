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
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebase } from '..';
import { User } from '@/types';

const { auth, firestore } = getFirebase();

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
      bio: '',
      jobTitle: '',
      location: '',
      availability: 'not available',
      skills: [],
      socials: [],
      selectedTemplate: 'minimal-light',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await setDoc(userDocRef, userProfile);
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
    bio: '',
    jobTitle: '',
    location: '',
    availability: 'not available',
    skills: [],
    socials: [],
    selectedTemplate: 'minimal-light',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(doc(firestore, 'users', user.uid), userProfile);

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
