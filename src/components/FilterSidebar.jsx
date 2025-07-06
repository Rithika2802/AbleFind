import React from "react";
import { FaWheelchair, FaParking } from "react-icons/fa";
import { GiBlindfold } from "react-icons/gi";
import { MdRampRight, MdHearing } from "react-icons/md";

const accessibilityOptions = [
  {
    key: "wheelchair",
    label: "Wheelchair Accessible",
    icon: <FaWheelchair />,
    bg: "bg-blue-100",
  },
  {
    key: "ramp",
    label: "Ramp Available",
    icon: <MdRampRight />,
    bg: "bg-green-100",
  },
  {
    key: "braille",
    label: "Braille Signage",
    icon: <GiBlindfold />,
    bg: "bg-yellow-100",
  },
  {
    key: "hearing",
    label: "Hearing Aid Friendly",
    icon: <MdHearing />,
    bg: "bg-pink-100",
  },
  {
    key: "parking",
    label: "Accessible Parking",
    icon: <FaParking />,
    bg: "bg-purple-100",
  },
];

export default function FilterSidebar({ filters, setFilters }) {
  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Accessibility Filters
      </h2>
      <div className="space-y-2">
        {accessibilityOptions.map(({ key, label, icon, bg }) => (
          <div
            key={key}
            className={`flex items-center justify-between p-3 rounded-md ${bg}`}
          >
            <div className="flex items-center gap-2 text-gray-800 dark:text-black">
              <span className="text-lg">{icon}</span>
              <span className="font-medium">{label}</span>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={filters[key]}
                onChange={() => toggleFilter(key)}
              />
              <div className="w-10 h-5 bg-gray-300 peer-checked:bg-indigo-600 rounded-full peer-focus:ring-2 peer-focus:ring-indigo-400 transition-colors"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
