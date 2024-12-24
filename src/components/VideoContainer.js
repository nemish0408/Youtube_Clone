import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard, { AdVideocard } from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../utils/searchResultSlice";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const filtered = useSelector((store) => store.searchResult.FilteredResults);
  // console.log(filtered);

  useEffect(() => {
    getVideos();
  }, []); // Fetch videos when the component mounts

  useEffect(() => {
    if (videos.length > 0) {
      // Dispatch setResults whenever the videos are updated
      dispatch(setResults(videos));
    }
  }, [videos, dispatch]); // Runs whenever videos state changes

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_URL);
      const json = await data.json();
      setVideos(json.items || []); // Set to empty array if no items
      // console.log(json);
      
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-5 p-5">
      {/* Optional: Display an ad video at the top */}
      {/* {videos[0] && <AdVideocard info={videos[0]} />} */}
      
      {/* Map through filtered results */}
      {filtered.length > 0 ? (
        filtered.map((item, index) => {
          return (
            <div className="shadow-md rounded-lg w-full" key={index}>
              <VideoCard info={item} />
            </div>
          );
        })
      ) : (
        <div>No videos found.</div>
      )}
    </div>
  );
};

export default VideoContainer;
