import React from "react";
import { Link, useNavigate } from "react-router";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { PlaylistPlay } from "@mui/icons-material";

const PlaylistCard = ({ info }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Link to={"/playlist/" + info?.id} rel="noreferrer">
        <div className="w-full relative overflow-hidden">
          <div className="w-full rounded-lg pt-4">
            <div className="relative">
              <div className="absolute opacity-50 left-3 -z-0 rounded-xl h-full bg-[#8c7f75] w-[calc(100%-24px)] top-[-8px]"></div>
              <div className="absolute left-1 rounded-xl -z-0 h-full border-t-[1px] dark:border-[#0f0f0f] bg-[#8c7f75] w-[calc(100%-8px)] top-[-4px]"></div>

              <img
                alt="thumbnail"
                src={info?.snippet?.thumbnails.medium.url}
                className="w-full border-t-[1px] dark:border-[#0f0f0f] rounded-lg "
              ></img>
              <img
                alt="thumbnail"
                src={info?.snippet?.thumbnails.medium.url}
                className="w-full absolute top-0 border-t-[1px] dark:border-[#0f0f0f] rounded-lg "
              ></img>
              <p className="absolute text-[#f1f1f1] font-bold bg-[rgb(0,0,0,0.6)] text-xs px-0.5 -py-0.5 rounded-md right-[3%] bottom-[3%]">
                <PlaylistPlay className="" />
                {info?.contentDetails?.itemCount} videos
              </p>
              <div className="absolute rounded-lg flex justify-center bg-[rgb(0,0,0,0.6)] opacity-0 hover:opacity-100 top-0 w-full text-center h-full align-middle">
                <p className="my-auto text-[#f1f1f1]">
                  <PlayArrowIcon className="mb-1" />
                  Play all
                </p>
              </div>
            </div>
          </div>
          <div className=" py-2">
            <div className="flex items-top space-x-2">
              <div className="w-full">
                <p className="font-semibold text-sm text-gray-800 dark:text-[#f1f1f1] w-full line-clamp-2">
                  {info?.snippet?.title}
                </p>
                <p className="font-semibold text-xs text-gray-500 hover:text-gray-800 dark:text-[#aaa] w-full line-clamp-2 dark:hover:text-[#f1f1f1]">
                  <button onClick={() => navigate(`/playlist/${info?.id}`)}>
                    View full playlist
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCard;
