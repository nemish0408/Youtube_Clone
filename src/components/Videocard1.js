import React, { useEffect, useState } from "react";
import { CHANNEL_LOGO_URL, CHANNEL_LOGO_URL_EXT } from "../utils/constants";
import { Link } from "react-router-dom"; // Corrected to react-router-dom
import { getTimeAgo } from "../utils/functions/getTimeAgo";
import useFetch from "../utils/functions/fetchURL";

const VideoCard1 = ({ info }) => {
  const { id, snippet } = info;
  const idext = id?.videoId || id?.playlistId || id?.channelId;

  const [channelLogoUrl, setChannelLogoUrl] = useState("");
  // const {
  //   data: json,
  //   loading,
  //   error,
  // } = useFetch(
  //   snippet?.channelId
  //     ? `${CHANNEL_LOGO_URL}${snippet.channelId}${CHANNEL_LOGO_URL_EXT}`
  //     : null
  // );

  // useEffect(() => {
  //   if (json && json.items && json.items[0]) {
  //     const logoUrl = json.items[0].snippet?.thumbnails?.default?.url || "";
  //     setChannelLogoUrl(logoUrl);
  //   }
  // }, [json]); // This runs when json changes

  if (!idext) return null; // Return null if no valid id is found

  return (
    <div>
      <Link
        to={
          id.videoId
            ? `/videoplayer/${id.videoId}`
            : id.playlistId
            ? `/playlist/${id.playlistId}`
            : id.channelId
            ? `/channel/${id.channelId}`
            : ""
        }
        rel="noreferrer"
      >
        <div className="w-full lg:flex relative overflow-hidden">
          <div className=" relative rounded-lg hover:rounded-none">
            <img
              alt="thumbnail"
              src={snippet.thumbnails.medium.url}
              className= {id?.channelId ? " hover:rounded-none object-fill mx-auto h-[175px] rounded-full hover:rounded-full" : "rounded-lg hover:rounded-none object-fill h-[175px] "}
            />
          </div>
          <div className="px-4 py-2">
            <div className="flex items-top space-x-2">
              {/* {loading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200" />
              ) : error ? (
                <div className="w-10 h-10 rounded-full bg-gray-300" />
              ) : channelLogoUrl ? (
                <img
                  className="w-10 h-10 rounded-full"
                  src={channelLogoUrl}
                  alt="Channel Logo"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300" />
              )} */}
              <div className="w-full">
                <p className="font-semibold text-lg text-gray-800 w-full line-clamp-2">
                  {snippet.title}
                </p>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <p>{snippet.channelTitle}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500 mt-1">
                    {getTimeAgo(snippet.publishedAt)} •{" "}
                    <span className="font-semibold">
                      {id.videoId ? "Video" : ""}
                      {id.playlistId ? "PlayList" : ""}
                      {id.channelId ? "Channel" : ""}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard1;
