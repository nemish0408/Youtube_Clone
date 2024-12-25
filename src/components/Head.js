import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import {
  SEARCH_API_URL,
  SEARCH_VIDEO_URL,
  SEARCH_VIDEO_URL_EXT,
} from "../utils/constants";
import { Link } from "react-router-dom";
import { setFilter } from "../utils/searchResultSlice";
import { useLocation, useNavigate } from "react-router";

const Head = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchSugg, setSearchSugg] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceTimer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // to track current URL location


  const getVideos = async (searchText) => {
    try {
      const response = await fetch(`${SEARCH_API_URL}${searchText}`);
      const data = await response.json();
      setSearchSugg(data[1] || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchKey(text);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (text.trim()) {
        getVideos(text);
      } else {
        setSearchSugg([]);
      }
    }, 300);
  };

  const handleSearch = async () => {
    const searchUrl = `${SEARCH_VIDEO_URL}${searchKey}${SEARCH_VIDEO_URL_EXT}`;
    const response = await fetch(searchUrl);
    const json = await response.json();
    dispatch(setFilter(json));
    if (location.pathname.includes("/search")) {
      localStorage.setItem("searchKey", searchKey);
    }
    navigate("/search=/" + searchKey);
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchSugg.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < searchSugg.length) {
        setSearchKey(searchSugg[selectedIndex]);
      }
      setIsFocused(false);
      handleSearch();
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const savedSearchKey = localStorage.getItem("searchKey"); // Retrieve the search key from localStorage
    if (savedSearchKey) {
      setSearchKey(savedSearchKey);
      getVideos(savedSearchKey); // Optionally fetch suggestions
    }
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < searchSugg.length) {
      setSearchKey(searchSugg[selectedIndex]);
    }
  }, [selectedIndex, searchSugg]);
  useEffect(() => {
    // Only retrieve the searchKey if we're on the search page
    if (location.pathname.startsWith("/search")) {
      const savedSearchKey = localStorage.getItem("searchKey");
      if (savedSearchKey) {
        setSearchKey(savedSearchKey);
      } else {
        setSearchKey(''); // Clear the search key if not found in localStorage
      }
    } else {
      setSearchKey(''); // Clear search key when not on the search page
    }
  }, [location.pathname]);
  

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 bg-white shadow-md">
      <div className="flex justify-between items-center px-4 md:px-6 py-2">
        {/* Left Section */}
        <div className="flex items-center">
          <button onClick={() => dispatch(toggleMenu())} className="p-2">
            <img
              src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/What%20is%20a%20Hamburger%20Button.png?width=225&name=What%20is%20a%20Hamburger%20Button.png"
              alt="Menu"
              className="w-6 md:w-8"
            />
          </button>
          <Link to="/" className="ml-4 hidden md:block">
            <img
              src="https://cdnlogo.com/logos/y/73/youtube.svg"
              alt="YouTube Logo"
              className="w-24"
            />
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex flex-grow justify-center items-center relative">
          <div className="flex items-center w-full max-w-3xl relative">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-l-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search"
              value={searchKey}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="border border-gray-300 rounded-r-full bg-gray-100 px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSearch()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16a6 6 0 100-12 6 6 0 000 12zm8 0l4 4"
                />
              </svg>
            </button>
            {searchSugg.length > 0 && isFocused && (
              <div className="absolute top-full mt-2 bg-white shadow-lg w-full max-w-3xl rounded-lg z-10">
                <ul className="py-2">
                  {searchSugg.map((item, index) => (
                    <li
                      key={index}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSearchKey(item);
                        handleSearch();
                      }}
                      className={`px-4 py-2 cursor-pointer ${
                        index === selectedIndex
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="30"
              viewBox="0 0 24 24"
              width="30"
              fill="black"
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
            <span className="h-full text-sm flex pt-2.5 md:pt-1 align-middle">
              Create
            </span>
          </button>
          <button className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="black"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                clipRule="evenodd"
                d="m13.497 4.898.053.8.694.4C15.596 6.878 16.5 8.334 16.5 10v2.892c0 .997.27 1.975.784 2.83L18.35 17.5H5.649l1.067-1.778c.513-.855.784-1.833.784-2.83V10c0-1.666.904-3.122 2.256-3.902l.694-.4.053-.8c.052-.78.703-1.398 1.497-1.398.794 0 1.445.618 1.497 1.398ZM6 10c0-2.224 1.21-4.165 3.007-5.201C9.11 3.236 10.41 2 12 2c1.59 0 2.89 1.236 2.993 2.799C16.79 5.835 18 7.776 18 10v2.892c0 .725.197 1.436.57 2.058l1.521 2.535c.4.667-.08 1.515-.857 1.515H15c0 .796-.316 1.559-.879 2.121-.562.563-1.325.879-2.121.879s-1.559-.316-2.121-.879C9.316 20.56 9 19.796 9 19H4.766c-.777 0-1.257-.848-.857-1.515L5.43 14.95c.373-.622.57-1.333.57-2.058V10Zm4.5 9c0 .398.158.78.44 1.06.28.282.662.44 1.06.44s.78-.158 1.06-.44c.282-.28.44-.662.44-1.06h-3Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black-600"
              fill="black"
              viewBox="0 0 18 18"
              stroke="currentColor"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                fill=""
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Head;
