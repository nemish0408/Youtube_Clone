import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import {
  CHANNEL_LOGO_URL,
  CHANNEL_LOGO_URL_EXT,
  VIDEO_DETAILS_URL,
  VIDEO_DETAILS_URL_EXT,
} from "../utils/constants";
import Comments from "./Comments";
import VideoDescription from "./VideoDescription";
import { FormatNumber } from "../utils/functions/formatNumber";
import SidePopular from "./SidePopular";
import LikeLogo from "../svg/LikeLogo";
import ShareLogo from "../svg/ShareLogo";
import ThreeDots from "../svg/ThreeDots";
import useFetch from "../utils/functions/fetchURL";

const VideoPlayer = () => {
  const { id } = useParams();
  const [commentCount, setCommentCount] = useState("");
  const [subscriberCount, setSubscriberCount] = useState("");
  const [channelLogoUrl, setChannelLogoUrl] = useState("");
  const videoURL = `${VIDEO_DETAILS_URL}${id}${VIDEO_DETAILS_URL_EXT}`;
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

  if (videoLoading || channelLoading) return <div>Loading...</div>;
  if (videoError || channelError) {
    return (
      <div>
        Error: Unable to load {videoError ? "video" : "channel"} details.
      </div>
    );
  }

  return (
    <div className="grid md:grid-flow-col lg:w-[100vw] md:grid-cols-3 gap-4 lg:p-4 max-w-full">
      <div className="col-span-3 lg:col-span-2">
        <div className="relative w-full aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={details.snippet?.title || "YouTube Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            width="100%"
            height=""
            className="rounded-xl h-56 lg:h-[450px]"
          ></iframe>
        </div>

        <div>
          <h1 className="pt-4 text-xl font-bold">{details.snippet?.title}</h1>
          <div className="flex flex-wrap items-center gap-4 pt-2 justify-center">
            <div className="flex gap-2">
              {channelLogoUrl && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={channelLogoUrl}
                  alt="Channel Logo"
                />
              )}
              <div>
                <span className="font-semibold block">
                  {details.snippet?.channelTitle}
                </span>
                {subscriberCount && (
                  <span className="text-gray-500 text-sm block">
                    {subscriberCount} subscribers
                  </span>
                )}
              </div>
              <div className="grid grid-flow-col gap-2 align-middle">
                <div className="px-5 py-2 ms-2 rounded-full bg-[#dbdbdb] hover:bg-[#9b9b9b] cursor-pointer">
                  <p className="text-black font-semibold">Join</p>
                </div>
                <div className="px-5 py-2 rounded-full bg-black hover:bg-[#000000d8] cursor-pointer">
                  <p className="text-white font-semibold">Subscribe</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <button className="flex text-black p-1 rounded-l-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
                <LikeLogo />
                <span className="inline self-center font-semibold">Like</span>
              </button>
              <button style={{ transform: "rotate(180deg)" }} className="flex text-black rounded-l-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
                <LikeLogo  />
              </button>
              <button className="px-3 py-2 flex ms-2 text-black rounded-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
                <ShareLogo />
                <span className="ms-1.5 font-semibold block">Share</span>
              </button>
              <button className="px-2 py-2 flex ms-2 text-black rounded-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
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
          </div>
        </div>

        <Comments id={id} CommentCount={commentCount} />
      </div>

      <div className="w-full lg:max-w-[38vw]">
        <SidePopular />
      </div>
    </div>
  );
};

export default VideoPlayer;
