import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../utils/searchResultSlice";
import useFetch from "../utils/functions/fetchURL";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [menu,setmenu] = useState('')
  const dispatch = useDispatch();
  const isMenu =useSelector((store) => store.app.isMenuOpen);
  const { data: json } = useFetch(YOUTUBE_VIDEO_URL);
  const getVideos = () => {
    setVideos(json?.items);
    console.log(json);
    
    // await dispatch(setResults(json.items))
  };
  useEffect(() => {
    const savedFiltered = JSON.parse(localStorage.getItem("Results") || "[]");
    setFiltered(savedFiltered);
    if (json && json.items && json.items[0]) {
      getVideos();
    }
  }, [json]);

  useEffect(() => {
    if (videos.length > 0) {
      dispatch(setResults(videos));
    }
  }, [videos]);
useEffect(()=>{
setmenu(isMenu)
},[isMenu])
  return (
    <div className={menu?"grid md:grid-cols-3 grid-cols-1 gap-5 p-5":"grid md:grid-cols-4 grid-cols-1 gap-5 p-5"}>
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
