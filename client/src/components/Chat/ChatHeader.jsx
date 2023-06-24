import React from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

function ChatHeader() {
  return (
    <div className="z-10 flex items-center justify-between h-16 px-4 py-3 bg-panel-header-background">
      <div className="flex items-center justify-center gap-6">
        <Avatar type="sm" image={"/profile"} />
        <div className="flex flex-col">
          <span className="text-primary-strong">
            DEMO
          </span>
          <span className="text-sm text-secondary">
            Online/Offline
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-xl cursor-pointer text-panel-header-icon" />
        <IoVideocam className="text-xl cursor-pointer text-panel-header-icon" />
        <BiSearchAlt2 className="text-xl cursor-pointer text-panel-header-icon" />
        <BsThreeDotsVertical className="text-xl cursor-pointer text-panel-header-icon" />
      </div>
    </div>
  );
}

export default ChatHeader;
