import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReadImageToBase64, HandleQuit } from "../../wailsjs/go/main/App.js";
import {
  FaAnglesRight,
  FaAnglesLeft,
  FaHouse,
  FaPlay,
  FaPause,
} from "react-icons/fa6";
import Timer from "../components/Timer.tsx";
import Modal from "../components/Modal.tsx";

function DrawingPage() {
  const location = useLocation();
  const nav = useNavigate();
  const { imagePaths, timerSetting, imageAmount, customImageAmountChecked } =
    location.state;

  const maxImages = imageAmount === 0 ? 0 : imageAmount;
  const currentImageRound = useRef(0);

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const currentImageIndex = useRef(1);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const [completeModalOpen, setCompleteModalOpen] = useState(false);

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

      if (customImageAmountChecked) {
        currentImageRound.current++;

        if (currentImageRound.current >= maxImages) {
          setTimerPaused(true);
          setCompleteModalOpen(true);
          return;
        }
      }

      currentImageIndex.current = newIndex;

      setTimerExpired(false);
    }
    ReadImageToBase64(imagePaths[currentImageIndex.current]).then((data) => {
      setCurrentImage(data);
    });
  }, [imagePaths, timerExpired, maxImages, customImageAmountChecked]);

  const handleCompletionChoice = (choice: string) => {
    setCompleteModalOpen(false);

    if (choice === "settings") {
      nav("/");
    } else {
      HandleQuit();
    }
  };

  return (
    <>
      <div className="bg-everforest-bg-dim">
        <div className="relative min-h-screen flex justify-center">
          <img
            src={`data:image/jpg;base64, ${currentImage}`}
            className="overflow-hidden max-h-screen max-w-screen"
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
              remainingImages={maxImages - currentImageRound.current}
              setTimeExpired={setTimerExpired}
              setResetTimer={setResetTimer}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={completeModalOpen}
        handleSelection={handleCompletionChoice}
      />
    </>
  );
}

export default DrawingPage;
