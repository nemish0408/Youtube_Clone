import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMenu } from "../utils/appSlice";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import CellTowerIcon from "@mui/icons-material/CellTower";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DryCleaningOutlinedIcon from "@mui/icons-material/DryCleaningOutlined";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Close from "../svg/Close";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => dispatch(toggleMenu())}
        className="fixed top-4 left-4 z-30 dark:text-white dark:bg-[rgba(255,255,255,0.1)]  w-10 h-10 rounded-full flex items-center justify-center shadow-lg md:hidden"
      >
        <Close/>
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-[#0f0f0f]  shadow-lg overflow-y-auto scrollbar-hidden z-20 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-[14vw] w-[80vw]`}
      >
        <div className="mt-16 lg:mt-3 lg:py-4">
          <div>
            <Link
              to="/"
              className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              <HomeIcon className="dark:text-white  w-8 h-8" />
              <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                Home
              </span>
            </Link>
            <Link
              to="/shorts"
              className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              <GroupWorkIcon className="dark:text-white w-8 h-8" />
              <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                Shorts
              </span>
            </Link>
            <Link
              to="/subscriptions"
              className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              <SubscriptionsOutlinedIcon className="dark:text-white w-8 h-8" />
              <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                Subscriptions
              </span>
            </Link>
          </div>

          <hr className="my-4 border-gray-300" />

          <div>
            <h1 className="px-4 py-2 font-bold text-gray-600 dark:text-white">
              You
              <KeyboardArrowRightIcon className="dark:text-white pb-0.5 ms-1 scale-125" />
            </h1>
            <Link
              to="/history"
              className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              <HistoryIcon className="dark:text-white " />
              <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                History
              </span>
            </Link>
            <Link
              to="/shorts"
              className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              <PlaylistPlayIcon className="dark:text-white" />
              <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                Playlists
              </span>
            </Link>
            <Link
              to="/subscriptions"
              className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
            >
              <WatchLaterOutlinedIcon className="dark:text-white" />
              <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                Watch later
              </span>
            </Link>
            <Link
              to="/subscriptions"
              className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)] "
            >
              <ThumbUpOffAltOutlinedIcon className="dark:text-white" />
              <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                Liked videos
              </span>
            </Link>
          </div>

          <hr className="my-4 border-gray-300" />

          <div>
            <h1 className="px-4 py-2 font-bold text-gray-600 dark:text-white">
              Explore
            </h1>
            <ul>
              <Link
                to="/videoplayer"
                className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
              >
                <LocalFireDepartmentOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Trending
                </span>
              </Link>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <ShoppingBagOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Shopping
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <MovieFilterOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Movies
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <AudiotrackIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Music
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <CellTowerIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Live
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <NewspaperIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  News
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <EmojiEventsOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Sports
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <SchoolOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Courses
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <DryCleaningOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Fashion & Beauty
                </span>
              </li>
              <li className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]">
                <PodcastsOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Podcasts
                </span>
              </li>

              <hr className="my-4 border-gray-300" />

              <Link
                to="/history"
                className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
              >
                <SettingsIcon className="dark:text-white " />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Settings
                </span>
              </Link>
              <Link
                to="/shorts"
                className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
              >
                <FlagOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Report history
                </span>
              </Link>
              <Link
                to="/subscriptions"
                className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
              >
                <HelpOutlineOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Help
                </span>
              </Link>
              <Link
                to="/subscriptions"
                className="flex items-center py-3 px-4 dark:hover:bg-[rgba(255,255,255,0.2)]"
              >
                <FeedbackOutlinedIcon className="dark:text-white" />
                <span className="ml-4 text-sm md:text-base dark:text-white font-medium">
                  Send feedback
                </span>
              </Link>

              <hr className="my-4 border-gray-300" />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
