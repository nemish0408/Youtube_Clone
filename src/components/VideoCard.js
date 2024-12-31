import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../utils/functions/getTimeAgo";
import { FormatNumber } from "../utils/functions/formatNumber";
import { CHANNEL_LOGO_URL, CHANNEL_LOGO_URL_EXT } from "../utils/constants";
import useFetch from "../utils/functions/fetchURL";

const VideoCard = ({ info }) => {
  const { snippet, statistics, id, contentDetails } = info;
  const [channelLogoUrl, setChannelLogoUrl] = useState("");
  const [channelId, setChannelId] = useState("");
  // console.log(info);

  // const {
  //   data: json,
  //   loading,
  //   error,
  // } = useFetch(`${CHANNEL_LOGO_URL}${channelId}${CHANNEL_LOGO_URL_EXT}`);

  useEffect(() => {
    if (snippet.channelId) {
      setChannelId(snippet.channelId);
    }
  }, [snippet.channelId]);
  const formatDuration = (duration) => {
    // Remove the "PT" prefix
    const time = duration.replace("PT", "");

    // Extract minutes and seconds
    const minutes = time.match(/(\d+)M/)?.[1] || "0";
    const seconds = time.match(/(\d+)S/)?.[1] || "0";

    // Return formatted duration as "MM:SS"
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  // useEffect(() => {
  //   if (json && json.items && json.items[0]) {
  //     const logoUrl = json.items[0].snippet?.thumbnails?.default?.url || "";
  //     setChannelLogoUrl(logoUrl);
  //   }
  // }, [json]);

  return (
    <Link
      to={
        id.videoId
          ? `/videoplayer/${id.videoId}`
          : id.playlistId
          ? `/playlist/${id.playlistId}`
          : id.channelId
          ? `/channel/${id.channelId}`
          : id
          ? `/videoplayer/${id}`
          : ""
      }
      rel="noreferrer"
    >
      <div className="w-full relative overflow-hidden">
        <div className="w-full relative rounded-lg hover:rounded-none hover:scale-[1.01]">
          {contentDetails && (
            <p className="absolute text-white bg-black text-xs px-1 py-0.5 rounded-md right-[3%] top-[87%]">
              {formatDuration(contentDetails.duration)}
            </p>
          )}
          <img
            alt="thumbnail"
            src={snippet.thumbnails.medium.url}
            className="w-full rounded-lg hover:scale-[1.01]"
          ></img>
        </div>
        <div className="px-4 py-2">
          <div className="flex items-top space-x-2">
            {/* {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200" />
            ) : error ? (
              <div className="w-10 h-10 rounded-full bg-gray-300" />
            ) : channelLogoUrl ? (
              <Link to={`/channel/${id.channelId}`}>
                <img
                  className="w-12 h-10 rounded-full object-cover"
                  src={channelLogoUrl}
                  alt="Channel Logo"
                />
              </Link>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300" />
            )} */}
            <div className="w-full">
              <p className="font-semibold text-sm text-gray-800 dark:text-white w-full line-clamp-2">
                {snippet.title}
              </p>
              <div className="flex justify-between text-xs text-gray-500 dark:text-[#f1f1f1] mt-1">
                <p>{snippet.channelTitle}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {statistics &&
                  `${FormatNumber(statistics.viewCount)} views •${" "}`}
                {getTimeAgo(snippet.publishedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
