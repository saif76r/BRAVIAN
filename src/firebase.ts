/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBe5ot8-yPk7D_32OaNKdHKW11GnEuWcXU",
  authDomain: "quantum-falcon-5sjh2.firebaseapp.com",
  projectId: "quantum-falcon-5sjh2",
  storageBucket: "quantum-falcon-5sjh2.firebasestorage.app",
  messagingSenderId: "289467866550",
  appId: "1:289467866550:web:6498a3ba73c75ea8eb3517"
};

const customDatabaseId = "ai-studio-bgicommunity-3aeaf543-bdc3-4fb1-9b60-7bc9c47d3bc2";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with the custom database ID if provided
const db = getFirestore(app, customDatabaseId);

const auth = getAuth(app);

export { app, db, auth };
