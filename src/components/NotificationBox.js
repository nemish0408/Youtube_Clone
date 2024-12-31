import React from "react";
import SettingLogo from "../svg/SettingLogo";
import BellLogo from "../svg/BellLogo";

const NotificationBox = () => {
  return (
    <div className="">
      <div className="flex justify-between px-4 py-2">
        <h1 className="text-black dark:text-white">Notifications</h1>
        <div className="cursor-pointer">
          <SettingLogo />
        </div>
      </div>
      <hr className="h-0.5 bg-black" />
      <div className="flex flex-col text-center lg:px-20 my-auto justify-center align-middle">
        <div className="flex flex-col mt-16">
          <div className="text-gray-400">
            <BellLogo />
          </div>
          <h1 className="text-gray-400 font-bold">
            Your notifications live here
          </h1>
          <p className="text-gray-400 text-normal w-72">
            Subscribe to your favorite channels to get notified about their
            latest videos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationBox;
