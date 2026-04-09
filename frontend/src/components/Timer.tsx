import React, { useEffect, useState } from "react";

function Timer({
  timerSetting,
  timerPaused,
  resetTimer,
  setResetTimer,
  setTimeExpired,
}: {
  timerSetting: number;
  timerPaused: boolean;
  resetTimer: boolean;
  setResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeExpired: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [time, setTime] = useState<number>(timerSetting * 1000);
  const halfTime = (timerSetting * 1000) / 2;

  useEffect(() => {
    const timer = () => {
      if (time === 0) {
        clearInterval(interval);
        setTimeExpired(true);
        setTime(1000 + timerSetting * 1000);
      }

      if (timerPaused) {
        clearInterval(interval);
      }

      if (resetTimer) {
        clearInterval(interval);
        setTime(timerSetting * 1000);
        setResetTimer(false);
      }
      if (!resetTimer && !timerPaused) {
        setTime((prevTime) => prevTime - 1000);
      }
    };

    const interval = setInterval(timer, 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (time: number) => {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return `${minutes.toString()}:${seconds.toLocaleString("en-GB", { minimumIntegerDigits: 2 })}`;
  };

  return (
    <div
      className={
        time === halfTime
          ? "transition delay-150 duration-300 ease-in-out bg-everforest-orange rounded"
          : ""
      }
    >
      <p className="text-everforest-fg">{formatTime(time)}</p>
    </div>
  );
}

export default Timer;
