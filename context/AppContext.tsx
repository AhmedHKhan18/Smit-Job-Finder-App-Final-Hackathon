import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../app/utils/firebaseConfig'; // Adjust the path to your Firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { setItem } from '@/app/utils/AsyncStorage';
import { router } from 'expo-router';


interface AppContextType {
  user: any; // Replace `any` with a proper user type if available
  authError: string | null;
  signUp: (auth:any, email: any, password: any) => Promise<void>;
  signIn: (auth:any, email: any, password: any) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
  jobs: any[]; 
  // Replace `any` with a proper job type if available
}

export const AppContext = createContext<AppContextType | any>({
  user: null,
  authError: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  loading: false,
  error: null,
  jobs: [],
  test: '12345'
});



// Create the context
// export const AppContext = createContext({});

// Context provider component
export const AppProvider = ({ children }:any) => {
  // State for user authentication
  const [user, setUser] = useState(null);
  console.log("🚀 ~ AppProvider ~ user:", user)
  const [authError, setAuthError] = useState(null);
  console.log("🚀 ~ AppProvider ~ authError:", authError)

  // State for jobs
  const [jobs, setJobs] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [test, setTest] = useState('12345')

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser:any) => {
      setUser(currentUser);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // Sign Up Function
  const signUp = async (auth:any, email:any, password:any) => {
    console.log("🚀 ~ signUp ~ email:", email)
    try {
      setAuthError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err:any) {
      setAuthError(err.message);
    }
  };

  // Sign In Function
  const signIn = async (email:any, password:any) => {
    try {
      setAuthError(null);
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setItem('User', user)
      router.push('/screens/main/Home')
      console.log('called');
    } catch (err:any) {
      setAuthError(err.message);
      console.log("🚀 ~ signIn ~ err:", err.message)
    }
  };

  // Sign Out Function
  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (err:any) {
      setAuthError(err.message);
    }
  };

  // Fetch Jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // setLoading(true);
        // const jobList:any = []
        // const dbSnap = await getDocs(collection(db, "jobs"))
        // dbSnap.forEach((item)=>{
        //     jobList.push(item.data())
        //   })
        // const jobsData = dbSnap.docs.map((doc)=>({id: doc.id, ...doc.data()}))
        //   console.log("🚀 ~ fetchJobs ~ jobsData:", jobsData)
        //   setJobs(jobList);
        // const snapshot = await db.collection('jobs').get();
        // const jobsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // setLoading(false);
      } catch (err:any) {
        setError(err.message);
        // setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <AppContext.Provider value={{ user, authError, signUp, signIn, signOut, loading, error, jobs, test }}>
      {children}
    </AppContext.Provider>
  );
};
