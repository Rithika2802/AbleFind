// src/components/PlaceCard.jsx
import React from 'react';

export default function PlaceCard({ name, category, rating, comment }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">Category: {category}</p>
      <p className="text-sm">Rating: {"⭐".repeat(rating)}</p>
      {comment && <p className="text-sm mt-2 italic text-gray-700">“{comment}”</p>}
    </div>
  );
}
