import React, { useEffect, useState } from "react";
import useFetch from "../utils/functions/fetchURL";
import { LIVE_VIDEO_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

const LiveVideos = () => {
  const [videos, setVideos] = useState([]);
  const [menu, setmenu] = useState("");
  const isMenu = useSelector((store) => store.app.isMenuOpen);
  const { data: json } = useFetch(LIVE_VIDEO_URL);
  // console.log(json);
  
  useEffect(() => {
    setmenu(isMenu);
  }, [isMenu]);
  useEffect(() => {
    setVideos(json?.items)
  },[json]);
  return (
    <div
      className={
        menu
          ? "grid md:grid-cols-3 grid-cols-1 gap-5 p-5 overflow-y-scroll scrollbar-hidden max-h-[85vh] pt-5"
          : "grid md:grid-cols-4 grid-cols-1 gap-5 p-5 overflow-y-scroll scrollbar-hidden max-h-[85vh] pt-5"
      }
    >
      {videos?.length > 0 ? (
        videos?.map((item, index) => (
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

export default LiveVideos;
