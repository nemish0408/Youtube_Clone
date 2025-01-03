import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TranslateIcon from "@mui/icons-material/Translate";
import LockIcon from "@mui/icons-material/Lock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../utils/appSlice";

const ProfileMenu = ({ user:data }) => {
  const [isDark, setisDark] = useState("");
  const [user, setUser] = useState({})
  const dark = useSelector((store) => store.app.isDark);
  const dispatch = useDispatch();
  useEffect(() => {
    setisDark(dark);
  });
  useEffect(()=>{
setUser(data)
  },[data])
  return (
    <div>
      <div className="grid">
        <div className="flex">
          <div className=" px-4 my-auto">
            {user?.picture ? (
              <div className="w-12 h-12 rounded-full">
                <img
                  src={user?.picture}
                  className="w-full rounded-full"
                  alt="profile"
                />
              </div>
            ) : (
              <div className="bg-gray-400 w-12 h-12 rounded-full"></div>
            )}
          </div>
          <div className="py-4">
            <p className="font-semibold dark:text-white">
              {user ? user?.name : "User Name"}
            </p>
            <p className="font-light dark:text-white">
              {user ? user?.email : "Email"}
            </p>
            <p className="font-light text-blue-600 cursor-pointer dark:text-blue-400">
              Create a channel
            </p>
          </div>
        </div>
        <hr />
        <div className="overflow-y-scroll scrollbar-hidden lg:h-[73vh] h-[57vh] select-none ">
          <ul className="">
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <AccountCircleIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              Google Account
            </li>
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 justify-between dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <div className="flex items-center">
                <SwitchAccountIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
                Switch Account
              </div>
              <KeyboardArrowRightIcon className="text-gray-700 dark:text-white" />
            </li>
            <li
              onClick={() => {
                localStorage.setItem("token", null);
                localStorage.setItem("user", null);
                
              }}
              className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]"
            >
              <ExitToAppIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              {user && "Sign Out"}
            </li>
            <hr className="my-1 border-gray-200" />
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <VideoLibraryIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              YouTube Studio
            </li>
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <CreditCardIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              Purchases and Memberships
            </li>
            <hr className="my-1 border-gray-200" />
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <DataUsageIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              Your Data in YouTube
            </li>
            <li
              className="flex items-center px-4 py-2 cursor-pointer  hover:bg-gray-100 justify-between dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => dispatch(toggleMode())}
            >
              <div className="flex items-center select-none">
                {isDark ? (
                  <DarkModeIcon className="text-gray-700 mr-3 dark:text-white" />
                ) : (
                  <LightModeOutlinedIcon className="text-gray-700 mr-3 dark:text-white" />
                )}{" "}
                Appearance:
                {isDark ? " Dark" : " Light"}
              </div>
              <KeyboardArrowRightIcon className="text-gray-700 dark:text-white" />
            </li>
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 justify-between dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <div className="flex items-center">
                <TranslateIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
                Language: English
              </div>
              <KeyboardArrowRightIcon className="text-gray-700 dark:text-white" />
            </li>
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 justify-between dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <div className="flex items-center">
                <LockIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
                Restricted Mode: Off
              </div>
              <KeyboardArrowRightIcon className="text-gray-700 dark:text-white" />
            </li>
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 justify-between dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <div className="flex items-center">
                <LocationOnIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
                Location: India
              </div>
              <KeyboardArrowRightIcon className="text-gray-700 dark:text-white" />
            </li>
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <KeyboardIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              Keyboard Shortcuts
            </li>
            <hr className="my-1 border-gray-200" />
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <SettingsIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              Settings
            </li>
            <hr className="my-1 border-gray-200" />

            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <HelpIcon className="text-gray-700 mr-3 dark:text-white" /> Help
            </li>
            <li className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-[rgba(255,255,255,0.1)]">
              <FeedbackIcon className="text-gray-700 mr-3 dark:text-white" />{" "}
              Send Feedback
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
