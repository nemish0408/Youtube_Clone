import React, { useEffect, useState } from "react";
import { CHANNEL_LOGO_URL, CHANNEL_LOGO_URL_EXT } from "../utils/constants";
import { Link } from "react-router";
import { getTimeAgo } from "../utils/getTimeAgo";

const VideoCard1 = ({ info }) => {
  const { id, snippet } = info;
  const idext = id?.videoId || id?.playlistId || id?.channelId
console.log(info);

  const [channelLogoUrl, setChannelLogoUrl] = useState("");

  const fetchChannelLogo = async (channelId) => {
    try {
      const response = await fetch(
        `${CHANNEL_LOGO_URL}${channelId}${CHANNEL_LOGO_URL_EXT}`
      );
      const json = await response.json();
      const logoUrl = json?.items[0]?.snippet?.thumbnails?.default?.url || "";
      setChannelLogoUrl(logoUrl);
    } catch (error) {
      console.error("Error fetching channel logo:", error);
    }
  };

  useEffect(() => {
    if (snippet?.channelId) {
      fetchChannelLogo(snippet.channelId);
    }
  }, [snippet?.channelId]);
if(idext)
  {return (
    <div>
    <Link to={id?.videoId ? `/videoplayer/${id.videoId}` : ''} rel="noreferrer">

        <div className="w-full relative overflow-hidden">
          <div className="w-full relative rounded-lg hover:rounded-none hover:scale-[1.01]">
            <img
              alt="thumbnail"
              src={snippet.thumbnails.medium.url}
              className="w-full rounded-lg hover:rounded-none hover:scale-[1.01]"
            ></img>
          </div>
          <div className="px-4 py-2">
            <div className="flex items-top space-x-2">
              {channelLogoUrl && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={channelLogoUrl}
                  alt="Channel Logo"
                />
              )}
              <div className="w-full">
                <p className="font-semibold text-sm text-gray-800 w-full line-clamp-2">
                  {snippet.title}
                </p>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <p>{snippet.channelTitle}  </p>
                </div>
                <div className="flex justify-between">
                  {/* <p className="text-xs text-gray-500 mt-1">
                    {FormatNumber(statistics.viewCount)} views
                  </p> */}
                  <p className="text-xs text-gray-500 mt-1">
                    {getTimeAgo(snippet.publishedAt)} <span className="font-semibold">{id.videoId?"Video":""}{id.playlistId?"PlayList":""}{id.channelId?"Channel":""}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
else{
return null
}
}
export default VideoCard1;
