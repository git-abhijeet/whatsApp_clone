import React from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function ChatHeader() {
  const [{ currentChatUser }, dispatch] = useStateProvider();

  const handleVoiceCall = () => {
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "voice",
        roomId: Date.now(),
      }
    })
  }

  const handleVideoCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "video",
        roomId: Date.now(),
      }
    })
  }

  return (
    <div className="z-10 flex items-center justify-between h-16 px-4 py-3 bg-panel-header-background">
      <div className="flex items-center justify-center gap-6">
        <Avatar type="sm" image={currentChatUser?.profilePicture} />
        <div className="flex flex-col">
          <span className="text-primary-strong">
            {currentChatUser?.name}
          </span>
          <span className="text-sm text-secondary">
            Online/Offline
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall onClick={handleVoiceCall} className="text-xl cursor-pointer text-panel-header-icon" />
        <IoVideocam onClick={handleVideoCall} className="text-xl cursor-pointer text-panel-header-icon" />
        <BiSearchAlt2 className="text-xl cursor-pointer text-panel-header-icon" onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })} />
        <BsThreeDotsVertical className="text-xl cursor-pointer text-panel-header-icon" />
      </div>
    </div>
  );
}

export default ChatHeader;
