import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_AUDIO_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPauseCircle, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";

function CaptureAudio({ hide }) {

  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderedAudio, setRenderedAudio] = useState(null);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveFormRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);


  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveform(wavesurfer);

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
    }

  }, []);

  useEffect(() => {
    if (waveform) {
      handleStartRecording();
    }
  }, [waveform]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setIsRecording(true);
    setRecordedAudio(null);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      // mediaRecorderRed.current = mediaRecorder;
      audioRef.current.srcObject = stream;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        const audioURL = URL.createObjectURL(blob);
        const audio = new Audio(audioURL);
        setRecordedAudio(audio);

        waveform.load(audioURL);
      };

      mediaRecorder.start();

    }).catch((error) => {
      console.log("Error accessing microphone: ", error);
    })
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveform.stop();

      const audioChunks = [];
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  }

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      }
    }
  }, [recordedAudio]);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform.stop();
      waveform.play();
      recordedAudio.play();
      setIsPlaying(true);
    }
  }

  const handlePauseRecording = () => {
    waveform.stop();
    recordedAudio.pause();
    setIsPlaying(false);
  }

  const sendRecording = async () => {
    try {
      const formData = new FormData();
      formData.append("audio", renderedAudio);
      const response = await axios.post(ADD_AUDIO_MESSAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo.id,
          to: currentChatUser.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...response.data.message,
          },
          fromSelf: true,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: MessageBar.jsx:25 ~ photoPickerChange ~ error:", error)
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="flex items-center justify-end w-full text-2xl">
      <div className="pt-1">
        <FaTrash className="text-panel-header-icon" onClick={() => hide()} />
      </div>
      <div className="flex items-center justify-center gap-3 px-4 py-2 mx-4 text-lg text-white rounded-full bg-search-input-container-background drop-shadow-lg">
        {
          isRecording ? (
            <div className="text-center text-red-500 animate-pulse w-60">
              Recording <span>{recordingDuration}s</span>
            </div>
          ) : (
            <div>
              {
                recordedAudio && (
                  <>
                    {
                      !isPlaying ? (
                        <FaPlay onClick={handlePlayRecording} />
                      ) : (
                        <FaStop onClick={handlePauseRecording} />
                      )
                    }
                  </>
                )
              }
            </div>
          )
        }
        <div className="w-60" ref={waveFormRef} hidden={isRecording}>
          {
            recordedAudio && isPlaying && (
              <span>
                {formatTime(currentPlaybackTime)}
              </span>
            )
          }
          {
            recordedAudio && !isPlaying && (
              <span>
                {formatTime(totalDuration)}
              </span>
            )
          }
          <audio ref={audioRef} hidden />
        </div>
        <div className="mr-4">
          {
            !isRecording ? (
              <FaMicrophone className="text-red-500" onClick={handleStartRecording} />
            ) : (
              <FaPauseCircle className="text-red-500" onClick={handleStopRecording} />
            )
          }
        </div>
      </div>
      <div>
        <MdSend className="mr-4 cursor-pointer text-panel-header-icon" title="Send" onClick={sendRecording} />
      </div>
    </div>
  );
}

export default CaptureAudio;
