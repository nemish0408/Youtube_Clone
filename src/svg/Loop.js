import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Loop = () => {
  const Dark = useSelector((store) => store.app.isDark);
  useEffect(() => {
    const theme = Dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", Dark);
    localStorage.setItem("theme", theme);
  }, [Dark]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      focusable="false"
      fill={Dark?"white":"black"}
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        display: "inherit",
        width: "100%",
        height: "100%",
      }}
    >
      <path d="M21 13h1v5l-18.07.03 2.62 2.62-.71.71-3.85-3.86 3.85-3.85.71.71-2.67 2.67L21 17v-4zM3 7l17.12-.03-2.67 2.67.71.71 3.85-3.85-3.85-3.85-.71.71 2.62 2.62L2 6v5h1V7z" />
    </svg>
  );
};

export default Loop;
