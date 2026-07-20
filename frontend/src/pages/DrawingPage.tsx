import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ReadImageToBase64,
  HandleQuit,
  ConvertImageToGrayscale,
  FlipImageHorizontally,
} from "../../wailsjs/go/main/App.js";
import {
  FaAnglesRight,
  FaAnglesLeft,
  FaHouse,
  FaPlay,
  FaPause,
  FaCircleHalfStroke,
} from "react-icons/fa6";
import { MdFlip } from "react-icons/md";
import Timer from "../components/Timer.tsx";
import Modal from "../components/Modal.tsx";
import Spinner from "../components/Spinner.tsx";

function DrawingPage() {
  const location = useLocation();
  const nav = useNavigate();
  const { imagePaths, timerSetting, imageAmount, customImageAmountChecked } =
    location.state;

  const maxImages = imageAmount === 0 ? 0 : imageAmount;
  const currentImageRound = useRef(0);

  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [imageBeforeConvertToGrayScale, setImageBeforeConvertToGrayScale] =
    useState<string | null>();
  const [imageBeforeFlip, setImageBeforeFlip] = useState<string | null>();
  const currentImageIndex = useRef(1);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const handleConvertToGrayscale = () => {
    setTimerPaused(true);
    setLoading(true);
    if (imageBeforeConvertToGrayScale) {
      setCurrentImage(imageBeforeConvertToGrayScale);
      setImageBeforeConvertToGrayScale(null);
      setTimerPaused(false);

      setLoading(false);
      return;
    }
    setImageBeforeConvertToGrayScale(currentImage);

    ConvertImageToGrayscale(imagePaths[currentImageIndex.current]).then(
      (data) => {
        setCurrentImage(data);
        setTimerPaused(false);
        setLoading(false);
      },
    );
  };

  const handleFlipHorizontally = () => {
    setLoading(true);
    setTimerPaused(true);
    if (imageBeforeFlip) {
      setCurrentImage(imageBeforeFlip);
      setImageBeforeFlip(null);
      setTimerPaused(false);

      setLoading(false);
      return;
    }
    setImageBeforeFlip(currentImage);

    FlipImageHorizontally(imagePaths[currentImageIndex.current]).then(
      (data) => {
        setCurrentImage(data);
        setTimerPaused(false);

        setLoading(false);
      },
    );
  };

  const getMimeType = (base64String: string): string => {
    const sig = base64String.substring(0, 8);
    if (sig.startsWith("/9j")) return "image/jpeg";
    if (sig.startsWith("iVBORw0KGgo")) return "image/png";
    return "image/png";
  };

  const handleNextImageClick = () => {
    setResetTimer(true);
    let newIndex = currentImageIndex.current;

    newIndex++;

    if (newIndex > imagePaths.length - 1) {
      newIndex = 0;
    }

    currentImageIndex.current = newIndex;

    setImageBeforeFlip(null);
    setImageBeforeConvertToGrayScale(null);

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

    setImageBeforeFlip(null);
    setImageBeforeConvertToGrayScale(null);

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
      setImageBeforeFlip(null);
      setImageBeforeConvertToGrayScale(null);
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
      setLoading(false);
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

  const handleQuitClick = () => {
    HandleQuit();
  };

  return (
    <>
      <div className="z-60 text-everforest-fg absolute top-0.5 right-0.5">
        <button
          className="p-2 hover:cursor-pointer hover:bg-everforest-aqua hover:text-everforest-bg-0"
          onClick={handleQuitClick}
        >
          X
        </button>
      </div>
      <div className="bg-everforest-bg-dim">
        <div className="relative min-h-screen flex justify-center">
          <img
            src={`data:${getMimeType(currentImage)};base64,${currentImage}`}
            className="overflow-hidden max-h-screen max-w-screen"
          />
          {/* Menu bar */}
          <div className="absolute bottom-0 w-full h-10 bg-everforest-bg-dim/35 flex justify-center p-1">
            <div className="flex gap-2 justify-around items-center w-30">
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

              <button
                className=" text-everforest-fg hover:cursor-pointer hover:text-everforest-bg-green"
                onClick={handleConvertToGrayscale}
              >
                <FaCircleHalfStroke />
              </button>
              <button
                className=" text-everforest-fg hover:cursor-pointer hover:text-everforest-bg-green"
                onClick={handleFlipHorizontally}
              >
                <MdFlip />
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
      {loading && <Spinner loading={loading} />}
      <Modal
        isOpen={completeModalOpen}
        handleSelection={handleCompletionChoice}
      />
    </>
  );
}

export default DrawingPage;
