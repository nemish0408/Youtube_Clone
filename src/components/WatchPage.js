import React, { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import {
CHANNEL_LOGO_URL,
CHANNEL_LOGO_URL_EXT,
VIDEO_DETAILS_URL,
VIDEO_DETAILS_URL_EXT,
} from "../utils/constants";
import { FormatNumber } from "../utils/functions/formatNumber";
import LikeLogo from "../svg/LikeLogo";
import ShareLogo from "../svg/ShareLogo";
import ThreeDots from "../svg/ThreeDots";
import useFetch from "../utils/functions/fetchURL";

const Comments = lazy(() => import("./Comments"));
const VideoDescription = lazy(() => import("./VideoDescription"));

const watchPage = memo(({id}) => {
    // const { id } = useParams();
    // console.log(id);
    
    const [commentCount, setCommentCount] = useState("");
    const [subscriberCount, setSubscriberCount] = useState("");
    const [channelLogoUrl, setChannelLogoUrl] = useState("");
    const videoURL = `${VIDEO_DETAILS_URL}${id}${VIDEO_DETAILS_URL_EXT}`;
    const {
      data: videoData,
      loading: videoLoading,
      error: videoError,
    } = useFetch(videoURL);
    // console.log(videoData);
  
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
    <div>
        <div className="md:lg:col-span-2 w-full">
        <div className="w-full aspect-w-16 aspect-h-9">
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
                  {FormatNumber(details?.statistics?.likeCount)}
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
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {details?.snippet?.liveBroadcastContent !== "live" && (
            <Comments id={id} CommentCount={commentCount} />
          )}
        </Suspense>
        ;
      </div>
    </div>
  )
})

export default watchPage;