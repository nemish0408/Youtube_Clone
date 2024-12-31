import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const HambergLogo = () => {
  const Dark = useSelector((store) => store.app.isDark);
  useEffect(() => {
    const theme = Dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", Dark);
    localStorage.setItem("theme", theme);
  }, [Dark]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill={Dark ? "white" : "black"}
    >
      <path d="M5 6.5H19V8H5V6.5Z" />
      <path d="M5 16.5H19V18H5V16.5Z" />
      <path d="M5 11.5H19V13H5V11.5Z" />
    </svg>
  );
};

export default HambergLogo;
