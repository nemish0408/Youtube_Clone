import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import BellLogoBlack from "../svg/BellLogoBlack";
import ProfileLogo from "../svg/ProfileLogo";
import useFetch from "../utils/functions/fetchURL";
// import NotificationBox from "./NotificationBox";
// import ProfileMenu from "./ProfileMenu";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import CellTowerOutlinedIcon from "@mui/icons-material/CellTowerOutlined";
import Youtubelogo from "../svg/Youtubelogo";
import HambergLogo from "../svg/HambergLogo";
import Close from "../svg/Close";

const NotificationBox = React.lazy(() => import("./NotificationBox"));
const ProfileMenu = React.lazy(() => import("./ProfileMenu"));

const Head = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [searchSugg, setSearchSugg] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [user, setUser] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceTimer = useRef(null);
  const userdata = JSON.parse(localStorage.getItem("user"))||{};
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const createRef = useRef(null);
  const { data } = useFetch(searchKey ? `${SEARCH_API_URL}${searchKey}` : null);

  const getVideos = async () => {
    if (data && Array.isArray(data) && data.length > 1) {
      setSearchSugg(data[1]);
    } else {
      setSearchSugg([]);
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setIsFocused(true);
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
    }, 0);
  };

  const handleSearch = async () => {
    const searchUrl = `${SEARCH_VIDEO_URL}${searchKey}${SEARCH_VIDEO_URL_EXT}`;
    const response = await fetch(searchUrl);
    const json = await response.json();
    dispatch(setFilter(json));
    if (location.pathname.includes("/search")) {
      localStorage.setItem("searchKey", searchKey);
    } else {
      localStorage.setItem("searchKey", searchKey);
    }
    navigate("/search=/" + searchKey);
    setIsFocused(false);
    setSelectedIndex(-1);
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
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfile(false);
    }
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsNotification(false);
    }
    if (createRef.current && !createRef.current.contains(event.target)) {
      setIsCreate(false);
    }
  };
  // console.log(user?.name);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const savedSearchKey = localStorage.getItem("searchKey");
    if (savedSearchKey) {
      setSearchKey(savedSearchKey);
      getVideos();
    }
  }, []);
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      setUser({});
    }
  }, [token]);
  

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
    <div className="sticky top-0 z-10 bg-white dark:bg-[#0f0f0f] shadow-md">
      <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-2 order-1">
        {/* Left Section */}
        <div className="flex items-center">
          <button onClick={() => dispatch(toggleMenu())} className="p-2">
            {isMenuOpen ? <Close /> : <HambergLogo />}
          </button>
          {/* {console.log(localStorage.getItem("isMenuOpen"))} */}
          <Link to="/" className="ml-4 flex align-middle">
            <Youtubelogo />
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex flex-grow justify-center items-center relative search-container order-3 lg:order-2">
          <div className="flex items-center w-full max-w-3xl relative lg:mt-0 mt-2">
            <input
              type="text"
              className="flex-grow border dark:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.2)] border-gray-300 rounded-l-full dark:border-gray-500 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-white dark:text-white"
              placeholder="Search"
              value={searchKey}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="border border-gray-300 dark:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.2)] rounded-r-full bg-gray-100 dark:border-gray-500 px-4 py-2 hover:bg-gray-200"
              onClick={() => handleSearch()}
            >
              <SearchLogo />
            </button>
            {searchSugg.length > 0 && isFocused && (
              <div className="absolute top-full mt-2 bg-white dark:bg-[#212121] shadow-lg w-full max-w-3xl rounded-lg z-10">
                <ul className="py-2">
                  {searchSugg.map((item, index) => (
                    <li
                      key={index}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setSearchKey(item);
                        handleSearch(); // Trigger search on click
                      }}
                      className={`px-4 py-2 cursor-pointer dark:text-white ${
                        index === selectedIndex
                          ? "bg-gray-200 dark:bg-[rgb(255,255,255,0.2)]"
                          : "hover:bg-gray-100 dark:hover:bg-[rgb(255,255,255,0.1)] "
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
        <div className="flex items-center gap-4 order-2 lg:order-3">
          <div className="relative" ref={createRef}>
            <button
              className="p-1.5 lg:p-2 bg-gray-100 dark:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.2)] hover:bg-gray-200 rounded-full lg:flex"
              onClick={() => {
                setIsCreate(!isCreate);
                setIsProfile(false);
                setIsNotification(false);
              }}
            >
              <PlusLogo />
              <span className="h-full hidden text-sm dark:text-white lg:flex pt-2.5 md:pt-1 align-middle">
                Create
              </span>
            </button>
            {isCreate && (
              <div className=" shadow-lg rounded-lg absolute bg-white dark:bg-[#212121] lg:w-[12vw] w-[35vw]">
                <ul>
                  <Link
                    to="/"
                    className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.2)]"
                  >
                    <SmartDisplayOutlinedIcon className="text-gray-700 dark:text-white" />
                    <span className="text-sm ms-2 md:text-base dark:text-white font-semibold">
                      upload video
                    </span>
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center rounded-lg py-3 px-2 dark:text-white hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.2)]"
                  >
                    <CellTowerOutlinedIcon className="text-gray-700 dark:text-white" />
                    <span className="text-sm ms-2 md:text-base font-semibold">
                      Go live{" "}
                    </span>
                  </Link>
                </ul>
              </div>
            )}
          </div>
          <div className="relative" ref={notificationRef}>
            <button
              className="p-2 h-10 w-10 hover:bg-gray-200 dark:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.2)] bg-gray-100 rounded-full"
              onClick={() => {
                setIsNotification(!isNotification);
                setIsProfile(false);
                setIsCreate(false);
              }}
            >
              <BellLogoBlack />
            </button>
            {isNotification && (
              <div className="absolute bg-white dark:bg-[#0f0f0f] rounded-lg right-0 -translate-x-screen h-[70vh] lg:h-[90vh] shadow-md w-scereen lg:min-w-[30vw] top-10">
                <NotificationBox />
              </div>
            )}
          </div>
          <div className="relative" ref={profileRef}>
            <button
              className="p-2 h-10 w-10 dark:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.2)] hover:bg-gray-200 bg-gray-100 rounded-full"
              onClick={() => {
                setIsProfile(!isProfile);
                setIsNotification(false);
                setIsCreate(false);
              }}
            >
              {user ? (
                <img
                  src={user?.picture}
                  alt="img"
                  className="rounded-full scale-150"
                />
              ) : (
                <ProfileLogo />
              )}
              {/* <ProfileLogo /> */}
            </button>
            {isProfile && (
              <div className="absolute bg-white dark:bg-[#212121] rounded-lg right-0 -translate-x-screen h-[70vh] lg:h-[90vh] shadow-md w-scereen min-w-[90vw] lg:min-w-[30vw] top-10">
                <ProfileMenu user={user} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
