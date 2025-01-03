import React, { memo, useEffect, useState } from "react";
import {
  CHANNEL_LOGO_URL,
  CHANNEL_LOGO_URL_EXT,
  COMMENT_API_URL,
  COMMENT_API_URL_EXT,
} from "../utils/constants";
import { getTimeAgo } from "../utils/functions/getTimeAgo";
import ThreedotsRotate from "../svg/ThreedotsRotate";
import ShortLogo from "../svg/ShortLogo";
import LikeLogo from "../svg/LikeLogo";
import { Virtuoso } from "react-virtuoso";

// Cache for channel logos
const channelLogoCache = new Map();

const Comments = memo(({ id, CommentCount }) => {
  const [commentData, setCommentData] = useState([]);
  const [channelLogos, setChannelLogos] = useState({});

  const url = COMMENT_API_URL + id + COMMENT_API_URL_EXT;

  const fetchComments = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setCommentData(json?.items || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchChannelLogo = async (channelId) => {
    if (channelLogoCache.has(channelId)) {
      setChannelLogos((prevLogos) => ({
        ...prevLogos,
        [channelId]: channelLogoCache.get(channelId),
      }));
      return;
    }

    try {
      const response = await fetch(
        `${CHANNEL_LOGO_URL}${channelId}${CHANNEL_LOGO_URL_EXT}`
      );
      const json = await response.json();
      const logoUrl = json?.items?.[0]?.snippet?.thumbnails?.default?.url || "";

      // Save to cache and state
      channelLogoCache.set(channelId, logoUrl);
      setChannelLogos((prevLogos) => ({
        ...prevLogos,
        [channelId]: logoUrl,
      }));
    } catch (error) {
      console.error("Error fetching channel logo:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div className="mt-4 w-[98vw] ps-2 lg:px-0 lg:w-auto">
      <div className="flex py-2">
        <h1 className="text-xl font-bold dark:text-[#f1f1f1]">
          {CommentCount} Comments
        </h1>
        <div className="ms-8 flex gap-2 cursor-pointer py-1 px-2 rounded-md hover:bg-[#9b9b9b] dark:hover:bg-transparent">
          <ShortLogo />
          <span className="font-semibold text-nowrap text-lg dark:text-[#f1f1f1]">
            Sort by
          </span>
        </div>
      </div>
      <div>
        <Virtuoso
          totalCount={commentData.length}
          className="scrollbar-hidden min-h-[100vh] lg:min-h-[75vh]"
          itemContent={(index) => {
            const item = commentData[index];
            const channelId =
              item?.snippet?.topLevelComment?.snippet?.authorChannelId?.value;
            const textDisplay =
              item?.snippet?.topLevelComment?.snippet?.textDisplay;
            const likeCount =
              item?.snippet?.topLevelComment?.snippet?.likeCount;
            const authorDisplayName =
              item?.snippet?.topLevelComment?.snippet?.authorDisplayName;
            const publishedAt =
              item?.snippet?.topLevelComment?.snippet?.publishedAt;
            const totalReplyCount =
              item?.snippet?.topLevelComment?.totalReplyCount;

            if (channelId && !channelLogos[channelId]) {
              fetchChannelLogo(channelId);
            }

            const logoUrl = channelId ? channelLogos[channelId] : "";

            return (
              <div key={index} className="flex gap-4">
                <div className="min-w-10">
                  {!logoUrl ? (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  ) : (
                    <img
                      className="w-10 h-10 rounded-full block object-cover"
                      src={logoUrl}
                      alt="Channel Logo"
                    />
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap lg:gap-2 align-middle">
                    <p className="font-semibold text-md mb-1 dark:text-[#f1f1f1]">
                      {authorDisplayName}
                    </p>
                    <p className="font-light text-sm mb-0.5 pt-1 text-nowrap dark:text-[#aaa] cursor-pointer dark:hover:text-[#f1f1f1]">
                      {getTimeAgo(publishedAt)}
                    </p>
                  </div>
                  <p className="text-sm mb-1 whitespace-pre-line overflow-auto w-[49vw] dark:text-[#f1f1f1]">
                    {textDisplay}
                  </p>
                  <div>
                    <div className="flex">
                      <button className="flex text-black rounded-full hover:bg-[#dbdbdb] dark:hover:bg-[rgba(255,255,255,0.2)]">
                        <LikeLogo />
                      </button>
                      <span className="inline self-center text-sm dark:text-[#aaa]">
                        {likeCount}
                      </span>
                      <button
                        style={{ transform: "rotate(180deg)" }}
                        className="flex text-black rounded-full hover:bg-[#dbdbdb] dark:hover:bg-[rgba(255,255,255,0.2)]"
                      >
                        <LikeLogo />
                      </button>
                      <button className="px-3 py-2 flex ms-2 text-black rounded-full hover:bg-[#dbdbdb] dark:hover:bg-[rgb(255,255,255,0.2)]">
                        <span className="ms-1.5 text-sm font-medium dark:text-[#fff]">
                          {totalReplyCount
                            ? `${totalReplyCount} replies`
                            : "Reply"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button className="px-2 py-2 flex ms-2 w-12 h-10 lg:h-12 text-black rounded-full">
                    <ThreedotsRotate />
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
});

export default Comments;
