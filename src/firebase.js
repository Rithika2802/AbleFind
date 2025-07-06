import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKJjRrJvvtALxp6zdvxMfdh9GId25-Ch8",
  authDomain: "ablefind-2dae4.firebaseapp.com",
  projectId: "ablefind-2dae4",
  storageBucket: "ablefind-2dae4.firebasestorage.app",
  messagingSenderId: "115297277490",
  appId: "1:115297277490:web:d2b54dc42382e4bf2c8e2b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ✅ This is the function App.jsx is importing
export async function fetchReviewsFromFirebase() {
  const reviewsCol = collection(db, "reviews");
  const snapshot = await getDocs(reviewsCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}