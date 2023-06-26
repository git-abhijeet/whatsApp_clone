import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();
  return (
    <div className="h-[18vh] w-full relative flex flex-grow overflow-auto custom-scrollbar">
      <div className="fixed top-0 left-0 z-0 w-full h-full bg-fixed bg-chat-background opacity-5">
      </div>
      <div className="relative bottom-0 left-0 z-40 w-full pb-8 mx-10 my-6">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-2 pb-4 overflow-auto">
            {messages?.map((message, index) => (
              <div key={message.id} className={`flex ${message.senderId === currentChatUser.id ? "justify-start" : "justify-end"}`}>
                {message.type === "text" && (
                  <div className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-3 items-center max-w-[70%] ${message.senderId === currentChatUser.id ? "bg-incoming-background" : "bg-outgoing-background"}`}>
                    <span className="break-all">
                      {message.message}
                    </span>
                    <div className={`flex items-end gap-1 h-full ${message.senderId === currentChatUser.id ? "min-w-[50px] " : "min-w-[70px]"}`}>
                      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                        {
                          calculateTime(message.createdAt)
                        }
                      </span>
                      <span>
                        {
                          message.senderId === userInfo.id && (
                            <MessageStatus messageStatus={message.messageStatus} />
                          )
                        }
                      </span>
                    </div>
                  </div>
                )}
                {message.type === "image" && (
                  <ImageMessage message={message} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
