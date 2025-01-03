import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTimeAgo } from "../utils/functions/getTimeAgo";
import { FormatNumber } from "../utils/functions/formatNumber";
import { CHANNEL_LOGO_URL, CHANNEL_LOGO_URL_EXT } from "../utils/constants";
import { CellTowerOutlined } from "@mui/icons-material";

// Cache for channel logos
const channelLogoCache = new Map();

const VideoCard = ({ info, channelLogo }) => {
  const { snippet, statistics, id, contentDetails } = info;
  const [channelLogoUrl, setChannelLogoUrl] = useState("");
  const navigate = useNavigate();

  const fetchChannelLogo = async (channelId) => {
    if (channelLogoCache.has(channelId)) {
      setChannelLogoUrl(channelLogoCache.get(channelId));
      return;
    }

    try {
      const response = await fetch(
        `${CHANNEL_LOGO_URL}${channelId}${CHANNEL_LOGO_URL_EXT}`
      );
      const json = await response.json();
      const logoUrl = json.items?.[0]?.snippet?.thumbnails?.default?.url || "";
      channelLogoCache.set(channelId, logoUrl); // Cache the logo
      setChannelLogoUrl(logoUrl);
    } catch (error) {
      console.error("Error fetching channel logo:", error);
    }
  };

  useEffect(() => {
    if (!channelLogo && snippet.channelId) {
      fetchChannelLogo(snippet.channelId);
    }
  }, [channelLogo, snippet.channelId]);

  const formatDuration = (duration) => {
    const time = duration.replace("PT", "");
    const minutes = time.match(/(\d+)M/)?.[1] || "0";
    const seconds = time.match(/(\d+)S/)?.[1] || "0";
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

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
          {snippet?.liveBroadcastContent === "live" && (
            <p className="absolute text-white bg-red-600 text-xs px-1 rounded-md right-[3%] top-[87%]">
              <CellTowerOutlined style={{ width: 16 }} /> live
            </p>
          )}
          <img
            alt="thumbnail"
            src={snippet.thumbnails.medium.url}
            className="w-full rounded-lg hover:scale-[1.01]"
          />
        </div>
        <div className="px-4 py-2">
          <div className="flex items-top space-x-2">
            {!channelLogo && !channelLogoUrl ? (
              <div className="w-10 h-10 rounded-full bg-gray-200" />
            ) : (
              <button
                onClick={() => navigate(`/channel/${snippet.channelId}`)}
              >
                <img
                  className="w-12 h-10 rounded-full object-cover"
                  src={channelLogo || channelLogoUrl}
                  alt="Channel Logo"
                />
              </button>
            )}
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

export default React.memo(VideoCard);
