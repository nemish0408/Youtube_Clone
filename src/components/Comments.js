import React, { useEffect, useState } from "react";
import {
  CHANNEL_LOGO_URL,
  CHANNEL_LOGO_URL_EXT,
  COMMENT_API_URL,
  COMMENT_API_URL_EXT,
} from "../utils/constants";
import { getTimeAgo } from "../utils/getTimeAgo";
import { FormatNumber } from "../utils/formatNumber";

const Comments = ({ id, CommentCount }) => {
  const [commentCount, setCommentCount] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [channelLogos, setChannelLogos] = useState({}); // Store channel logos by channelId
  const [loadingLogos, setLoadingLogos] = useState(true); // Loading state for logos

  const url = COMMENT_API_URL + id + COMMENT_API_URL_EXT;

  // Fetch comments data
  const fetchComments = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setCommentData(json?.items);
      // console.log(json.items);
      setCommentCount(FormatNumber(CommentCount)); // Set comment count if available
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Fetch channel logo (if needed)
  const fetchChannelLogo = async (channelId) => {
    if (channelLogos[channelId]) return; // Skip if logo is already fetched

    try {
      const response = await fetch(
        `${CHANNEL_LOGO_URL}${channelId}${CHANNEL_LOGO_URL_EXT}`
      );
      const json = await response.json();
      // console.log(json);

      const logoUrl = json?.items[0]?.snippet?.thumbnails?.default?.url || "";

      // Save the logo in the state
      setChannelLogos((prevLogos) => ({
        ...prevLogos,
        [channelId]: logoUrl,
      }));
    } catch (error) {
      console.error("Error fetching channel logo:", error);
    }
  };

  // Fetch channel logos for each comment's channelId
  useEffect(() => {
    if (commentData.length > 0) {
      setLoadingLogos(true); // Start loading logos
      commentData.forEach((comment) => {
        const channelId =
          comment?.snippet?.topLevelComment?.snippet?.authorChannelId?.value;
        if (channelId) {
          fetchChannelLogo(channelId);
        }
      });
    }
  }, [commentData]); // Re-run when commentData changes

  // Check if all logos have been fetched
  useEffect(() => {
    if (commentData.length > 0) {
      const allLogosFetched = commentData.every((comment) => {
        const channelId =
          comment?.snippet?.topLevelComment?.snippet?.authorChannelId?.value;
        return channelId && channelLogos[channelId];
      });

      if (allLogosFetched) {
        setLoadingLogos(false); // Set loading to false when all logos are fetched
      }
    }
  }, [commentData, channelLogos]); // Run when commentData or channelLogos change

  useEffect(() => {
    fetchComments(); // Fetch comments on component mount
  }, [id]); // Dependency on `id`, so it fetches whenever `id` changes

  return (
    <div className="mt-4">
      <div className="flex py-2">
        <h1 className="text-xl font-bold">{commentCount} Comments</h1>
        <div className="ms-8 flex gap-2 cursor-pointer py-1 px-2 rounded-md hover:bg-[#9b9b9b]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            aria-hidden="true"
            style={{
              pointerEvents: "none",
              display: "inherit",
              width: "100%",
              height: "100%",
            }}
          >
            <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"></path>
          </svg>
          <span className="font-semibold text-nowrap text-lg">Sort by</span>
        </div>
      </div>
      <div>
        {commentData.length > 0 ? (
          commentData.map((comment, index) => {
            const channelId =
              comment?.snippet?.topLevelComment?.snippet?.authorChannelId
                ?.value;
            const textDisplay =
              comment?.snippet?.topLevelComment?.snippet?.textDisplay;
            const likeCount =
              comment?.snippet?.topLevelComment?.snippet?.likeCount;
            const authorDisplayName =
              comment?.snippet?.topLevelComment?.snippet?.authorDisplayName;
            const publishedAt =
              comment?.snippet?.topLevelComment?.snippet?.publishedAt;
            const totalReplyCount =
              comment?.snippet?.topLevelComment?.totalReplyCount;

            // Get the channel logo for the comment
            const logoUrl = channelId ? channelLogos[channelId] : "";

            return (
              <div key={index} className="flex py-2 gap-4">
                <div className="min-w-10">
                  {/* Display Channel Logo if available */}
                  {loadingLogos ? (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  ) : (
                    logoUrl && (
                      <img
                        className="w-10 h-10 rounded-full block object-cover"
                        src={logoUrl}
                        alt="Channel Logo"
                      />
                    )
                  )}
                </div>
                <div>
                  <div className="flex gap-2 align-middle ">
                    <p className="font-semibold text-md mb-1">
                      {authorDisplayName}
                    </p>
                    <p className="font-light text-sm mb-0.5 pt-1 text-nowrap">
                      {getTimeAgo(publishedAt)}
                    </p>
                  </div>
                  <p className="text-sm mb-1 whitespace-pre-line">
                    {textDisplay}
                  </p>
                  <div>
                    <div className="flex">
                      <button className=" flex text-black rounded-full hover:bg-[#dbdbdb]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="80 80 110 110"
                          width="24"
                          height="24"
                          className="inline-block ps-2.5 pe-1 py-2 "
                          preserveAspectRatio="xMidYMid meet"
                          style={{
                            width: "100%",
                            height: "100%",
                            transform: "translate3d(0px, 0px, 0px)",
                          }}
                        >
                          <defs>
                            <clipPath id="clip-path-1">
                              <rect width="270" height="270" x="0" y="0"></rect>
                            </clipPath>
                            <clipPath id="clip-path-2">
                              <path d="M0,0 L480,0 L480,480 L0,480z"></path>
                            </clipPath>
                          </defs>
                          <g clipPath="url(#clip-path-1)">
                            <g
                              clipPath="url(#clip-path-2)"
                              transform="matrix(0.435,0,0,0.435,28.475,26.725)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g
                                transform="matrix(10,0,0,10,120,120)"
                                opacity="1"
                                style={{ display: "block" }}
                              >
                                <path
                                  fill="black"
                                  fillOpacity="1"
                                  d="M8,11 C8,11 3,11 3,11 C3,11 3,21 3,21 C3,21 8,21 8,21 C8,21 8,11 8,11z 
              M18.770000457763672,11 C18.770000457763672,11 14.539999961853027,11 14.539999961853027,11 
              C14.539999961853027,11 16.059999465942383,6.059999942779541 16.059999465942383,6.059999942779541 
              C16.3799991607666,5.03000020980835 15.539999961853027,4 14.380000114440918,4 
              C13.800000190734863,4 13.239999771118164,4.239999771118164 12.859999656677246,4.650000095367432 
              C12.859999656677246,4.650000095367432 7,11 7,11 C7,11 7,21 7,21 C7,21 17.43000030517578,21 17.43000030517578,21 
              C18.489999771118164,21 19.40999984741211,20.329999923706055 19.6200008392334,19.389999389648438 
              C19.6200008392334,19.389999389648438 20.959999084472656,13.390000343322754 20.959999084472656,13.390000343322754 
              C21.229999542236328,12.149999618530273 20.18000030517578,11 18.770000457763672,11z 
              M7,20 C7,20 4,20 4,20 C4,20 4,12 4,12 C4,12 7,12 7,12 C7,12 7,20 7,20z 
              M19.979999542236328,13.170000076293945 C19.979999542236328,13.170000076293945 
              18.639999389648438,19.170000076293945 18.639999389648438,19.170000076293945 
              C18.540000915527344,19.649999618530273 18.030000686645508,20 17.43000030517578,20 
              C17.43000030517578,20 8,20 8,20 C8,20 8,11.390000343322754 8,11.390000343322754 
              C8,11.390000343322754 13.600000381469727,5.329999923706055 13.600000381469727,5.329999923706055 
              C13.789999961853027,5.119999885559082 14.079999923706055,5 14.380000114440918,5 
              C14.640000343322754,5 14.880000114440918,5.110000133514404 15.010000228881836,5.300000190734863 
              C15.079999923706055,5.400000095367432 15.15999984741211,5.559999942779541 15.100000381469727,5.769999980926514 
              C15.100000381469727,5.769999980926514 13.579999923706055,10.710000038146973 13.579999923706055,10.710000038146973 
              C13.579999923706055,10.710000038146973 13.180000305175781,12 13.180000305175781,12 
              C13.180000305175781,12 14.529999732971191,12 14.529999732971191,12 
              C14.529999732971191,12 18.760000228881836,12 18.760000228881836,12 
              C19.170000076293945,12 19.559999465942383,12.170000076293945 19.790000915527344,12.460000038146973 
              C19.920000076293945,12.609999656677246 20.049999237060547,12.859999656677246 19.979999542236328,13.170000076293945z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </button>
                      <span className="inline self-center text-sm">
                        {likeCount}
                      </span>

                      <button className=" flex text-black rounded-full hover:bg-[#dbdbdb]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="80 80 110 110"
                          width="24"
                          height="24"
                          className="inline-block px-2.5 py-2 "
                          preserveAspectRatio="xMidYMid meet"
                          style={{
                            width: "100%",
                            height: "100%",
                            transform: "rotate(180deg)",
                          }}
                        >
                          <defs>
                            <clipPath id="clip-path-1">
                              <rect width="270" height="270" x="0" y="0"></rect>
                            </clipPath>
                            <clipPath id="clip-path-2">
                              <path d="M0,0 L480,0 L480,480 L0,480z"></path>
                            </clipPath>
                          </defs>
                          <g clipPath="url(#clip-path-1)">
                            <g
                              clipPath="url(#clip-path-2)"
                              transform="matrix(0.435,0,0,0.435,28.475,26.725)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g
                                transform="matrix(10,0,0,10,120,120)"
                                opacity="1"
                                style={{ display: "block" }}
                              >
                                <path
                                  fill="black"
                                  fillOpacity="1"
                                  d="M8,11 C8,11 3,11 3,11 C3,11 3,21 3,21 C3,21 8,21 8,21 C8,21 8,11 8,11z 
              M18.770000457763672,11 C18.770000457763672,11 14.539999961853027,11 14.539999961853027,11 
              C14.539999961853027,11 16.059999465942383,6.059999942779541 16.059999465942383,6.059999942779541 
              C16.3799991607666,5.03000020980835 15.539999961853027,4 14.380000114440918,4 
              C13.800000190734863,4 13.239999771118164,4.239999771118164 12.859999656677246,4.650000095367432 
              C12.859999656677246,4.650000095367432 7,11 7,11 C7,11 7,21 7,21 C7,21 17.43000030517578,21 17.43000030517578,21 
              C18.489999771118164,21 19.40999984741211,20.329999923706055 19.6200008392334,19.389999389648438 
              C19.6200008392334,19.389999389648438 20.959999084472656,13.390000343322754 20.959999084472656,13.390000343322754 
              C21.229999542236328,12.149999618530273 20.18000030517578,11 18.770000457763672,11z 
              M7,20 C7,20 4,20 4,20 C4,20 4,12 4,12 C4,12 7,12 7,12 C7,12 7,20 7,20z 
              M19.979999542236328,13.170000076293945 C19.979999542236328,13.170000076293945 
              18.639999389648438,19.170000076293945 18.639999389648438,19.170000076293945 
              C18.540000915527344,19.649999618530273 18.030000686645508,20 17.43000030517578,20 
              C17.43000030517578,20 8,20 8,20 C8,20 8,11.390000343322754 8,11.390000343322754 
              C8,11.390000343322754 13.600000381469727,5.329999923706055 13.600000381469727,5.329999923706055 
              C13.789999961853027,5.119999885559082 14.079999923706055,5 14.380000114440918,5 
              C14.640000343322754,5 14.880000114440918,5.110000133514404 15.010000228881836,5.300000190734863 
              C15.079999923706055,5.400000095367432 15.15999984741211,5.559999942779541 15.100000381469727,5.769999980926514 
              C15.100000381469727,5.769999980926514 13.579999923706055,10.710000038146973 13.579999923706055,10.710000038146973 
              C13.579999923706055,10.710000038146973 13.180000305175781,12 13.180000305175781,12 
              C13.180000305175781,12 14.529999732971191,12 14.529999732971191,12 
              C14.529999732971191,12 18.760000228881836,12 18.760000228881836,12 
              C19.170000076293945,12 19.559999465942383,12.170000076293945 19.790000915527344,12.460000038146973 
              C19.920000076293945,12.609999656677246 20.049999237060547,12.859999656677246 19.979999542236328,13.170000076293945z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </button>
                      <button className="px-3 py-2 flex ms-2 text-black rounded-full hover:bg-[#dbdbdb]">
                        <span className="ms-1.5 text-md font-medium">
                          Reply
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button className="px-2 py-2 flex ms-2 w-12 text-black rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      fill="black"
                      focusable="false"
                      aria-hidden="true"
                      style={{
                        pointerEvents: "none",
                        display: "inherit",
                        width: "100%",
                        height: "100%",
                        transform: "rotate(90deg)",
                      }}
                    >
                      <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
