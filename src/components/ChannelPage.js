import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router";
import useFetch from "../utils/functions/fetchURL";
import {
  CHANNEL_DETAILS_URL,
  PLAYLISTS_API_URL,
  SEARCH_CHANNEL_VIDEOS_URL,
} from "../utils/constants";
import { FormatNumber } from "../utils/functions/formatNumber";
import VideoCard from "./VideoCard";
import PlaylistCard from "./PlaylistCard";

const ChannelPage = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [channelDetails, setChannelDetails] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [tabs, setTabs] = useState("1");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollableDivRef = useRef(null); // Reference to the scrollable div

  const { data: channel } = useFetch(CHANNEL_DETAILS_URL + id);
  const { data: playlists } = useFetch(PLAYLISTS_API_URL + id);

  // Fetch initial videos
  useEffect(() => {
    const fetchInitialVideos = async () => {
      const response = await fetch(SEARCH_CHANNEL_VIDEOS_URL + id);
      const data = await response.json();
      setVideoDetails(data.items);
      setNextPageToken(data.nextPageToken);
    };

    fetchInitialVideos();
  }, [id]);

  // Set channel and playlist details
  useEffect(() => {
    setChannelDetails(channel?.items[0]);
  }, [channel]);

  useEffect(() => {
    setPlaylistDetails(playlists?.items);
  }, [playlists]);

  // Load more videos
  const loadMoreVideos = useCallback(async () => {
    if (!nextPageToken || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const response = await fetch(
        `${SEARCH_CHANNEL_VIDEOS_URL}${id}&pageToken=${nextPageToken}`
      );
      const data = await response.json();
      setVideoDetails((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Error loading more videos:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [id, nextPageToken, isLoadingMore]);

  // Infinite scrolling for the scrollable div
  useEffect(() => {
    const handleScroll = () => {
      const scrollableDiv = scrollableDivRef.current;
      if (
        scrollableDiv &&
        scrollableDiv.scrollTop + scrollableDiv.clientHeight >=
          scrollableDiv.scrollHeight - 100
      ) {
        loadMoreVideos();
      }
    };

    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv?.addEventListener("scroll", handleScroll);
    return () => scrollableDiv?.removeEventListener("scroll", handleScroll);
  }, [loadMoreVideos]);

  return (
    <div className="lg:min-w-[83vw] lg:max-w-[98vw] overflow-y-scroll scrollbar-hidden lg:max-h-[85vh] pt-5">
      {/* Channel Details */}
      <div className="overflow-auto lg:flex text-center lg:text-left">
        <div className="lg:px-20">
          {channelDetails?.snippet?.thumbnails?.medium?.url && (
            <img
              src={channelDetails?.snippet?.thumbnails?.medium?.url}
              alt={`Channel logo of ${channelDetails?.snippet?.title}`}
              className="rounded-full mx-auto"
            />
          )}
        </div>
        <div>
          <h1 className="font-bold lg:text-5xl mb-2 dark:text-[#f1f1f1]">
            {channelDetails?.snippet?.title}
          </h1>
          <div className="flex lg:flex-row flex-col text-center mx-auto">
            <p className="font-semibold dark:text-[#f1f1f1]">
              {channelDetails?.snippet?.customUrl}
            </p>
            <span className="ms-1 font-semibold text-gray-500 dark:text-[#aaa]">
              • {FormatNumber(channelDetails?.statistics?.subscriberCount)}{" "}
              subscribers
            </span>
            <span className="ms-1 font-semibold text-gray-500 dark:text-[#aaa]">
              • {FormatNumber(channelDetails?.statistics?.videoCount)} videos
            </span>
            <span className="ms-1 font-semibold text-gray-500 dark:text-[#aaa]">
              • {FormatNumber(channelDetails?.statistics?.viewCount)} views
            </span>
          </div>
          <div className="lg:w-[60vw] mx-auto lg:ms-0">
            <p className="font-semibold text-gray-500 whitespace-pre-line dark:text-[#aaa]">
              {channelDetails?.snippet?.description}
            </p>
            <div className="px-5 py-2 mt-2 w-[110px] lg:ms-0 mx-auto rounded-full bg-black dark:bg-[#f0f0f0] dark:hover:bg-[rgb(255,255,255,0.8)] hover:bg-[#000000d8] cursor-pointer">
              <p className="text-white  font-semibold dark:text-[#0f0f0f]">
                Subscribe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className=" lg:mx-20 border-b-[1px] border-[#aaa]">
          <button
            className={`dark:text-[#f1f1f1] px-4 py-2 border-2 border-transparent hover:border-b-2 hover:border-b-[#0f0f0f] dark:hover:border-b-[#f1f1f1] ${
              tabs === "1"
                ? "border-b-2 border-b-[#0f0f0f] dark:border-b-[#f1f1f1]"
                : "  "
            }`}
            onClick={() => {
              setTabs("1");
            }}
          >
            Videos
          </button>
          <button
            className={`dark:text-[#f1f1f1] px-4 py-2 ${
              tabs === "2"
                ? "border-b-2 border-b-[#0f0f0f] dark:border-b-[#f1f1f1]"
                : ""
            }`}
            onClick={() => setTabs("2")}
          >
            Playlists
          </button>
        </div>

        {/* Videos Tab */}
        {tabs === "1" && (
          <div
          ref={scrollableDivRef}
          className="grid md:grid-cols-5 grid-cols-2 gap-2 p-5 lg:px-20 overflow-y-auto max-h-[90vh] scrollbar-hidden"
        >
            {videoDetails.map((item, index) => (
              <div className="shadow-md rounded-lg w-full" key={index}>
                <VideoCard
                  info={item}
                  channelLogo={channelDetails?.snippet?.thumbnails?.medium?.url}
                />
              </div>
            ))}
            {isLoadingMore && <p>Loading more videos...</p>}
          </div>
        )}

        {/* Playlists Tab */}
        {tabs === "2" && (
          <div className="grid md:grid-cols-5 grid-cols-2 gap-2 p-5 lg:px-20">
            {playlistDetails.map((item, index) => (
              <div key={index}>
                <PlaylistCard info={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
