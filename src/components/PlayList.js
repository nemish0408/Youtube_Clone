import React, { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom"; // For capturing video/playlist ID
import ThreedotsRotate from "../svg/ThreedotsRotate";
import Loop from "../svg/Loop";
import Suffle from "../svg/Suffle";
import SidePopular from "./SidePopular";
import { PLAYLIST_ITEMS_URL, PLAYLIST_ITEMS_URL_EXT } from "../utils/constants";

const WatchPage = lazy(() => import("./WatchPage"));

const PlayList = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch playlist videos
  const fetchPlaylistVideos = async () => {
    try {
      const response = await fetch(
        `${PLAYLIST_ITEMS_URL}${id}${PLAYLIST_ITEMS_URL_EXT}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch playlist videos");
      }
      const data = await response.json();
      setVideos(data.items);
      setSelectedVideo(data.items[0]); // Default to the first video
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPlaylistVideos();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid md:grid-flow-col md:grid-cols-3 gap-4 lg:px-4 pt-0 lg:max-w-[98vw] max-w-full">
      <div className="col-span-2  overflow-y-scroll scrollbar-hidden lg:max-h-[85vh]">
        <Suspense fallback={<div>Loading WatchPage...</div>}>
          <WatchPage id={selectedVideo.snippet.resourceId.videoId} />{" "}
        </Suspense>
      </div>

      <div className="w-screen lg:max-w-[32vw]  overflow-y-scroll scrollbar-hidden lg:max-h-[85vh]">
        <Suspense fallback={<div>Loading SidePopular...</div>}>
          <div className="lg:max-w-[38vw] max-w-[100vw]">
            <div className="lg:max-w-[38vw] p-4">
              <div className="dark:bg-[rgb(255,255,255,0.1)] px-2 rounded-t-lg pt-2">
                <h3 className="text-xl font-bold mb-1 truncate dark:text-[#f1f1f1]">
                  {selectedVideo.snippet.title}
                </h3>
                <p className="text-sm dark:text-[#aaa]">
                  {selectedVideo.snippet.channelTitle}{" "}
                </p>
                <p className="text-gray-500 text-sm mt-1 dark:text-[#aaa]">
                  {videos.findIndex(
                    (video) =>
                      video.snippet.resourceId.videoId ===
                      selectedVideo.snippet.resourceId.videoId
                  ) + 1}
                  /{videos.length}
                </p>
                <div className="flex w-full h-[34px] justify-between">
                  <div className="flex w-full">
                    <div className="hover:bg-gray-200 dark:hover:bg-[rgb(255,255,255,0.2)] p-2 rounded-full">
                      <Loop />
                    </div>
                    <div className="hover:bg-gray-200 p-2 rounded-full dark:hover:bg-[rgb(255,255,255,0.2)]">
                      <Suffle />
                    </div>
                  </div>
                  <div className="flex justify-end hover:bg-gray-300 p-1 rounded-full dark:hover:bg-[rgb(255,255,255,0.2)]">
                    <ThreedotsRotate />
                  </div>
                </div>
              </div>
              <ul className="space-y-4 bg-gray-100 dark:bg-[#0f0f0f] overflow-y-scroll hover:scrollbar-thin scrollbar-hidden scrollbar-thumb-rounded-full scrollbar-thumb-gray-700 scrollbar-track-gray-500 h-[50vh] dark:bg">
                {videos.map((video) => (
                  <li
                    key={video.snippet.resourceId.videoId}
                    className={`flex items-center space-x-4 p-2 cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-[rgb(255,255,255,0.2)] ${
                      selectedVideo?.snippet.resourceId.videoId ===
                      video.snippet.resourceId.videoId
                        ? "bg-gray-300 dark:bg-[rgb(255,255,255,0.3)]"
                        : ""
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-24 h-14 rounded-md"
                    />
                    <div>
                      <h4 className="text-sm font-semibold dark:text-[#f1f1f1]">
                        {video.snippet.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-[#aaa]">
                        {video.snippet.channelTitle}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SidePopular className="mt-3" />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default PlayList;
