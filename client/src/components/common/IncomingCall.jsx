import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Image from "next/image";
import React from "react";

function IncomingCall() {
  const [{ incomingVoiceCall, socket }, dispatch] = useStateProvider();

  const acceptCall = () => {
    const call = incomingVoiceCall;
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...incomingVoiceCall,
        type: "in-coming"
      },
    });
    socket.current.emit("accept-incoming-call", { id: incomingVoiceCall.id });
    dispatch({
      type: reducerCases.SET_INCOMING_VOICE_CALL,
      IncomingVoiceCall: undefined,
    });
  };

  const rejectCall = () => {
    socket.current.emit("reject-voice-call", { from: incomingVoiceCall.id });
    dispatch({
      type: reducerCases.END_CALL
    });
  };

  return (
    <div className="fixed z-50 flex items-center justify-start h-24 gap-5 p-4 mb-0 text-white border-2 rounded-sm bottom-8 right-6 bg-conversation-panel-background drop-shadow-2xl border-icon-green py-14">
      <div>
        <Image src={incomingVoiceCall.profilePicture} alt="avatar" height={70} width={70} className="rounded-full" />
      </div>

      <div>
        <div>
          {incomingVoiceCall.name}
        </div>
        <div className="text-sm">
          Incoming Voice Call
        </div>
        <div className="flex gap-2 mt-2">
          <button className="p-1 px-3 text-sm bg-red-500 rounded-full" onClick={rejectCall}>
            Reject
          </button>
          <button className="p-1 px-3 text-sm bg-green-500 rounded-full" onClick={acceptCall}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingCall;
