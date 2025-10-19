'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebase } from '..';
import { User } from '@/types';

const { auth, firestore } = getFirebase();

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
  return await signInWithEmailAndPassword(auth, email, password);
};