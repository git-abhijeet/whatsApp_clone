import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

function MessageBar() {
  return (
    <div className="relative flex items-center h-20 gap-6 px-4 bg-panel-header-background">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile className="text-xl cursor-pointer text-panel-header-icon" title="Emoji" />
          <ImAttachment className="text-xl cursor-pointer text-panel-header-icon" title="Attach File" />
        </div>
        <div className="flex items-center w-full h-10 rounded-lg">
          <input type="text" placeholder="Type a message" className="w-full h-10 px-5 py-4 text-sm text-white rounded-lg bg-input-background focus:outline-none " />
        </div>
        <div className="flex items-center justify-center w-10">
          <button>
            <MdSend className="text-xl cursor-pointer text-panel-header-icon" title="send message" />
            {/* <FaMicrophone className="text-xl cursor-pointer text-panel-header-icon" title="Record" /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
