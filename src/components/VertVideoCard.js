import React from "react";
import { Link } from "react-router-dom"; // Correct import for Link
import { getTimeAgo } from "../utils/functions/getTimeAgo";
import { FormatNumber } from "../utils/functions/formatNumber";

const   VertVideoCard = ({ info }) => {
  const { snippet, statistics, id } = info;

  return (
    <Link to={`/videoplayer/${id}`} rel="noreferrer" className="cursor-pointer">
      <div className="w-full flex flex-col sm:flex-row mt-4  bg-white dark:bg-[#0f0f0f] rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-[rgb(255,255,255,0.2)] transition-shadow overflow-hidden">
        {/* Video Thumbnail */}
        <div className="w-full sm:w-[40%]">
          <img
            alt="thumbnail"
            src={snippet?.thumbnails?.medium?.url}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Video Details */}
        <div className="flex flex-col justify-between p-4 sm:w-2/3">
          {/* Title */}
          <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-[#f1f1f1] line-clamp-2">
            {snippet?.title}
          </p>

          {/* Channel and Metadata */}
          <div className="mt-2">
            <p className="text-gray-500 text-sm dark:text-[#aaa]">{snippet?.channelTitle}</p>
            <p className="text-gray-500 text-sm mt-1 dark:text-[#aaa]">
              {FormatNumber(statistics?.viewCount)} views • {getTimeAgo(snippet?.publishedAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VertVideoCard;
