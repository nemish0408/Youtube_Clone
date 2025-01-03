import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../utils/searchResultSlice";
import useFetch from "../utils/functions/fetchURL";
import { VirtuosoGrid } from "react-virtuoso";

const gridComponents = {
  List: React.forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        // gap: "0.5rem", // Matches Tailwind's gap-5
        // padding: "0.7 rem", // Matches Tailwind's p-5
        ...style,
      }}
      className="justify-around"
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      
      className="w-full md:w-[32%] lg:w-[22%] shadow-md rounded-lg"
    >
      {children}
    </div>
  ),
};

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const isMenu = useSelector((store) => store.app.isMenuOpen);
  const { data: json } = useFetch(YOUTUBE_VIDEO_URL);

  const getVideos = () => {
    setVideos(json?.items || []);
  };

  useEffect(() => {
    const savedFiltered = JSON.parse(localStorage.getItem("Results") || "[]");
    setFiltered(savedFiltered);
    if (json && json.items) {
      getVideos();
    }
  }, [json]);

  useEffect(() => {
    if (videos.length > 0) {
      dispatch(setResults(videos));
    }
  }, [videos, dispatch]);

  useEffect(() => {
    setMenu(isMenu);
  }, [isMenu]);

  return (
    <div className="mt-2">
      {filtered.length > 0 ? (
        <VirtuosoGrid
          style={{ height: "78vh" }}
          totalCount={filtered.length}
          className="scrollbar-hidden"
          components={gridComponents}
          itemContent={(index) => <VideoCard info={filtered[index]} />}
        />
      ) : (
        <div>No videos found.</div>
      )}
    </div>
  );
};

export default VideoContainer;
