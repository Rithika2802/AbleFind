import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ReviewContext = createContext();

export const useReviews = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setReviews(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ReviewContext.Provider value={{ reviews }}>
      {children}
    </ReviewContext.Provider>
  );
};
