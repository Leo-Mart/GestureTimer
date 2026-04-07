import { useEffect, useState } from "react";

function Timer({
  timerSetting,
  timerPaused,
  timerReset,
  setTimerReset,
  setTimeExpired,
}: {
  timerSetting: number;
  timerPaused: boolean;
  timerReset: boolean;
  setTimerReset: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeExpired: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [time, setTime] = useState<number>(timerSetting * 1000);

  useEffect(() => {
    const timer = () => {
      setTime((prevTime) => {
        if (timerPaused) {
          clearInterval(interval);
          return prevTime;
        } else if (timerReset) {
          clearInterval(interval);
          prevTime = 0;
          setTimerReset(false);
          return timerSetting * 1000;
        } else if (prevTime === 0) {
          setTimeExpired(true);
          clearInterval(interval);
          prevTime = 0;
          return timerSetting * 1000;
        } else {
          return prevTime - 1000;
        }
      });
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
    <div>
      <p className="text-everforest-fg">Timer: {formatTime(time)}</p>
    </div>
  );
}

export default Timer;
