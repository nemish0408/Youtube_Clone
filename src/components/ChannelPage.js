import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../utils/functions/fetchURL";
import {
  CHANNEL_DETAILS_URL,
  CHANNEL_LOGO_URL,
  SEARCH_CHANNEL_VIDEOS_URL,
} from "../utils/constants";
import { FormatNumber } from "../utils/functions/formatNumber";
import VideoCard from "./VideoCard";

const ChannelPage = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState([]);
  const [channelDetails, setChannelDetails] = useState([]);
  const { data: video } = useFetch(SEARCH_CHANNEL_VIDEOS_URL + id);
  const { data: channel } = useFetch(CHANNEL_DETAILS_URL + id);
  console.log(channel);
  useEffect(() => {
    setVideoDetails(video?.items);
  }, [video]);
  useEffect(() => {
    setChannelDetails(channel?.items[0]);
  }, [channel]);
  return (
    <div className="min-w-[83vw] max-w-[98vw] overflow-y-scroll scrollbar-hidden max-h-[85vh] pt-5">
      <div className="overflow-auto flex">
          <div className="lg:px-20">
            <img
              src={channelDetails?.snippet?.thumbnails?.medium?.url}
              alt="Logo"
              className="rounded-full"
            ></img>
          </div>
          <div className="">
            <h1 className="font-bold lg:text-5xl mb-2">
              {channelDetails?.snippet?.title}
            </h1>
            <div className="flex">
              <p className="font-semibold">
                {channelDetails?.snippet?.customUrl}
              </p>
              <span className="ms-1 font-semibold text-gray-500">
                • {FormatNumber(channelDetails?.statistics?.subscriberCount)}{" "}
                subscribers
              </span>
              <span className="ms-1 font-semibold text-gray-500">
                • {FormatNumber(channelDetails?.statistics?.videoCount)} videos
              </span>
              <span className="ms-1 font-semibold text-gray-500">
                • {FormatNumber(channelDetails?.statistics?.viewCount)} views
              </span>
            </div>
            <div className="w-[60vw]">
              <p className="font-semibold text-gray-500 whitespace-pre-line">
                {channelDetails?.snippet?.description}
              </p>
              <div className="px-5 py-2 mt-2 w-[110px] rounded-full bg-black hover:bg-[#000000d8] cursor-pointer">
                <p className="text-white font-semibold">Subscribe</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-5 p-5 px-20">
          {videoDetails &&
            videoDetails.map((item, index) => {
              return (
                <div className="shadow-md rounded-lg w-full" key={index}>
                  <VideoCard info={item} />
                </div>
              );
            })}
        </div>
      </div>
  );
};

export default ChannelPage;
