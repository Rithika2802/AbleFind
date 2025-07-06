import React from "react";
import {
  FaWheelchair,
  FaParking
} from "react-icons/fa";
import { GiBlindfold } from "react-icons/gi";
import { MdRampRight, MdHearing } from "react-icons/md";

const iconMap = {
  wheelchair: <FaWheelchair />,
  ramp: <MdRampRight />,
  braille: <GiBlindfold />,
  hearing: <MdHearing />,
  parking: <FaParking />
};

const labelMap = {
  wheelchair: "Wheelchair Accessible",
  ramp: "Ramp Available",
  braille: "Braille Signage",
  hearing: "Hearing Aid Friendly",
  parking: "Accessible Parking"
};

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 m-2 w-full sm:w-72">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">{review.placeName}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {review.comments || "No comment provided."}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.entries(review.accessibility || {})
          .filter(([_, value]) => value)
          .map(([key]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-600 text-indigo-800 dark:text-white text-xs px-2 py-1 rounded-full"
            >
              {iconMap[key]}
              {labelMap[key]}
            </span>
          ))}
      </div>
    </div>
  );
}
