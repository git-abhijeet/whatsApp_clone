import React from "react";

function ChatContainer() {
  return (
    <div className="h-[18vh] w-full relative flex flex-grow overflow-auto custom-scrollbar">
      <div className="fixed top-0 left-0 z-0 w-full h-full bg-fixed bg-chat-background opacity-5">

      </div>
    </div>
  );
}

export default ChatContainer;
