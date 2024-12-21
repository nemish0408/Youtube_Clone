import React from "react";

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
  const { snippet, statistics, id } = info;
  return (
    <a
      href={"https://www.youtube.com/watch?v=" + id}
      target="_blank"
      rel="noreferrer"
    >
      <div className="w-full">
        <img
          alt="thumbnail"
          src={snippet.thumbnails.medium.url}
          className="w-full rounded-lg"
        />
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
    </a>
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
