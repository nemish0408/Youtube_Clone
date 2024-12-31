import React, { useState } from "react";

const VideoDescription = ({ description, viewCount, publishedAt, tags }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };
  const truncatedDescription = description?.slice(0, 200);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formattedTags = tags
    ?.map((tag) => `#${tag.replace(/\s+/g, "")}`)
    .join(", ");

  return (
    <div className="w-[98vw] lg:w-full mt-4 rounded-lg bg-[#dbdbdb] dark:bg-[rgb(255,255,255,0.2)] p-3">
      <p className="text-gray-700 dark:text-[rgb(255,255,255,1)] font-bold flex gap-3 text-nowrap">
        {viewCount?.toLocaleString()} views{" "}
        <span>{publishedAt ? formatDate(publishedAt) : ""}</span>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis dark:text-[rgb(255,255,255,1)]">
          {formattedTags}
        </span>
      </p>
      <p className="text-gray-700 whitespace-pre-line dark:text-[rgb(255,255,255,1)]">
        {showFullDescription ? description : truncatedDescription}
        {description?.length > 200 && (
          <span
            className="text-blue-500 dark:text-[rgb(255,255,255,1)] cursor-pointer ml-2"
            onClick={toggleDescription}
          >
            {showFullDescription ? "...Show Less" : "...Show More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default VideoDescription;
