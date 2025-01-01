import React, { lazy, Suspense } from "react";
import { useParams } from "react-router";

// Lazy-loaded components
const WatchPage = lazy(() => import("./WatchPage"));
const SidePopular = lazy(() => import("./SidePopular"));

const VideoPlayer = () => {
  const { id } = useParams(); // Extract video ID from the URL
  return (
    <div className="grid md:grid-flow-col md:grid-cols-3 gap-4 lg:px-4  max-w-full">
      {/* Video Player Section */}
      <div className="col-span-2 overflow-y-scroll scrollbar-hidden lg:max-h-[85vh]">
        <Suspense fallback={<div>Loading WatchPage...</div>}>
          <WatchPage id={id} /> {/* Pass the id to trigger updates */}
        </Suspense>
      </div>

      {/* SidePopular Section */}
      <div className="w-screen lg:max-w-[32vw] overflow-y-scroll scrollbar-hidden lg:max-h-[85vh]">
        <Suspense fallback={<div>Loading SidePopular...</div>}>
          <SidePopular />
        </Suspense>
      </div>
    </div>
  );
};

export default VideoPlayer;
