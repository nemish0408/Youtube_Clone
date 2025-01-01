import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Head from "./components/Head";
import { useSelector } from "react-redux";
import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import SearchVideoCard from "./components/searchVideoCard";
import PlayList from "./components/PlayList";
import ChannelPage from "./components/ChannelPage";
import LiveVideos from "./components/LiveVideos";
import LikedVideos from "./components/LikedVideos";
import WatchPage from "./components/WatchPage";

function App() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div className="dark:bg-[#0f0f0f]">
      <BrowserRouter>
        <Head />
        <div className="grid grid-flow-col dark:bg-[#0f0f0f] w-[100vw] lg:w-[98vw] pt-[10px]">
          <div className={isMenuOpen ? "max-w-[15vw] max-h-[82vh]" : "hidden"}>
            <Sidebar />
          </div>
          <div className="min-w-[83vw] max-w-[100vw] lg:max-w-[98vw] w-full dark:bg-[#0f0f0f] overflow-y-scroll overflow-x-scroll scrollbar-hidden min-h-[88.6vh] pt-5">
            <Routes>
              <Route path="/" element={<Body />}></Route>
              <Route path="/videoplayer/:id" element={<VideoPlayer />}></Route>
              <Route path={"/search=/:id"} element={<SearchVideoCard />}></Route>
              <Route path={"/playlist/:id"} element={<PlayList />}></Route>
              <Route path={"/channel/:id"} element={<ChannelPage />}></Route>
              <Route path={"/livevideos/"} element={<LiveVideos />}></Route>
              <Route path={"/likedvideos/"} element={<LikedVideos />}></Route>
              <Route path={"/watch/:id"} element={<WatchPage />}></Route>
              
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
