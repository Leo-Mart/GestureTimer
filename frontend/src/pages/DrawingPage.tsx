import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReadImageToBase64 } from "../../wailsjs/go/main/App.js";
import {
  FaAnglesRight,
  FaAnglesLeft,
  FaHouse,
  FaPlay,
  FaPause,
} from "react-icons/fa6";

function DrawingPage() {
  const location = useLocation();
  const { imagePaths, sessionType, timerSetting } = location.state;
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [time, setTime] = useState<number>(timerSetting * 1000);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImageClick = () => {
    let currentIndex = currentImageIndex;

    currentIndex++;

    if (currentIndex > imagePaths.length - 1) {
      currentIndex = 0;
    }

    const imagePath = imagePaths[currentIndex];
    setCurrentImageIndex(currentIndex);

    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });
  };

  const handlePreviousImageClick = () => {
    let currentIndex = currentImageIndex;

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = imagePaths.length - 1;
    }

    const imagePath = imagePaths[currentIndex];
    setCurrentImageIndex(currentIndex);

    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });
  };

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
              <FaPlay /> <FaPause />
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
            <p>Timer: {formatTime(time)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawingPage;
