import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  return (
    <div className="flex items-center justify-between h-16 px-4 py-3">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill className="text-xl cursor-pointer text-panel-header-icon" title="New Chat" />
        <>
          <BsThreeDotsVertical className="text-xl cursor-pointer text-panel-header-icon" title="Menu" />
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
