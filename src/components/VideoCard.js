import React from "react";
import { Link } from "react-router";

const getTimeAgo = (publishedAt) => {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const difference = now - publishedDate;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};

const VideoCard = ({ info }) => {
  const { snippet, statistics, id, contentDetails } = info;
  return (
    <Link
      to={"/videoplayer/"+id}
      rel="noreferrer"
    >
      <div className="w-full relative overflow-hidden">
        <p className="absolute text-white bg-black text-xs px-0.5 rounded-md right-[7px] top-[153px]">{contentDetails.duration.slice(2)}</p>
        <img
          alt="thumbnail"
          src={snippet.thumbnails.medium.url}
          className="w-full rounded-lg hover:rounded-none hover:scale-[1.01]"
        ></img>
        <p className="font-bold px-2 text-ellipsis overflow-hidden whitespace-nowrap mt-2">
          {snippet.title}
        </p>
        <div className="flex justify-between mt-2 px-2">
          <p className="text-gray-500 text-sm">{snippet.channelTitle}</p>
          <p className="text-gray-500 text-sm">{statistics.viewCount} views</p>
        </div>
        <p className="text-sm text-gray-500 px-2 mt-1">
          {getTimeAgo(snippet.publishedAt)}
        </p>
      </div>
    </Link>
  );
};

export const AdVideocard = ({ info }) => {
  return (
    <div className="border-2 border-red-500">
      <VideoCard info={info}></VideoCard>
    </div>
  )
};

export default VideoCard;
