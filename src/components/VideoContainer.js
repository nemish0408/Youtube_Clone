import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_URL } from "../utils/constants";
import VideoCard from "./VideoCard";
import { useDispatch } from "react-redux";
import { setResults } from "../utils/searchResultSlice";
import { VirtuosoGrid } from "react-virtuoso";
import useFetch from "../utils/functions/fetchURL";
import useLoadMoreVideos from "../utils/functions/loadingMore";

const gridComponents = {
  List: React.forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
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
  const [nextPageToken, setNextPageToken] = useState("");
  const dispatch = useDispatch();

  const { data: initialData, error: initialError } =
    useFetch(YOUTUBE_VIDEO_URL);

  useEffect(() => {
    if (initialData) {
      setVideos(initialData.items || []);
      setNextPageToken(initialData.nextPageToken || "");
      localStorage.setItem("Results", JSON.stringify(initialData.items || []));
    }
  }, [initialData]);

  const {
    data: moreData,
    loading: isLoadingMore,
    error: loadMoreError,
    loadMore,
  } = useLoadMoreVideos(YOUTUBE_VIDEO_URL, nextPageToken, setNextPageToken);

  useEffect(() => {
    if (videos.length > 0) {
      dispatch(setResults(videos));
    }
  }, [videos, dispatch]);

  useEffect(() => {
    const savedFiltered = JSON.parse(localStorage.getItem("Results") || "[]");
    setFiltered(savedFiltered);
  }, [videos]);
  useEffect(() => {
    if (moreData && moreData.length > 0) {
      setVideos((prevVideos) => [...prevVideos, ...moreData]);
    }
  }, [moreData]);

  return (
    <div className="mt-2">
      {filtered.length > 0 ? (
        <VirtuosoGrid
          style={{ height: "78vh" }}
          totalCount={filtered.length}
          className="scrollbar-hidden"
          components={gridComponents}
          itemContent={(index) => <VideoCard info={filtered[index]} />}
          endReached={loadMore}
        />
      ) : (
        <div>No videos found.</div>
      )}
      {isLoadingMore && (
        <div className="text-center mt-4">Loading more videos...</div>
      )}
      {initialError && (
        <div className="text-center text-red-500">
          Error: {initialError.message}
        </div>
      )}
      {loadMoreError && (
        <div className="text-center text-red-500">
          Error: {loadMoreError.message}
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
