import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Head = () => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="py-[20px] mb-[30px] bg-white shadow-slate-400 shadow-lg sticky top-0 z-[1]">
      <div className="flex px-[30px] justify-between ">
        <div className="flex align-middle ">
          <button onClick={() => toggleMenuHandler()}>
            <img
              src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/What%20is%20a%20Hamburger%20Button.png?width=225&name=What%20is%20a%20Hamburger%20Button.png"
              alt="img"
              className="w-[25px]"
            />
          </button>
          <button className="ms-5">
            <img
              src="https://cdnlogo.com/logos/y/73/youtube.svg"
              alt="img"
              className="w-[150px]"
            />
          </button>
        </div>
        <div className="flex justify-center w-full px-10">
          <div className="flex items-center w-full max-w-sm">
            <div className="relative w-full">
              <span
                className={`absolute inset-y-0 left-3 flex items-center transition-opacity duration-300 ${
                  isFocused ? "opacity-100" : "opacity-0"
                }`}
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
              </span>
              <input
                type="text"
                className="w-full border border-gray-500 rounded-l-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Search"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
          </div>
          <button className="border border-gray-500 rounded-r-full border-l-0 px-3 py-2 hover:bg-gray-500 hover:text-white">
            Search
          </button>
        </div>
        <div className="flex align-middle gap-2">
          <button className="flex justify-center align-middle gap-1.5 bg-gray-500 text-white hover:bg-gray-600 px-4 rounded-full  min-w-[110px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="30"
              viewBox="0 0 24 24"
              width="30"
              fill="white"
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
            <span className="h-full flex pt-2 align-middle">Create</span>
          </button>
          <div className="p-2 rounded-full bg-gray-500 hover:bg-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                display: "inherit",
                height: "100%",
              }}
              className="w-[24px]"
            >
              <path
                clipRule="evenodd"
                d="m13.497 4.898.053.8.694.4C15.596 6.878 16.5 8.334 16.5 10v2.892c0 .997.27 1.975.784 2.83L18.35 17.5H5.649l1.067-1.778c.513-.855.784-1.833.784-2.83V10c0-1.666.904-3.122 2.256-3.902l.694-.4.053-.8c.052-.78.703-1.398 1.497-1.398.794 0 1.445.618 1.497 1.398ZM6 10c0-2.224 1.21-4.165 3.007-5.201C9.11 3.236 10.41 2 12 2c1.59 0 2.89 1.236 2.993 2.799C16.79 5.835 18 7.776 18 10v2.892c0 .725.197 1.436.57 2.058l1.521 2.535c.4.667-.08 1.515-.857 1.515H15c0 .796-.316 1.559-.879 2.121-.562.563-1.325.879-2.121.879s-1.559-.316-2.121-.879C9.316 20.56 9 19.796 9 19H4.766c-.777 0-1.257-.848-.857-1.515L5.43 14.95c.373-.622.57-1.333.57-2.058V10Zm4.5 9c0 .398.158.78.44 1.06.28.282.662.44 1.06.44s.78-.158 1.06-.44c.282-.28.44-.662.44-1.06h-3Z"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="p-2 rounded-full bg-gray-500 hover:bg-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              height="24"
              viewBox="0 0 16 16"
              width="24"
              focusable="false"
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                display: "inherit",
                height: "100%",
              }}
              className="w-[24px]"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
