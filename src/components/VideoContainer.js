import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard from "./VideoCard";
import { useDispatch } from "react-redux";
import { setResults } from "../utils/searchResultSlice";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const dispatch = useDispatch();

  // Load initial filtered results from local storage
  useEffect(() => {
    const savedFiltered = JSON.parse(localStorage.getItem("Results") || "[]");
    setFiltered(savedFiltered);
  }, []); // Run only once when the component mounts

  // Fetch videos from API
  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetch(YOUTUBE_VIDEO_URL);
        const json = await data.json();
        setVideos(json.items || []); // Set videos or an empty array
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getVideos();
  }, []); // Run only once when the component mounts

  // Update Redux store when videos are fetched
  useEffect(() => {
    if (videos.length > 0) {
      dispatch(setResults(videos));
    }
  }, [videos, dispatch]); // Run whenever videos change

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-5 p-5">
      {/* Map through filtered results */}
      {filtered.length > 0 ? (
        filtered.map((item, index) => (
          <div className="shadow-md rounded-lg w-full" key={index}>
            <VideoCard info={item} />
          </div>
        ))
      ) : (
        <div>No videos found.</div>
      )}
    </div>
  );
};

export default VideoContainer;
