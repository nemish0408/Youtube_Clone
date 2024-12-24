import React, { useState } from "react";

const VideoDescription = ({ description, viewCount, publishedAt, tags }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const truncatedDescription = description?.slice(0, 200); // Adjust truncation length as needed

  // Format the date with the month in words
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()]; // Get the month name
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Format tags with a '#' prefix
  const formattedTags = tags
  ?.map((tag) => `#${tag.replace(/\s+/g, "")}`)
  .join(", ");

  return (
    <div className="mt-4 rounded-lg bg-[#dbdbdb] p-3">
      <p className="text-gray-700 font-bold flex gap-3 text-nowrap">
        {viewCount?.toLocaleString()} views{" "}
        <span>{publishedAt ? formatDate(publishedAt) : ""}</span>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {formattedTags}
        </span>
      </p>
      <p className="text-gray-700 whitespace-pre-line">
        {showFullDescription ? description : truncatedDescription}
        {description?.length > 200 && (
          <span
            className="text-blue-500 cursor-pointer ml-2"
            onClick={toggleDescription}
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default VideoDescription;
