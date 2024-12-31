import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../utils/functions/fetchURL";
import {
  CHANNEL_DETAILS_URL,
  CHANNEL_LOGO_URL,
  PLAYLISTS_API_URL,
  SEARCH_CHANNEL_VIDEOS_URL,
} from "../utils/constants";
import { FormatNumber } from "../utils/functions/formatNumber";
import VideoCard from "./VideoCard";
import PlaylistCard from "./PlaylistCard";

const ChannelPage = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState([]);
  const [channelDetails, setChannelDetails] = useState([]);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [tabs, setTabs] = useState("1");
  const { data: video } = useFetch(SEARCH_CHANNEL_VIDEOS_URL + id);
  const { data: channel } = useFetch(CHANNEL_DETAILS_URL + id);
  const { data: playlists } = useFetch(PLAYLISTS_API_URL + id);
  console.log(channel);
  useEffect(() => {
    setVideoDetails(video?.items);
  }, [video]);
  useEffect(() => {
    setChannelDetails(channel?.items[0]);
  }, [channel]);
  useEffect(() => {
    setPlaylistDetails(playlists?.items);
  }, [playlists]);
  console.log(playlistDetails);

  return (
    <div className="lg:min-w-[83vw] lg:max-w-[98vw] overflow-y-scroll scrollbar-hidden lg:max-h-[85vh] pt-5">
      <div className="overflow-auto lg:flex text-center lg:text-left">
        <div className="lg:px-20">
          {channelDetails?.snippet?.thumbnails?.medium?.url && (
            <img
              src={channelDetails?.snippet?.thumbnails?.medium?.url}
              alt="Logo"
              className="rounded-full mx-auto"
            ></img>
          )}
        </div>
        <div className="">
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
      <div>
        <div className=" lg:mx-20 border-b-[1px] border-[#aaa]">
          <button
            className={`dark:text-[#f1f1f1] px-4 py-2 border-2 border-transparent hover:border-b-2 hover:border-b-[#0f0f0f] dark:hover:border-b-[#f1f1f1] ${
              tabs === "1" ? "border-b-2 border-b-[#0f0f0f] dark:border-b-[#f1f1f1]" : "  "
            }`}
            onClick={() => {
              setTabs("1");
            }}
          >
            Videos
          </button>
          <button
            className={`dark:text-[#f1f1f1] px-4 py-2 border-2 border-transparent hover:border-b-2 hover:border-b-[#0f0f0f] dark:hover:border-b-[#f1f1f1] ${
              tabs === "2" ? "border-b-2 border-b-[#0f0f0f] dark:border-b-[#f1f1f1]" : "  "
            }`}
            onClick={() => {
              setTabs("2");
            }}
          >
            Playlists
          </button>
        </div>
        {tabs === "1" && (
          <div className="grid md:grid-cols-5 grid-cols-2 gap-2 p-5 lg:px-20">
            {videoDetails &&
              videoDetails.map((item, index) => {
                return (
                  <div className="shadow-md rounded-lg w-full" key={index}>
                    <VideoCard info={item} />
                  </div>
                );
              })}
          </div>
        )}
        {tabs === "2" && (
          <div className="grid md:grid-cols-5 grid-cols-2 gap-2 p-5 lg:px-20">
            {playlistDetails &&
              playlistDetails.map((item, index) => {
                return (
                  <div>
                    <PlaylistCard info={item} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
