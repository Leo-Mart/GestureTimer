declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    webkitdirectory?: string;
  }
}

function App() {
  return (
    <>
      <form className="bg-[#1E2326] min-h-screen grid grid-cols-6">
        {/* the file selector and the status of the files  */}
        <div className="border-3 border-red-700 col-span-4 col-start-2">
          <div>
            <input
              type="file"
              id="files"
              name="files"
              webkitdirectory=""
              multiple
            ></input>
            <label htmlFor="files">Select your reference images</label>
          </div>
          <div>
            <p>
              The status of the imported files go here, like how many files and
              so on
            </p>
          </div>
        </div>

        {/* here we have option for the session type, couple of predetermined option and maybe a custom option? */}
        {/* this will determine timers mostly, and class mode for instance is a predetermined mode of like 5 images on 1 min 5 on 2 and then 2 on 10 or something like that  */}
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

        {/* timer settings */}
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
                  type="radio"
                  id="timer-custom"
                  name="timer"
                  value="custom"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="timer-custom"
                  className="inline-flex items-center justify-between w-full p-5 text-body bg-amber-100 border rounded cursor-pointer peer-checked:bg-red-100 hover:bg-green-100"
                >
                  Custom time
                </label>
              </li>
            </ul>
          </fieldset>
        </div>
        {/* the start button */}
        <div>
          <button className="border-r-fuchsia-800">Start!</button>
        </div>
      </form>
    </>
  );
}

export default App;
