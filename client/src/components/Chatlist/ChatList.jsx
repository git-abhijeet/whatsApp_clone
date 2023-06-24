import React from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import ChatListHeader from "./ChatListHeader";

function ChatList() {
  return (
    <div className="z-20 flex flex-col max-h-screen bg-panel-header-background">
      <>
        <ChatListHeader />
        <SearchBar />
        <List />
      </>
    </div>
  );
}

export default ChatList;
