import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_URL);
    const json = await data.json();
    await setVideos(json.items);
  };

  return (
    <div className="grid grid-cols-4 gap-5 p-5">
      {videos.map((item, index) => {
        return (
          <div className="shadow-md rounded-lg" key={index}>
            <VideoCard info={item} />
          </div>
        );
      })}
    </div>
  );
};

export default VideoContainer;
