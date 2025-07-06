import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full px-6 py-4 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Recent Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews submitted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 border border-gray-200 shadow rounded-lg bg-white"
            >
              <h3 className="font-bold text-lg text-blue-700">
                {review.place || "Unnamed Place"}
              </h3>
              <p className="text-gray-700">{review.comment}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {review.wheelchair && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    ♿ Wheelchair
                  </span>
                )}
                {review.ramp && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    🛗 Ramp
                  </span>
                )}
                {review.braille && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    🧑‍🦯 Braille
                  </span>
                )}
                {review.hearingAid && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                    🔊 Hearing Aid
                  </span>
                )}
                {review.accessibleParking && (
                  <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full">
                    🅿️ Parking
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
