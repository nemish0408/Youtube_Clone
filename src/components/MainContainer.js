import { useState } from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import GoogleOneTap from "./GoogleOneTap";

const MainContainer = () => {
   const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    });
  return (
    <div className="overflow-y-scroll scrollbar-hidden max-h-[85vh] lg:pt-5">
      {/* Only show Google One Tap login if user is not already logged in */}
{!user&&<GoogleOneTap/>}
      <ButtonList className="sticky top-0" />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
