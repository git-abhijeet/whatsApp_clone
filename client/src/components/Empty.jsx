import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center w-full border-1 border-conversation-border bg-panel-header-background">
      <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
    </div>
  );
}

export default Empty;
