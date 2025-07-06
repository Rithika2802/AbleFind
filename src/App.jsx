import React, { useEffect, useState } from "react";
import FilterSidebar from "./components/FilterSidebar";
import MapView from "./components/MapView";
import ReviewCard from "./components/ReviewCard";
import ReviewForm from "./components/ReviewForm";
import LocationSearch from "./components/LocationSearch";
import { useDarkMode } from "./contexts/DarkModeContext";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    wheelchair: false,
    ramp: false,
    braille: false,
    hearing: false,
    parking: false,
  });

  useEffect(() => {
    const q = query(collection(db, "reviews"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const activeFilters = Object.keys(filters).filter((key) => filters[key]);

    if (activeFilters.length === 0) {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) =>
        activeFilters.every((key) => review.accessibility?.[key])
      );
      setFilteredReviews(filtered);
    }
  }, [filters, reviews]);

  const handleNewReview = (newReview) => {
    setReviews((prev) => [...prev, newReview]);
    setShowForm(false);
  };

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div className="w-full md:w-72 border-r border-gray-200 dark:border-gray-700 px-4 py-4 flex flex-col overflow-y-auto h-screen sticky top-0 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-indigo-600">AbleFind</h1>
          <button onClick={toggleDarkMode} className="text-xl">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Find and review accessible places
        </p>

        <FilterSidebar filters={filters} setFilters={setFilters} />

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-indigo-600 text-white py-2 rounded mt-4 hover:bg-indigo-700"
        >
          {showForm ? "Close Review Form" : "Submit a Review"}
        </button>

        {showForm && (
          <div className="mt-4">
            <h2 className="text-md font-semibold mb-2">Submit a Review</h2>
            <ReviewForm onNewReview={handleNewReview} onClose={() => setShowForm(false)} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4">
          <LocationSearch />
        </div>

        <div className="px-4">
          <MapView reviews={filteredReviews} />
        </div>

        <div className="mt-6 px-6">
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-1 dark:border-gray-700">
            Recent Reviews
          </h2>
          <div className="flex flex-wrap justify-center gap-4 pb-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
