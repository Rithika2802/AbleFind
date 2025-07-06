import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDarkMode } from "../contexts/DarkModeContext";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="text-xl ml-2 hover:text-yellow-500 dark:hover:text-yellow-300 transition"
      title="Toggle dark mode"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeToggle;
