import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReadImageToBase64 } from "../../wailsjs/go/main/App.js";

function DrawingPage() {
  const location = useLocation();
  const { imagePaths, sessionType, timerSetting } = location.state;
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [time, setTime] = useState<number>(timerSetting * 1000);

  useEffect(() => {
    const imagePath = imagePaths[0];
    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });

    const countDown = () => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        } else return prevTime - 1000;
      });
    };

    const interval = setInterval(countDown, 1000);
    return () => clearInterval(interval);
  }, [imagePaths]);

  const formatTime = (time: number) => {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return `${minutes.toString()}:${seconds.toString()}`;
  };

  const handleNextImageClick = () => {
    const imagePath = imagePaths[1];
    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });
  };

  const handlePreviousImageClick = () => {
    const imagePath = imagePaths[0];
    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });
  };

  return (
    <>
      {/* <div */}
      {/*   className={`bg-[url(${from[0]})] h-full w-full min-h-full min-w-full`} */}
      {/* ></div> */}
      <div className="bg-everforest-bg-dim">
        <div className="relative min-h-screen flex justify-center">
          <img
            src={`data:image/jpg;base64, ${currentImage}`}
            className="overflow-hidden max-h-screen"
          />
          <div className="absolute top-0 left-0">
            <Link to={"/"}>Back to menu</Link>
            <p>Current session type: ${sessionType}</p>
            <p>Timer: {formatTime(time)}</p>
            <button
              className="bg-everforest-green text-everforest-fg border rounded-2xl hover:cursor-pointer"
              onClick={handleNextImageClick}
            >
              Next image
            </button>
            <button
              className="bg-everforest-green text-everforest-fg border rounded-2xl hover:cursor-pointer"
              onClick={handlePreviousImageClick}
            >
              Previos image
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawingPage;
