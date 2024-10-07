import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJmTYU9kTVNObJNemz9IP_nSMGdynLp7Y",
  authDomain: "fir-c8124.firebaseapp.com",
  projectId: "fir-c8124",
  storageBucket: "fir-c8124.appspot.com",
  messagingSenderId: "943132447716",
  appId: "1:943132447716:web:1bd13b3a8d73f172902df1",
  measurementId: "G-H3S497FQBF"
};
 

const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app)
// const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)