import React, { lazy, memo } from "react";
import ButtonList from "./ButtonList";
import { Virtuoso } from "react-virtuoso";
const VertVideoCard = lazy(() => import("./VertVideoCard"));
const SidePopular = memo(() => {
  const info = JSON.parse(localStorage.getItem("Results") || "[]");

  return (
    <div className="lg:max-w-[38vw]">
      <div className="mb-2">
        <ButtonList />
      </div>
      <div className="lg:pe-2">
        <Virtuoso
          totalCount={info.length}
          className="scrollbar-hidden min-h-[100vh] lg:min-h-[79vh]"
          itemContent={(index) => {
            const item = info[index];
            return <VertVideoCard info={item} key={index} />;
          }}
        />
      </div>
    </div>
  );
});

export default SidePopular;
