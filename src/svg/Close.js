import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Close = () => {
  const Dark = useSelector((store) => store.app.isDark);
  useEffect(() => {
    const theme = Dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", Dark);
    localStorage.setItem("theme", theme);
  }, [Dark]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="28"
      height="28"
      viewBox="0 0 50 50"
      fill={Dark ? "white" : "black"}
    >
      <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
    </svg>
  );
};

export default Close;
