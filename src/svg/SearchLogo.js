import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SearchLogo = () => {
  const Dark = useSelector((store) => store.app.isDark);
  useEffect(() => {
    const theme = Dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", Dark);
    localStorage.setItem("theme", theme);
  }, [Dark]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke={Dark ? "white" : "black"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 16a6 6 0 100-12 6 6 0 000 12zm8 0l4 4"
      />
    </svg>
  );
};

export default SearchLogo;
