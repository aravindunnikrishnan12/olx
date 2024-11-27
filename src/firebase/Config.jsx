
// src/firebase/Config.jsx

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDa1rqRa3xnBHmVQw7maUy0oymJsesE0bw",
  authDomain: "first-54166.firebaseapp.com",
  projectId: "first-54166",
  storageBucket: "first-54166.appspot.com",
  messagingSenderId: "285142043892",
  appId: "1:285142043892:web:2142e2fec628aaf55ca2a1",
  measurementId: "G-8JMSVHNTY7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, firestore, storage };

