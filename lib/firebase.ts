import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7aI4U-pDWdJ8RsZBBNQA3Bq82KjuiERA",
  authDomain: "virtual-internship-v2-38b20.firebaseapp.com",
  projectId: "virtual-internship-v2-38b20",
  storageBucket: "virtual-internship-v2-38b20.firebasestorage.app",
  messagingSenderId: "89029636913",
  appId: "1:89029636913:web:669bfa8e7da7cd5e8c7610",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
