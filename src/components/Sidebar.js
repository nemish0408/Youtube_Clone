import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleMenu } from "../utils/appSlice";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => dispatch(toggleMenu())}
        className="fixed top-4 left-4 z-30 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg md:hidden"
      >
        <img
          src="https://img.icons8.com/?size=100&id=aJXCfqpXgZUC&format=png&color=000000"
          alt="Menu"
          className="w-6 h-6"
        />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg overflow-y-auto scrollbar-hidden z-20 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-[14vw] w-[80vw]`}
      >
        <div className="mt-16 lg:py-4">
          <div>
            <Link
              to="/"
              className="flex items-center py-3 px-4 hover:bg-gray-100"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/home.png"
                alt="Home"
                className="w-6 h-6"
              />
              <span className="ml-4 text-sm md:text-base font-medium">
                Home
              </span>
            </Link>
            <Link
              to="/shorts"
              className="flex items-center py-3 px-4 hover:bg-gray-100"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/film-reel.png"
                alt="Shorts"
                className="w-6 h-6"
              />
              <span className="ml-4 text-sm md:text-base font-medium">
                Shorts
              </span>
            </Link>
            <Link
              to="/subscriptions"
              className="flex items-center py-3 px-4 hover:bg-gray-100"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/subscribe.png"
                alt="Subscriptions"
                className="w-6 h-6"
              />
              <span className="ml-4 text-sm md:text-base font-medium">
                Subscriptions
              </span>
            </Link>
          </div>

          <hr className="my-4 border-gray-300" />

          <div>
            <h1 className="px-4 py-2 text-xs font-bold text-gray-600">
              Explore
            </h1>
            <ul>
              <Link
                to="/videoplayer"
                className="flex items-center py-3 px-4 hover:bg-gray-100"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/fire-element.png"
                  alt="Trending"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Trending
                </span>
              </Link>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/shopping-cart.png"
                  alt="Shopping"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Shopping
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/movie-projector.png"
                  alt="Movies"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Movies
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/musical-notes.png"
                  alt="Music"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Music
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/broadcasting.png"
                  alt="Live"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Live
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/news.png"
                  alt="News"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  News
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/soccer-ball.png"
                  alt="Sports"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Sports
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/open-book.png"
                  alt="Courses"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Courses
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/dress.png"
                  alt="Fashion & Beauty"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Fashion & Beauty
                </span>
              </li>
              <li className="flex items-center py-3 px-4 hover:bg-gray-100">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/microphone.png"
                  alt="Podcasts"
                  className="w-6 h-6"
                />
                <span className="ml-4 text-sm md:text-base font-medium">
                  Podcasts
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
