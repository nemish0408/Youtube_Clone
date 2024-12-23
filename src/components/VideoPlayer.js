import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CHANNEL_LOGO_URL, CHANNEL_LOGO_URL_EXT } from "../utils/constants";
import Comments from "./Comments";
import { useSelector } from "react-redux";

const VideoPlayer = () => {
  const { id } = useParams();
  const [channelLogourl, setChannelLogourl] = useState("");
  const [details, setDetails] = useState([]);
  
  const data = useSelector((store) => store.searchResult.Results.find((item) => item?.id === id));
  
  const videoDetails = data;
  
  const fetchChannelLogo = async () => {
    try {
      const response = await fetch(
        `${CHANNEL_LOGO_URL}${await videoDetails?.snippet?.channelId}${CHANNEL_LOGO_URL_EXT}`
      );
      const json = await response.json();
      console.log(await json);
      const logoUrl = await json?.items[0]?.snippet?.thumbnails?.default?.url || "";
      setChannelLogourl(logoUrl);
    } catch (error) {
      console.error("Error fetching channel logo:", error);
    }
  };
  useEffect(() => {
    setDetails(data);
    fetchChannelLogo();
  }, []);

  
  return (
    <div className="grid grid-flow-col w-[98vw]">
      <div className="w-[65vw] px-10">
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={details?.snippet?.title || "YouTube Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            width="100%"
            height="450"
            className="rounded-xl"
          ></iframe>
        </div>
        <div>
          <h1 className="pt-4 text-xl font-bold">{details?.snippet?.title}</h1>
          <div className="flex items-center gap-4 pt-2">
            {channelLogourl && (
              <img
                className="w-10 h-10 rounded-full"
                src={channelLogourl}
                alt="Channel Logo"
              />
            )}
            <span className="font-semibold">
              {details?.snippet?.channelTitle}
            </span>
          </div>
        </div>
        <Comments id={id} />
      </div>
      <div className="w-[vw]">{/* Additional content */}</div>
    </div>
  );
};

export default VideoPlayer;
