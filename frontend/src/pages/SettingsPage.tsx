import { useState } from "react";
import { GetFilePaths } from "../../wailsjs/go/main/App.js";
import { Link } from "react-router-dom";

function SettingsPage() {
  const [imagePaths, setImagePaths] = useState(Array<string>);
  const [isChecked, setIsChecked] = useState(false);
  const [sessionType, setSessionType] = useState("standard");
  const [timer, setTimer] = useState(30);

  const handleSessionChoice = (choice: string) => {
    if (isChecked) {
      setIsChecked(false);
    }
    setSessionType(choice);
  };

  const handleTimerChoice = (choice: number) => {
    if (isChecked) {
      setIsChecked(false);
    }
    setTimer(choice);
  };

  const handleCheckedCustomTimer = () => {
    setTimer(0);
    setIsChecked(true);
  };

  const handleCustomTimerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTimer(+e.target.value);
  };

  const handleSelectFoldersClick = () => {
    GetFilePaths().then((paths) => setImagePaths(paths));
    // ReadImages().then((base64Images) => setImages(base64Images));
  };

  return (
    <>
      <form className="bg-[#1E2326] min-h-screen grid grid-cols-6">
        <div className="col-start-2 col-span-4 border-3 border-teal-800">
          <button
            className="w-full h-1/2 bg-[#7FBBB3] hover:cursor-pointer hover:bg-[#D699B6]"
            onClick={handleSelectFoldersClick}
          >
            Open files
          </button>
          <div>
            <p>
              {imagePaths.length > 0
                ? `Found ${imagePaths.length} images`
                : null}
            </p>
          </div>
        </div>

        <div className="col-start-2 col-span-4 border-3 border-green-700">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Select session type
          </h3>
          <fieldset>
            <ul className="grid w-full gap-0 grid-cols-2">
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
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
                >
                  Standard
                </label>
              </li>
              <li>
                <input
                  className="hidden peer"
                  type="radio"
                  id="class"
                  name="session"
                  value="class"
                  checked={sessionType === "class"}
                  onChange={() => handleSessionChoice("class")}
                  required
                />
                <label
                  htmlFor="class"
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
                >
                  Class mode
                </label>
              </li>
            </ul>
          </fieldset>
        </div>

        <div className="col-start-2 col-span-4 border-3 border-red-700">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Choose time
          </h3>
          <fieldset>
            <ul className="grid w-full gap-0 grid-cols-6">
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
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
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
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
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
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
                >
                  2 minutes
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
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
                >
                  5 minutes
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
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
                >
                  10 minutes
                </label>
              </li>

              <li>
                <input
                  type="checkbox"
                  id="timer-custom"
                  name="timer"
                  value="custom"
                  className="hidden peer"
                  checked={isChecked}
                  onChange={() => handleCheckedCustomTimer()}
                  required
                />
                <label
                  htmlFor="timer-custom"
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
                >
                  Custom time
                </label>
                {isChecked && (
                  <div>
                    <label htmlFor="custom-timer-input">
                      Enter time in seconds:
                      <input
                        type="number"
                        id="custom-timer-input"
                        name="custom-timer"
                        value={timer}
                        onChange={handleCustomTimerInputChange}
                        placeholder="Custom duration"
                        className="block w-full px-3 py-2.5 bg-[#4C3743] border border-[#3C4841] text-white text-sm rounded-b-lg focus:border-[#D699B6] shadow-xs"
                      />
                    </label>
                    <label htmlFor="interval" className="block mb-2.5">
                      <select
                        id="interval"
                        className="block w-full px-3 py-2.5 bg-[#4C3743] border border-[#3C4841] text-white text-sm rounded-b-lg shadow-xs"
                      >
                        <option value="seconds">Seconds</option>
                        <option value="minutes">Minutes</option>
                      </select>
                    </label>
                  </div>
                )}
              </li>
            </ul>
          </fieldset>
        </div>
        {/* the start button */}
        <div className="col-start-2 col-span-4">
          <Link to="/drawing" state={{ from: imagePaths }}>
            <button className="w-full h-1/2 bg-[#7FBBB3] hover:cursor-pointer hover:bg-[#D699B6]">
              Start!
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default SettingsPage;
