import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="overflow-y-scroll scrollbar-hidden max-h-[85vh] lg:pt-5">
      {/* Only show Google One Tap login if user is not already logged in */}
      <ButtonList className="sticky top-0" />
      <VideoContainer />
    </div>
  );
};

export default MainContainer;
