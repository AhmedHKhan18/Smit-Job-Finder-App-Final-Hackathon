// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkcBumeYqYUZ_9B35p80s-55vz51Yvd5Q",
  authDomain: "smit-job-finder-app.firebaseapp.com",
  projectId: "smit-job-finder-app",
  storageBucket: "smit-job-finder-app.firebasestorage.app",
  messagingSenderId: "717775100621",
  appId: "1:717775100621:web:247af69cccda8985402784",
  measurementId: "G-43X6EKE0TE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth()