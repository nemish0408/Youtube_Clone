import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../utils/functions/fetchURL";
import { LIKED_VIDEO_URL } from "../utils/constants";
import VideoCard from "./VideoCard";

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [menu, setmenu] = useState("");
  const isMenu = useSelector((store) => store.app.isMenuOpen);
  const accesstoken = localStorage.getItem("token");
  const { data: json } = useFetch(LIKED_VIDEO_URL, {
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  console.log(json);

  useEffect(() => {
    setmenu(isMenu);
  }, [isMenu]);
  useEffect(() => {
    setVideos(json?.items);
  }, [json]);
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
export default LikedVideos;
