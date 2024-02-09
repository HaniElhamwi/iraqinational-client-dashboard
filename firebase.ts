// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCcBosp0wbDI97hX2f19AJHyk5x1fMpmGU',
  authDomain: 'iraqinational-4a20e.firebaseapp.com',
  projectId: 'iraqinational-4a20e',
  storageBucket: 'iraqinational-4a20e.appspot.com',
  messagingSenderId: '757296739209',
  appId: '1:757296739209:web:8b8863bfb7aeed74602758',
  measurementId: 'G-JH18QGC0GR',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
