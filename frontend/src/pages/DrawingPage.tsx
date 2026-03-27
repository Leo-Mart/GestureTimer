import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReadImageToBase64 } from "../../wailsjs/go/main/App.js";

function DrawingPage() {
  const location = useLocation();
  const { from } = location.state;
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    const imagePath = from[0];
    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });
  }, [from]);

  const handleNextImageClick = () => {
    const imagePath = from[1];
    ReadImageToBase64(imagePath).then((data) => {
      setCurrentImage(data);
    });
  };

  const handlePreviousImageClick = () => {
    const imagePath = from[0];
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
