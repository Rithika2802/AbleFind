import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FaWheelchair, FaParking } from "react-icons/fa";
import { GiBlindfold } from "react-icons/gi";
import { MdRampRight, MdHearing } from "react-icons/md";

const accessibilityOptions = [
  {
    label: "Wheelchair Accessible",
    key: "wheelchair",
    icon: <FaWheelchair />,
    bg: "bg-blue-100",
    active: "bg-blue-500 text-white",
  },
  {
    label: "Ramp Available",
    key: "ramp",
    icon: <MdRampRight />,
    bg: "bg-green-100",
    active: "bg-green-500 text-white",
  },
  {
    label: "Braille Signage",
    key: "braille",
    icon: <GiBlindfold />,
    bg: "bg-yellow-100",
    active: "bg-yellow-500 text-white",
  },
  {
    label: "Hearing Aid Friendly",
    key: "hearing",
    icon: <MdHearing />,
    bg: "bg-pink-100",
    active: "bg-pink-500 text-white",
  },
  {
    label: "Accessible Parking",
    key: "parking",
    icon: <FaParking />,
    bg: "bg-purple-100",
    active: "bg-purple-500 text-white",
  },
];

const ReviewForm = ({ onClose, onNewReview }) => {
  const [placeName, setPlaceName] = useState("");
  const [comments, setComments] = useState("");
  const [accessibility, setAccessibility] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleAccessibility = (key) => {
    setAccessibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeName.trim()) {
      alert("Please enter a place name.");
      return;
    }

    const hasAtLeastOneFeature = Object.values(accessibility).some((v) => v);
    if (!hasAtLeastOneFeature) {
      alert("Please select at least one accessibility feature.");
      return;
    }

    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          placeName
        )}&key=${apiKey}`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        alert("Could not find location for that place.");
        setLoading(false);
        return;
      }

      const { lat, lng } = data.results[0].geometry;

      const review = {
        placeName,
        comments,
        accessibility,
        createdAt: new Date(),
        location: { lat, lng },
      };

      const docRef = await addDoc(collection(db, "reviews"), review);

      // Clear form
      setPlaceName("");
      setComments("");
      setAccessibility({});
      alert("Review submitted!");

      if (onNewReview) onNewReview({ id: docRef.id, ...review });
      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Place Name"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        className="p-2 rounded border dark:bg-gray-800"
        required
      />
      <textarea
        placeholder="Your comments (optional)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="p-2 rounded border dark:bg-gray-800"
        rows={3}
      />

      <div className="grid grid-cols-2 gap-2">
        {accessibilityOptions.map(({ key, label, icon, bg, active }) => {
          const isActive = accessibility[key];
          return (
            <button
              type="button"
              key={key}
              onClick={() => toggleAccessibility(key)}
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-all ${
                isActive ? active : `${bg} text-gray-900`
              }`}
            >
              <span className="text-xl">{icon}</span>
              {label}
            </button>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded mt-2 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
