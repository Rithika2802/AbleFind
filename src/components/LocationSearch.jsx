import React, { useState } from "react";
import axios from "axios";

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
          params: {
            key: import.meta.env.VITE_OPENCAGE_API_KEY,
            q: value,
            limit: 5,
          },
        });

        const results = response.data.results.map((result) => ({
          name: result.formatted,
          lat: result.geometry.lat,
          lng: result.geometry.lng,
        }));

        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    if (onSelect) onSelect(suggestion);
  };

  return (
    <div className="relative z-40 w-full">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a place"
          className="w-full p-2 border rounded-l bg-white dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          className="bg-indigo-600 text-white px-4 rounded-r hover:bg-indigo-700"
          onClick={() => {
            if (suggestions.length > 0) handleSelect(suggestions[0]);
          }}
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white dark:bg-gray-800 border mt-1 rounded shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((sugg, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(sugg)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {sugg.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
