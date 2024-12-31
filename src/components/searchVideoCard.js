import React, { useEffect, useState } from "react";
import VideoCard1 from "./Videocard1";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setFilter } from "../utils/searchResultSlice";
import { SEARCH_VIDEO_URL, SEARCH_VIDEO_URL_EXT } from "../utils/constants";

const SearchVideoCard = () => {
  const [filtered, setFiltered] = useState([]);
  const keyw = useParams();
  console.log(keyw.id);
  
  const dispatch = useDispatch();
  // const location = useLocation();

  // const searchKey = localStorage.getItem("searchKey");
  // console.log(searchKey);

  const fetchFilteredResults = () => {
    try {
      const savedFiltered = JSON.parse(
        localStorage.getItem("FilteredResults") || "[]"
      );
      setFiltered(savedFiltered);
    } catch (error) {
      console.error("Error reading filtered results from localStorage:", error);
      setFiltered([]);
    }
  };
  const handleSearch = async () => {
    const searchUrl = `${SEARCH_VIDEO_URL}${keyw.id}${SEARCH_VIDEO_URL_EXT}`;
    const response = await fetch(searchUrl);
    const json = await response.json();
    dispatch(setFilter(json));
  };
  useEffect(() => {
    const fetchAndSetResults = async () => {
      await handleSearch(); // Wait for handleSearch to complete
      fetchFilteredResults(); // Then run fetchFilteredResults
    };
  
    fetchAndSetResults();
  
    const handleStorageChange = () => {
      fetchFilteredResults();
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [keyw]);

  return (
    <div className="min-w-[83vw] max-w-[98vw] overflow-y-scroll scrollbar-hidden max-h-[85vh] pt-5">
      <div className="grid grid-cols-1 gap-5 p-5 min-h-screen">
        {filtered?.items?.length > 0 ? (
          filtered?.items?.map((item, index) => (
            <div className="shadow-md lg:shadow-none lg:hover:shadow-md  rounded-lg w-full max-h-full" key={index}>
              <VideoCard1 info={item} />
            </div>
          ))
        ) : (
          <div className="min-h-screen dark:text-[#f1f1f1] dark:bg-[#0f0f0f]"><p className="dark:text-[#f1f1f1] text-4xl">
            No videos found.</p></div>
        )}
      </div>
    </div>
  );
};

export default SearchVideoCard;
