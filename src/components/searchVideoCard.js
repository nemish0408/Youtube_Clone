import React, { useEffect, useState } from "react";
import VideoCard1 from "./Videocard1";
import { useParams } from "react-router";

const SearchVideoCard = () => {
  const [filtered, setFiltered] = useState([]);
  const keyw = useParams();

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

  useEffect(() => {
    fetchFilteredResults();

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
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5 p-5">
        {filtered?.items?.length > 0 ? (
          filtered?.items?.map((item, index) => (
            <div className="shadow-md rounded-lg w-full max-h-full" key={index}>
              <VideoCard1 info={item} />
            </div>
          ))
        ) : (
          <div>No videos found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchVideoCard;
