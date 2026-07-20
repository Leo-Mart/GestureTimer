interface ModalProps {
  isOpen: boolean;
  handleSelection: (choice: string) => void;
}

const Modal = (props: ModalProps) => {
  if (!props.isOpen) return null;
  return (
    <dialog
      className={`fixed top-0 p-2 left-1/2 -translate-x-1/2 z-50 flex w-full max-w-md flex-col bg-everforest-bg-0 shadow-2xl transition-transform duration-300 ease-in-out ${props.isOpen ? "translate-y-1/2" : "top-full"}`}
    >
      <div>
        <h2 className="text-xl text-everforest-fg">Session Finished!</h2>
        <p className="text-md text-everforest-fg">
          You've finished the session you commited to. Would you like to return
          to the menu and go again or quit?
        </p>
        <div className="flex justify-center align-middle gap-2">
          <button
            onClick={() => props.handleSelection("settings")}
            className="bg-everforest-green hover:bg-everforest-aqua p-2 hover:cursor-pointer text-everforest-bg-0 "
          >
            Return to settings
          </button>

          <button
            onClick={() => props.handleSelection("exit")}
            className="bg-everforest-red hover:bg-everforest-orange p-2 hover:cursor-pointer text-everforest-bg-0 "
          >
            Exit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
