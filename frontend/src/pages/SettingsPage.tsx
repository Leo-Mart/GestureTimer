import { useState } from "react";
import {
  GetFilePaths,
  HandleQuit,
  OpenMessageDialog,
} from "../../wailsjs/go/main/App.js";
import { useNavigate } from "react-router-dom";

function SettingsPage() {
  const nav = useNavigate();
  const [imagePaths, setImagePaths] = useState<string[]>(Array<string>);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<string>("standard");
  const [timer, setTimer] = useState(30);
  const [allImagesCheck, setAlImagesChecked] = useState<boolean>(false);
  const [customImageAmountChecked, setCustomImageAmountChecked] =
    useState<boolean>(false);
  const [imageAmountChoice, setImageAmountChoice] = useState<number>(0);
  const [shuffleChecked, setShuffleChecked] = useState<boolean>(false);

  const handleSessionChoice = (choice: string) => {
    if (isChecked) {
      setIsChecked(false);
    }
    setSessionType(choice);
  };

  const handleSubmit = () => {
    if (imageAmountChoice > imagePaths.length) {
      OpenMessageDialog(
        "Invalid image amount",
        "You have more images in the queue than are loaded",
        "info",
      );
      return;
    }

    nav("/drawing", {
      state: {
        imagePaths: shuffleChecked ? shuffleArray(imagePaths) : imagePaths,
        timerSetting: timer,
        sessionType: sessionType,
        customImageAmountChecked: customImageAmountChecked,
        imageAmount: imageAmountChoice,
      },
    });
  };

  const handleTimerChoice = (choice: number) => {
    if (isChecked) {
      setIsChecked(false);
    }
    setTimer(choice);
  };

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCheckedCustomTimer = () => {
    setTimer(0);
    setIsChecked(true);
  };

  const handleImageAmountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const amount = +e.target.value;
    setImageAmountChoice(amount);
  };

  const handleCustomTimerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTimer(+e.target.value);
  };

  const handleSelectFoldersClick = () => {
    GetFilePaths().then((paths) => setImagePaths(paths));
  };

  const handleQuitClick = () => {
    HandleQuit();
  };

  return (
    <>
      <div className=" text-everforest-fg absolute top-0.5 right-0.5">
        <button
          className="p-2 hover:cursor-pointer hover:bg-everforest-aqua hover:text-everforest-bg-0"
          onClick={handleQuitClick}
        >
          X
        </button>
      </div>
      <form className="bg-everforest-bg-dim min-h-screen grid grid-cols-6 gap-2">
        <div className="col-start-3 col-span-2">
          <div className="mt-5 w-full h-1/2">
            <h2 className="text-center text-2xl text-everforest-fg h-1/2 col-span-2">
              GestureTimer
            </h2>
            <p className="text-center text-everforest-fg">
              Setup your practice session below
            </p>
          </div>

          <div className="w-full h-1/2">
            <button
              className="col-span-2 w-full h-1/2 bg-everforest-bg-5 hover:cursor-pointer hover:bg-everforest-aqua"
              onClick={handleSelectFoldersClick}
            >
              Open files
            </button>
            <div className="mt-2">
              <p className="text-everforest-fg">
                {imagePaths.length > 0
                  ? `Found ${imagePaths.length} images`
                  : "No Images selected.."}
              </p>
            </div>
          </div>
        </div>

        <div className="col-start-3 col-span-2 h-1/5">
          <h3 className="mb-5 text-lg font-medium text-everforest-fg text-center">
            Select session type
          </h3>
          <fieldset>
            <ul className="grid w-full gap-1 grid-cols-2">
              <li>
                <input
                  className="hidden peer"
                  type="radio"
                  id="standard"
                  name="session"
                  value="standard"
                  checked={sessionType === "standard"}
                  onChange={() => handleSessionChoice("standard")}
                  required
                />
                <label
                  htmlFor="standard"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  Standard
                </label>
              </li>
              <li className="relative group">
                <input
                  className="hidden peer"
                  type="radio"
                  id="class"
                  name="session"
                  value="class"
                  checked={sessionType === "class"}
                  onChange={() => handleSessionChoice("class")}
                  disabled
                />
                <label
                  htmlFor="class"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-not-allowed peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  Class mode
                </label>
                <div className="absolute bottom-full left-1/2 transform-translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100">
                  Coming soon!
                </div>
              </li>
            </ul>
          </fieldset>
        </div>

        <div className="col-start-3 col-span-2 h-1/5">
          <h3 className="mb-5 text-lg font-medium text-everforest-fg text-center">
            Display each image for..
          </h3>
          <fieldset>
            <ul className="grid w-full gap-1 grid-cols-6">
              <li>
                <input
                  type="radio"
                  id="timer-30"
                  name="timer"
                  value="30"
                  className="hidden peer"
                  checked={timer === 30}
                  onChange={() => handleTimerChoice(30)}
                  required
                />
                <label
                  htmlFor="timer-30"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  30 sec
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="timer-60"
                  name="timer"
                  value="60"
                  className="hidden peer"
                  checked={timer === 60}
                  onChange={() => handleTimerChoice(60)}
                  required
                />
                <label
                  htmlFor="timer-60"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  60 sec
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  id="timer-120"
                  name="timer"
                  value="120"
                  className="hidden peer"
                  checked={timer === 120}
                  onChange={() => handleTimerChoice(120)}
                  required
                />
                <label
                  htmlFor="timer-120"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  2 min
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  id="timer-300"
                  name="timer"
                  value="300"
                  className="hidden peer"
                  checked={timer === 300}
                  onChange={() => handleTimerChoice(300)}
                  required
                />
                <label
                  htmlFor="timer-300"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  5 min
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  id="timer-600"
                  name="timer"
                  value="600"
                  className="hidden peer"
                  checked={timer === 600}
                  onChange={() => handleTimerChoice(600)}
                  required
                />
                <label
                  htmlFor="timer-600"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  10 min
                </label>
              </li>

              <li>
                <input
                  type="checkbox"
                  id="timer-custom"
                  name="custom-timer"
                  value="custom"
                  className="hidden peer"
                  checked={isChecked}
                  onChange={() => handleCheckedCustomTimer()}
                  required
                />
                <label
                  htmlFor="timer-custom"
                  className="inline-flex items-center justify-between bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                >
                  Custom
                </label>
                {isChecked && (
                  <div>
                    <label
                      className="text-everforest-fg"
                      htmlFor="custom-timer-input"
                    >
                      Enter time in seconds:
                      <input
                        type="text"
                        inputMode="numeric"
                        id="custom-timer-input"
                        name="custom-timer-input"
                        value={timer}
                        onChange={handleCustomTimerInputChange}
                        placeholder="Custom duration"
                        pattern="[0-9]"
                        className="block w-full px-3 py-2.5 bg-everforest-bg-visual text-everforest-fg text-sm focus:border-[#D699B6] shadow-xs"
                      />
                    </label>
                  </div>
                )}
              </li>
            </ul>
            <div>
              <h3 className="mb-2 p-2 text-lg font-medium text-everforest-fg text-center">
                Image settings:
              </h3>

              <ul className="flex flex-col lg:flex-row justify-between w-full gap-1">
                <li>
                  <input
                    type="checkbox"
                    id="all-images"
                    name="images"
                    value="all"
                    className="hidden peer"
                    checked={allImagesCheck}
                    onChange={() => {
                      setCustomImageAmountChecked(false);
                      setAlImagesChecked(true);
                    }}
                  />
                  <label
                    htmlFor="all-images"
                    className="inline-flex items-center justify-between bg-everforest-bg-5 p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                  >
                    All images
                  </label>
                </li>
                <li className="flex grow gap-1">
                  <div className="flex w-full gap-2">
                    <input
                      type="checkbox"
                      id="custom-images"
                      name="images"
                      value="custom"
                      className="hidden peer"
                      checked={customImageAmountChecked}
                      onChange={() => {
                        setCustomImageAmountChecked(true);
                        setAlImagesChecked(false);
                      }}
                    />
                    <label
                      htmlFor="custom-images"
                      className="flex bg-everforest-bg-5 p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                    >
                      Custom
                    </label>

                    <label
                      className="flex w-1/2 text-sm"
                      htmlFor="custom-image-amount-input"
                    >
                      <input
                        type="number"
                        step={1}
                        min={2}
                        max={200}
                        id="custom-image-amount-input"
                        name="custom-image-amount-input"
                        value={imageAmountChoice}
                        onChange={handleImageAmountInputChange}
                        placeholder="Image amount"
                        className="flex w-full px-3 py-2.5 bg-everforest-bg-visual text-everforest-fg text-sm focus:border-[#D699B6] shadow-xs"
                      />
                    </label>
                  </div>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="shuffle-option"
                    name="shuffle-option"
                    className="hidden peer"
                    checked={shuffleChecked}
                    onChange={() => setShuffleChecked(!shuffleChecked)}
                  />
                  <label
                    htmlFor="shuffle-option"
                    className="flex bg-everforest-bg-5 w-full p-2 cursor-pointer peer-checked:bg-everforest-green hover:bg-everforest-aqua"
                  >
                    Shuffle
                  </label>
                </li>
              </ul>
            </div>
          </fieldset>
        </div>
        {/* the start button */}
        <div className="col-start-3 col-span-2">
          <button
            disabled={imagePaths.length === 0 ? true : false}
            type="button"
            className="w-full h-1/2 bg-everforest-bg-5 rounded hover:cursor-pointer hover:bg-everforest-aqua disabled:bg-everforest-bg-dim"
            onClick={handleSubmit}
          >
            Start Drawing!
          </button>
        </div>
      </form>
    </>
  );
}

export default SettingsPage;
