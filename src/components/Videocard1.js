import React, { useEffect, useState } from "react";
import { CHANNEL_LOGO_URL, CHANNEL_LOGO_URL_EXT } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { getTimeAgo } from "../utils/functions/getTimeAgo";

// Cache for channel logos
const channelLogoCache = new Map();

const VideoCard1 = ({ info }) => {
  const { id, snippet } = info;
  const idext = id?.videoId || id?.playlistId || id?.channelId;

  const [channelLogoUrl, setChannelLogoUrl] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChannelLogo = async () => {
      if (!snippet?.channelId) return;

      // Check cache first
      if (channelLogoCache.has(snippet.channelId)) {
        setChannelLogoUrl(channelLogoCache.get(snippet.channelId));
        return;
      }

      try {
        const response = await fetch(
          `${CHANNEL_LOGO_URL}${snippet.channelId}${CHANNEL_LOGO_URL_EXT}`
        );
        const json = await response.json();
        const logoUrl = json?.items?.[0]?.snippet?.thumbnails?.default?.url || "";

        // Save to cache and state
        channelLogoCache.set(snippet.channelId, logoUrl);
        setChannelLogoUrl(logoUrl);
      } catch (error) {
        console.error("Error fetching channel logo:", error);
      }
    };

    fetchChannelLogo();
  }, [snippet?.channelId]);

  if (!idext) return null;

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
          <div className="relative rounded-lg hover:rounded-none">
            <img
              alt="thumbnail"
              src={snippet.thumbnails.medium.url}
              className={
                id?.channelId
                  ? "object-fill mx-auto h-[175px] rounded-full"
                  : "rounded-lg object-fill h-[175px]"
              }
            />
          </div>
          <div className="px-4 py-2">
            <div className="flex items-top space-x-2">
              {channelLogoUrl ? (
                <button onClick={()=>navigate(`/channel/${id.channelId}`)}>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={channelLogoUrl}
                    alt="Channel Logo"
                  />
                </button>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300" />
              )}
              <div className="w-full">
                <p className="font-semibold text-lg text-gray-800 dark:text-[#f1f1f1] w-full line-clamp-2">
                  {snippet.title}
                </p>
                <div className="flex justify-between text-xs text-gray-500 dark:text-[#aaa] mt-1">
                  <p>{snippet.channelTitle}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-gray-500 mt-1 dark:text-[#aaa]">
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
