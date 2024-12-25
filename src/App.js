import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Head from "./components/Head";
import { useSelector } from "react-redux";
import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import SearchVideoCard from "./components/searchVideoCard";

function App() {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div>
      <BrowserRouter>
        <Head />
        <div className="grid grid-flow-col w-[98vw] pt-[10px]">
          <div className={isMenuOpen ? "max-w-[15vw] max-h-[82vh]" : "hidden"}>
            <Sidebar />
          </div>
          <div className="min-w-[83vw] max-w-[98vw] w-full overflow-y-scroll overflow-x-scroll scrollbar-hidden max-h-[85vh] pt-5">
            <Routes>
              <Route path="/" element={<Body />}></Route>
              <Route path="/videoplayer/:id" element={<VideoPlayer />}></Route>
              <Route path={"/search=/:id"} element={<SearchVideoCard />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
