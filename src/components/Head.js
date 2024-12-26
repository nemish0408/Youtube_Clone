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
import PlusLogo from "../svg/PlusLogo";
import SearchLogo from "../svg/SearchLogo";
import BellLogo from "../svg/BellLogo";
import ProfileLogo from "../svg/ProfileLogo";
import useFetch from "../utils/functions/fetchURL";

const Head = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchSugg, setSearchSugg] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceTimer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data  ,
    loading,
    error,
  } = useFetch(searchKey ? `${SEARCH_API_URL}${searchKey}` : null);

  const getVideos = async () => {
    if (data && Array.isArray(data) && data.length > 1) {
      setSearchSugg(data[1]);
    } else {
      setSearchSugg([]);
    }  };

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
    const savedSearchKey = localStorage.getItem("searchKey");
    if (savedSearchKey) {
      setSearchKey(savedSearchKey);
      getVideos();
    }
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < searchSugg.length) {
      setSearchKey(searchSugg[selectedIndex]);
    }
  }, [selectedIndex, searchSugg]);
  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      const savedSearchKey = localStorage.getItem("searchKey");
      if (savedSearchKey) {
        setSearchKey(savedSearchKey);
      } else {
        setSearchKey("");
      }
    } else {
      setSearchKey("");
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
        <div className="flex flex-grow justify-center items-center relative search-container">
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
              <SearchLogo />
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
                        handleSearch(); // Trigger search on click
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
            <PlusLogo />
            <span className="h-full text-sm flex pt-2.5 md:pt-1 align-middle">
              Create
            </span>
          </button>
          <button className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full">
            <BellLogo />
          </button>
          <button className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full">
            <ProfileLogo />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Head;
