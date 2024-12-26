import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard from "./VideoCard";
import { useDispatch } from "react-redux";
import { setResults } from "../utils/searchResultSlice";
import useFetch from "../utils/functions/fetchURL";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const dispatch = useDispatch();
  const { data: json, loading, error } = useFetch(YOUTUBE_VIDEO_URL);
  const getVideos = async () => {
    setVideos(json.items || []);
  };
  useEffect(() => {
    const savedFiltered = JSON.parse(localStorage.getItem("Results") || "[]");
    setFiltered(savedFiltered);
    if (json && json.items && json.items[0]) {
      getVideos();
    }
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      dispatch(setResults(videos));
    }
  }, [videos, dispatch]);

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-5 p-5">
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
