import React, { useRef, useState, useEffect } from "react";

const ButtonList = () => {
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Scroll to the left
  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -300, // Adjust scroll distance for YouTube-like experience
        behavior: "smooth",
      });
    }
  };

  // Scroll to the right
  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 300, // Adjust scroll distance for YouTube-like experience
        behavior: "smooth",
      });
    }
  };

  // Monitor scroll events to update button visibility
  useEffect(() => {
    if (listRef.current) {
      updateScrollButtons();
      listRef.current.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center max-w-full">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          className="absolute left-0 z-10 bg-gradient-to-r from-gray-900 to-transparent text-white px-2 py-2 rounded-full focus:outline-none hover:bg-gray-800"
          onClick={scrollLeft}
        >
          <span className="material-icons pt-1">chevron_left</span>
        </button>
      )}
      {canScrollRight && (
        <button
          className="absolute right-0 z-10 bg-gradient-to-l from-gray-900 to-transparent text-white px-2 py-2 rounded-full focus:outline-none hover:bg-gray-800"
          onClick={scrollRight}
        >
          <span className="material-icons pt-1">chevron_right</span>
        </button>
      )}

      {/* Button List */}
      <div
        className="overflow-x-auto flex items-center scrollbar-hidden px-4"
        ref={listRef}
      >
        <ul className="flex gap-3">
          {[
            "All",
            "Music",
            "Playlists",
            "Live",
            "Javascript",
            "News",
            "Amit Trivedi",
            "Alan Walker",
            "Jubin Nautiyal",
            "React Redux",
            "Context",
            "Provider",
            "All",
            "Music",
            "Playlists",
            "Live",
            "Javascript",
            "News",
            "Amit Trivedi",
            "Alan Walker",
            "Jubin Nautiyal",
            "React Redux",
            "Context",
            "Provider",
          ].map((label, index) => (
            <li
              key={index}
              className="text-sm text-gray-900 bg-gray-200 hover:bg-gray-300 inline-block whitespace-nowrap px-4 py-2 rounded-full cursor-pointer"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ButtonList;
