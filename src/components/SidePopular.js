import React, { lazy, memo } from "react";
import ButtonList from "./ButtonList";
const VertVideoCard = lazy(()=>import("./VertVideoCard"))
const SidePopular = memo(() => {
  const info = JSON.parse(localStorage.getItem("Results") || "[]");

  return (
    <div className="lg:max-w-[38vw]">
      <div className="">
        <ButtonList />
      </div>
      {info.map((item, index) => {
        return (
          <div key={index} className="pe-2">
            <VertVideoCard info={item} />
          </div>
        );
      })}
    </div>
  );
});

export default SidePopular;
