import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom"; // For capturing video/playlist ID
import {
  CHANNEL_LOGO_URL,
  CHANNEL_LOGO_URL_EXT,
  PLAYLIST_ITEMS_URL,
  PLAYLIST_ITEMS_URL_EXT,
  VIDEO_DETAILS_URL,
  VIDEO_DETAILS_URL_EXT,
} from "../utils/constants"; // Replace with actual constants
import ThreedotsRotate from "../svg/ThreedotsRotate";
import Loop from "../svg/Loop";
import Suffle from "../svg/Suffle";
import LikeLogo from "../svg/LikeLogo";
import ShareLogo from "../svg/ShareLogo";
import ThreeDots from "../svg/ThreeDots";
import VideoDescription from "./VideoDescription";
import useFetch from "../utils/functions/fetchURL";
import { FormatNumber } from "../utils/functions/formatNumber";
import Comments from "./Comments";
import SidePopular from "./SidePopular";

const PlayList = () => {
  const { id, videoId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showComments, setShowComments] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentCount, setCommentCount] = useState("");
  const [subscriberCount, setSubscriberCount] = useState("");
  const [channelLogoUrl, setChannelLogoUrl] = useState("");

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

  const videoURL = `${VIDEO_DETAILS_URL}${selectedVideo?.snippet?.resourceId?.videoId}${VIDEO_DETAILS_URL_EXT}`;
  const {
    data: videoData,
    loading: videoLoading,
    error: videoError,
  } = useFetch(videoURL);

  const [channelURL, setChannelURL] = useState("");
  const {
    data: channelData,
    loading: channelLoading,
    error: channelError,
  } = useFetch(channelURL);

  useEffect(() => {
    if (videoData && videoData.items?.length > 0) {
      const videoDetails = videoData.items[0];
      setCommentCount(
        FormatNumber(videoDetails.statistics?.commentCount || "0")
      );
      if (videoDetails.snippet?.channelId) {
        setChannelURL(
          `${CHANNEL_LOGO_URL}${videoDetails.snippet.channelId}${CHANNEL_LOGO_URL_EXT}`
        );
      }
    }
  }, [videoData]);

  useEffect(() => {
    if (channelData && channelData.items?.length > 0) {
      const channelDetails = channelData.items[0];
      setSubscriberCount(
        FormatNumber(channelDetails.statistics?.subscriberCount || "0")
      );
      setChannelLogoUrl(channelDetails.snippet?.thumbnails?.default?.url || "");
    }
  }, [channelData]);

  const details = useMemo(
    () => videoData?.items?.[0] || { snippet: {}, statistics: {} },
    [videoData]
  );
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid md:grid-flow-col md:grid-cols-3 gap-4 lg:p-4 pt-0 lg:max-w-[98vw] max-w-full">
      {/* Video Player Section */}
      <div className="lg:col-span-2 ">
        <div className="w-full aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}?autoplay=1`}
            title={selectedVideo.snippet.title || "YouTube Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            width="100%"
            height=""
            className="rounded-xl h-56 lg:h-[450px]"
          ></iframe>
        </div>
        <div>
          <h1 className="pt-4 text-xl font-bold dark:text-[#f1f1f1]">
            {details.snippet?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 pt-2  lg:justify-between justify-center">
            <div className="flex gap-2">
              <Link to={`/channel/${videoData?.items[0]?.snippet.channelId}`}>
                {channelLogoUrl && (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={channelLogoUrl}
                    alt="Channel Logo"
                  />
                )}
              </Link>
              <div>
                <span className="font-semibold block dark:text-[#f1f1f1]">
                  {details.snippet?.channelTitle}
                </span>
                {subscriberCount && (
                  <span className="text-gray-500 dark:text-[#aaa] text-sm block">
                    {subscriberCount} subscribers
                  </span>
                )}
              </div>
              <div className="grid grid-flow-col gap-2 align-middle">
                <div className="px-5 py-2 ms-2 rounded-full bg-[#dbdbdb] dark:bg-[rgb(255,255,255,0.1)] dark:hover:bg-[rgb(255,255,255,0.2)] hover:bg-[#9b9b9b] cursor-pointer">
                  <p className="text-black dark:text-[#f1f1f1] font-semibold">
                    Join
                  </p>
                </div>
                <div className="px-5 py-2 rounded-full bg-black dark:bg-[#fff] dark:hover:bg-[#d9d9d9] hover:bg-[#000000d8] cursor-pointer">
                  <p className="text-white font-semibold dark:text-black ">
                    Subscribe
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <button className="flex text-black p-1 rounded-l-full bg-[#dbdbdb] dark:bg-[rgb(255,255,255,0.1)] dark:hover:bg-[rgb(255,255,255,0.2)] hover:bg-[#9b9b9b]">
                <LikeLogo />
                <span className="inline self-center font-semibold dark:text-[#f1f1f1]">
                  {FormatNumber(details?.statistics?.viewCount)}
                </span>
              </button>
              <button
                style={{ transform: "rotate(180deg)" }}
                className="flex text-black rounded-l-full bg-[#dbdbdb] dark:bg-[rgb(255,255,255,0.1)] dark:hover:bg-[rgb(255,255,255,0.2)] hover:bg-[#9b9b9b]"
              >
                <LikeLogo />
              </button>
              <button className="px-3 py-2 flex ms-2 text-black rounded-full bg-[#dbdbdb] dark:bg-[rgb(255,255,255,0.1)] dark:hover:bg-[rgb(255,255,255,0.2)] hover:bg-[#9b9b9b]">
                <ShareLogo />
                <span className="ms-1.5 pt-1 font-semibold block dark:text-[#f1f1f1]">
                  Share
                </span>
              </button>
              <button className="px-2 py-2 flex ms-2 text-black rounded-full bg-[#dbdbdb] dark:bg-[rgb(255,255,255,0.1)] dark:hover:bg-[rgb(255,255,255,0.2)] hover:bg-[#9b9b9b]">
                <ThreeDots />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <VideoDescription
              description={details?.snippet?.description}
              viewCount={FormatNumber(details?.statistics?.viewCount || 0)}
              publishedAt={details?.snippet?.publishedAt}
              tags={details?.snippet?.tags}
            />
            {!showComments&&<div className="w-[100vw] lg:hidden text-center pt-3">
              <button className="text-white font-semibold dark:text-black px-5 py-2 rounded-full bg-black dark:bg-[#fff] dark:hover:bg-[#d9d9d9] hover:bg-[#000000d8] cursor-pointer lg:hidden" onClick={()=>{setShowComments(!showComments)}}>
                Show Comments
              </button>
            </div>}
            {showComments&&<Comments
              id={selectedVideo.snippet.resourceId.videoId}
              CommentCount={commentCount}
            />}
            <div className="hidden lg:block">
            <Comments
              id={selectedVideo.snippet.resourceId.videoId}
              CommentCount={commentCount}
            />
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Section */}
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
          <ul className="space-y-4 bg-gray-100 dark:bg-[#0f0f0f] overflow-y-scroll h-[50vh] dark:bg">
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
    </div>
  );
};

export default PlayList;
