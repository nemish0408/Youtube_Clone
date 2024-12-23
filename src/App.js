import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Head from "./components/Head";
import { useSelector } from "react-redux";
import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";

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
          <div className="min-w-[83vw] max-w-[98vw] w-full">
            <Routes>
              <Route path="/" element={<Body />}></Route>
              <Route path="/videoplayer/:id" element={<VideoPlayer />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
