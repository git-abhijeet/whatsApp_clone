import React from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";

function Main() {
  return (
    <>
      <div className="grid w-screen h-screen max-w-full max-h-screen overflow-hidden grid-cols-main">
        <ChatList />
        <Empty/>
      </div>
    </>
  );
}

export default Main;
