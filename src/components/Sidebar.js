import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) {
    return null;
  } else {
    return (
      <div className="md:w-[12vw] absolute md:relative pe-8 md:pe-0 h-full bg-white overflow-y-auto scrollbar-hidden">
        <div>
          <h1 className="font-semibold ps-8 py-2">Home</h1>
          <h1 className="font-semibold ps-8 py-2">Shorts</h1>
          <h1 className="font-semibold ps-8 py-2">Subscriptions</h1>
          <h1 className="font-bold  py-2">Explore &gt; </h1>
          <ul>
            <li className="font-semibold ps-8 py-2">Trending</li>
            <li className="font-semibold ps-8 py-2">Shopping</li>
            <li className="font-semibold ps-8 py-2">Movies</li>
            <li className="font-semibold ps-8 py-2">Music</li>
            <li className="font-semibold ps-8 py-2">Live</li>
            <li className="font-semibold ps-8 py-2">News</li>
            <li className="font-semibold ps-8 py-2">Sports</li>
            <li className="font-semibold ps-8 py-2">Courses</li>
            <li className="font-semibold ps-8 py-2">Fashion & Beauty</li>
            <li className="font-semibold ps-8 py-2">Podcasts</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Sidebar;
