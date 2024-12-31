import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ShortLogo = () => {
  const Dark = useSelector((store) => store.app.isDark);
  useEffect(() => {
    const theme = Dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", Dark);
    localStorage.setItem("theme", theme);
  }, [Dark]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 24 24"
      height="24"
      viewBox="0 0 24 24"
      fill={Dark ? "white" : "black"}
      width="24"
      focusable="false"
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        display: "inherit",
        width: "100%",
        height: "100%",
      }}
    >
      <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"></path>
    </svg>
  );
};

export default ShortLogo;
