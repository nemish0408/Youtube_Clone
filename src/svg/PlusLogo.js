import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PlusLogo = () => {
  const Dark = useSelector((store) => store.app.isDark);
  useEffect(() => {
    const theme = Dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", Dark);
    localStorage.setItem("theme", theme);
  }, [Dark]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="30"
      viewBox="0 0 24 24"
      width="30"
      fill={Dark ? "white" : "black"}
      focusable="false"
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        display: "inherit",
        width: "100%",
        height: "100%",
      }}
    >
      <path d="M20 12h-8v8h-1v-8H3v-1h8V3h1v8h8v1z"></path>
    </svg>
  );
};

export default PlusLogo;
