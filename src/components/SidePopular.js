import React from "react";
import ButtonList from "./ButtonList";
import VertVideoCard from "./VertVideoCard";

const SidePopular = () => {
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
};

export default SidePopular;
