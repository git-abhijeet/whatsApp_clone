import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function ChatLIstItem({ data, isContactPage = false }) {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const handleContactClick = () => {
    // if(currentChatUser?.id===data.id) {
    dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: { ...data } })
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
    // }
  }
  return (
    <div className={`flex cursor-pointer items-center hover:bg-background-default-hover`} onClick={handleContactClick}>
      <div className="px-5 pt-3 pb-1 min-w-fit">
        <Avatar type="lg" image={data?.profilePicture} />
      </div>
      <div className="flex flex-col justify-center w-full min-h-full pr-2 mt-3">
        <div className="flex justify-between">
          <div>
            <span className="text-white">
              {data?.name}
            </span>
          </div>
        </div>
        <div className="flex pt-1 pb-2 pr-2 botder-b border-conversation-border">
          <div className="flex justify-between w-full">
            <span className="text-sm text-secondary line-clamp-1">
              {data?.about || "\u00A0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
