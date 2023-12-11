import React, { useEffect } from "react";
import Sound from "react-sound";
import soundfile from "./Book Notebook Closing.mp3";

const SoundPlayer = ({ playSound, onFinishedPlaying }) => {
  useEffect(() => {
    if (playSound) {
      console.log("playSound is true, attempting to play audio...");
    } else {
      console.log("playSound is false, audio is paused.");
    }
  }, [playSound]);

  return (
    <Sound
      url={soundfile}
      playStatus={playSound ? Sound.status.PLAYING : Sound.status.PAUSED}
      onFinishedPlaying={onFinishedPlaying}
    />
  );
};

export default SoundPlayer;
