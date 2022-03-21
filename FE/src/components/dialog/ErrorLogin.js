import React from "react";
import { FaTimesCircle } from "react-icons/fa";

function ErrorLogin({ message, close }) {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center z-50">
      <div className="w-1/2 h-60 bg-white rounded-xl flex flex-col items-center py-10 justify-between">
        <div className="flex flex-col items-center">
          <FaTimesCircle className="text-4xl text-mainRed" />
          <h2 className="font-bold text-3xl">Error</h2>
          <p className="text-xl">{message}</p>
        </div>

        <button
          className="px-10 py-2 bg-mainPurple text-white font-bold"
          onClick={() => {
            close("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorLogin;
