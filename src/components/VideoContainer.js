import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard, { AdVideocard } from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_URL);
    const json = await data.json();
    await setVideos(json.items);
    // console.log(json);
    
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 gap-5 p-5 ">
      {videos[0]&&<AdVideocard info={videos[0]}></AdVideocard>}
      {videos.map((item, index) => {
        return (
          <div className="shadow-md rounded-lg w-full" key={index}>
            <VideoCard info={item} />
          </div>
        );
      })}
    </div>
  );
};

export default VideoContainer;
