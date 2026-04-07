import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReadImageToBase64 } from "../../wailsjs/go/main/App.js";
import {
  FaAnglesRight,
  FaAnglesLeft,
  FaHouse,
  FaPlay,
  FaPause,
} from "react-icons/fa6";
import Timer from "../components/Timer.tsx";

function DrawingPage() {
  const location = useLocation();
  const { imagePaths, sessionType, timerSetting } = location.state;

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const currentImageIndex = useRef(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerReset, setTimerReset] = useState(false);

  const handleNextImageClick = () => {
    let newIndex = currentImageIndex.current;

    newIndex++;

    if (newIndex > imagePaths.length - 1) {
      newIndex = 0;
    }

    const imagePath = imagePaths[newIndex];
    currentImageIndex.current = newIndex;

    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });

    setTimerReset(true);
  };

  const handlePreviousImageClick = () => {
    let newIndex = currentImageIndex.current;

    newIndex--;

    if (newIndex < 0) {
      newIndex = imagePaths.length - 1;
    }

    const imagePath = imagePaths[newIndex];
    currentImageIndex.current = newIndex;

    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });

    setTimerReset(true);
  };

  const handlePauseTimer = () => {
    setTimerPaused(true);
  };

  const handleResumeTimer = () => {
    setTimerPaused(false);
  };

  useEffect(() => {
    if (timerExpired) {
      let newIndex = currentImageIndex.current;

      newIndex++;

      if (newIndex > imagePaths.length - 1) {
        newIndex = 0;
      }

      currentImageIndex.current = newIndex;
      setTimerExpired(false);
    }

    ReadImageToBase64(imagePaths[currentImageIndex.current]).then((data) => {
      setCurrentImage(data);
    });
  }, [imagePaths, timerExpired]);

  return (
    <>
      <div className="bg-everforest-bg-dim">
        <div className="relative min-h-screen flex justify-center">
          <img
            src={`data:image/jpg;base64, ${currentImage}`}
            className="overflow-hidden max-h-screen"
          />
          {/* Menu bar */}
          <div className="absolute bottom-5 left-[1/2] bg-everforest-bg-5 flex p-1">
            <Link
              to={"/"}
              className="bg-everforest-bg-0 text-everforest-fg border hover:cursor-pointer"
            >
              <FaHouse />
            </Link>
            <button
              className="bg-everforest-bg-0 text-everforest-fg border hover:cursor-pointer"
              onClick={handlePreviousImageClick}
            >
              <FaAnglesLeft />
            </button>
            <button className="bg-everforest-bg-0 text-everforest-fg border hover:cursor-pointer">
              {timerPaused ? (
                <FaPlay onClick={handleResumeTimer} />
              ) : (
                <FaPause onClick={handlePauseTimer} />
              )}
            </button>
            <button
              className="bg-everforest-bg-0 text-everforest-fg border hover:cursor-pointer "
              onClick={handleNextImageClick}
            >
              <FaAnglesRight />
            </button>
          </div>
          <div className="absolute top-0 right-0">
            <p>Current session type: ${sessionType}</p>
            <Timer
              timerSetting={timerSetting}
              timerPaused={timerPaused}
              timerReset={timerReset}
              setTimerReset={setTimerReset}
              setTimeExpired={setTimerExpired}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawingPage;
