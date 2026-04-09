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
  const { imagePaths, timerSetting } = location.state;

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const currentImageIndex = useRef(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const handleNextImageClick = () => {
    setResetTimer(true);
    let newIndex = currentImageIndex.current;

    newIndex++;

    if (newIndex > imagePaths.length - 1) {
      newIndex = 0;
    }

    currentImageIndex.current = newIndex;

    ReadImageToBase64(imagePaths[currentImageIndex.current]).then((data) => {
      setCurrentImage(data);
    });
  };

  const handlePreviousImageClick = () => {
    setResetTimer(true);
    let newIndex = currentImageIndex.current;

    newIndex--;

    if (newIndex < 0) {
      newIndex = imagePaths.length - 1;
    }

    currentImageIndex.current = newIndex;

    ReadImageToBase64(imagePaths[currentImageIndex.current]).then((data) => {
      setCurrentImage(data);
    });
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
          <div className="absolute bottom-0 w-full h-10 bg-everforest-bg-dim/35 flex justify-center p-1">
            <div className="flex justify-around items-center w-30">
              <Link
                to={"/"}
                className="text-everforest-fg hover:cursor-pointer hover:text-everforest-bg-green"
              >
                <FaHouse />
              </Link>
              <button
                className="text-everforest-fg hover:cursor-pointer hover:text-everforest-bg-green"
                onClick={handlePreviousImageClick}
              >
                <FaAnglesLeft />
              </button>
              <button className="text-everforest-fg hover:cursor-pointer hover:text-everforest-bg-green focus:outline-none">
                {timerPaused ? (
                  <FaPlay onClick={handleResumeTimer} />
                ) : (
                  <FaPause onClick={handlePauseTimer} />
                )}
              </button>
              <button
                className=" text-everforest-fg hover:cursor-pointer hover:text-everforest-bg-green"
                onClick={handleNextImageClick}
              >
                <FaAnglesRight />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 right-2/12 p-1">
            <Timer
              timerSetting={timerSetting}
              timerPaused={timerPaused}
              resetTimer={resetTimer}
              setTimeExpired={setTimerExpired}
              setResetTimer={setResetTimer}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawingPage;
