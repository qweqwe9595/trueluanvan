import React from "react";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

function ErrorLogin({ message, close, type = false }) {
  return (
    <div
      className="fixed w-screen h-screen flex items-center justify-center z-50 top-0 left-0 text-mainPurple bg-blackBlur"
      onClick={() => {
        close("");
      }}
    >
      <div
        className="w-1/2 h-60 bg-white rounded-xl flex flex-col items-center py-10 justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          {type ? (
            <FaCheckCircle className="text-4xl text-green " />
          ) : (
            <FaTimesCircle className="text-4xl text-mainRed" />
          )}
          {!type ? (
            <h2 className="font-bold text-3xl">Error</h2>
          ) : (
            <h2 className="font-bold text-3xl">Success</h2>
          )}

          <p className="text-xl uppercase">{message}</p>
        </div>

        <button
          className="px-10 py-2 bg-mainPurple text-white font-bold"
          onClick={(e) => {
            e.preventDefault();
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
