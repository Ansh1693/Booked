import React from "react";

const Modal = (props) => {
  React.useEffect(() => {
    let timer;
    if (props.modalDisplay) {
      timer = setTimeout(() => {
        props.setModalDisplay(false);
      }
      , 3000);
    }
    return () => {
      clearTimeout(timer);
    }

  }, [props.modalDisplay]);
  return (
    <>
      {props.modalDisplay ? (
        <div className="w-full flex items-center justify-center fixed ">
          {props.type === "success" ? (
            <div className="alert alert-success w-4/6 md:w-2/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{props.content}</span>
            </div>
          ) : props.type === "error" ? (
            <div className="alert alert-error w-4/6 md:w-2/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{props.content}</span>
            </div>
          ) : (
            <div className="alert alert-warning w-4/6 md:w-2/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{props.content}</span>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
