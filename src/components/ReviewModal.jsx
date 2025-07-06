// src/components/ReviewModal.jsx
import React, { useState } from 'react';

export default function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [place, setPlace] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!place || !comment) return alert("Please fill all fields.");
    onSubmit({ place, rating, comment });
    onClose();
    setPlace('');
    setRating(5);
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Submit a Review</h2>

        <label className="block mb-2">
          <span className="text-sm font-medium">Place</span>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="e.g., Cafe Bloom"
          />
        </label>

        <label className="block mb-2">
          <span className="text-sm font-medium">Rating</span>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium">Comment</span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            rows={3}
            placeholder="Share your experience..."
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded bg-sky-600 text-white hover:bg-sky-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
