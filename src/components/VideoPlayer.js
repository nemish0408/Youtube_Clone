import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CHANNEL_LOGO_URL, CHANNEL_LOGO_URL_EXT } from "../utils/constants";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import VideoDescription from "./VideoDescription";
import { FormatNumber } from "../utils/formatNumber";
import SidePopular from "./SidePopular";

const VideoPlayer = () => {
  const { id } = useParams();
  const [channelLogourl, setChannelLogourl] = useState("");
  const [details, setDetails] = useState(null); // Default to null for clarity
  const [subscriberCount, setSubscriberCount] = useState(""); // For formatted sub count

  // Extracting video details from Redux store
  const videoDetails = useSelector((store) =>
    store.searchResult.FilteredResults.find((item) => item?.id === id)
  );

  useEffect(() => {
    let fetchedDetails = videoDetails;

    // If not found in Redux, retrieve from localStorage
    if (!fetchedDetails) {
      const localStorageData = JSON.parse(
        localStorage.getItem("FilteredResults") || "[]"
      );
      fetchedDetails = localStorageData.find((item) => item?.id === id);
    }

    setDetails(fetchedDetails);

    if (fetchedDetails?.snippet?.channelId) {
      fetchChannelLogo(fetchedDetails.snippet.channelId);
    }
  }, [videoDetails, id]);
// console.log(details?.statistics?.commentCount);

  const fetchChannelLogo = async (channelId) => {
    try {
      const response = await fetch(
        `${CHANNEL_LOGO_URL}${channelId}${CHANNEL_LOGO_URL_EXT}`
      );
      const json = await response.json();

      const subCount = json.items[0]?.statistics?.subscriberCount || 0;
      setSubscriberCount(FormatNumber(subCount));

      const logoUrl = json?.items[0]?.snippet?.thumbnails?.default?.url || "";
      setChannelLogourl(logoUrl);
    } catch (error) {
      console.error("Error fetching channel logo:", error);
    }
  };

  if (!details) {
    return <div>Loading...</div>; // Fallback UI while data is loading
  }

  return (
    <div className="grid grid-flow-col w-[98vw]">
      <div className="w-[60vw] px-10">
        {/* Video Player */}
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={details.snippet?.title || "YouTube Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            width="100%"
            height="450"
            className="rounded-xl"
          ></iframe>
        </div>

        {/* Video Details */}
        <div className="">
          <h1 className="pt-4 text-xl font-bold">{details.snippet?.title}</h1>
          <div className="flex items-center gap-4 pt-2 justify-between">
            <div className="flex gap-2">
              {channelLogourl && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={channelLogourl}
                  alt="Channel Logo"
                />
              )}
              <div>
                <span className="font-semibold block">
                  {details.snippet?.channelTitle}
                </span>
                {subscriberCount && (
                  <span className="text-gray-500 text-sm block">
                    {subscriberCount} subscribers
                  </span>
                )}
              </div>
              <div className="grid grid-flow-col gap-2 align-middle">
                <div className="px-5 py-2 ms-2 rounded-full bg-[#dbdbdb] hover:bg-[#9b9b9b] cursor-pointer">
                  <p className="text-black font-semibold">Join</p>
                </div>
                <div className="px-5 py-2  rounded-full bg-black hover:bg-[#000000d8] cursor-pointer">
                  <p className="text-white font-semibold">Subscribe</p>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="flex">
                <button className=" flex text-black pe-2.5 rounded-l-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
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
                  <span className="inline self-center font-semibold">Like </span>
                </button>
               
                <button className=" flex text-black rounded-r-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
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
              </div>
              <div className="flex">
                <button className="px-3 py-2 flex ms-2 text-black rounded-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
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
                    }}
                  >
                    <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path>
                  </svg>
                  <span className="ms-1.5 font-semibold">Share</span>
                </button>
              </div>
              <div>
                <button className="px-2 py-2 flex ms-2 text-black rounded-full bg-[#dbdbdb] hover:bg-[#9b9b9b]">
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
                    }}
                  >
                    <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <VideoDescription description={details?.snippet?.description} viewCount={FormatNumber(details?.statistics?.viewCount)} publishedAt={details?.snippet?.publishedAt} tags={details?.snippet?.tags}/>
          </div>
        </div>

        {/* Comments Section */}
        <Comments id={id} CommentCount={details?.statistics?.commentCount} />
      </div>

      {/* Placeholder for additional content */}
      <div className="w-[38vw]"><SidePopular/></div>
    </div>
  );
};

export default VideoPlayer;
