import { useEffect, useState } from "react";

function Timer({
  timerSetting,
  timerPaused,
  timeExpired,
  setTimeExpired,
}: {
  timerSetting: number;
  timerPaused: boolean;
  timeExpired: boolean;
  setTimeExpired: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [time, setTime] = useState<number>(timerSetting * 1000);
  const [expired, setExpired] = useState(timeExpired);

  useEffect(() => {
    const timer = () => {
      setTime((prevTime) => {
        if (timerPaused) {
          clearInterval(interval);
          return prevTime;
        } else if (expired) {
          prevTime = 0;
          setExpired(false);
          setTimeExpired(false);
          return timerSetting * 1000;
        } else if (prevTime === 0) {
          setExpired(true);
          setTimeExpired(true);
          clearInterval(interval);
          return 0;
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
