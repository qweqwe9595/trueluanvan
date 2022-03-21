import React, { useRef } from "react";
import Video from "./Video";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

function Videos({ videos }) {
  videos = videos?.filter((video, index) => index < 15);
  const sliderRef = useRef(null);
  const next = () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft += 40;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  };
  const prev = () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft -= 40;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  };
  return (
    <div className="font-dosis w-full">
      <div className="flex items-center">
        <div className="h-4 w-4 bg-mainRed"></div>
        <h1 className="font-bold text-xl mx-2">VIDEOS</h1>
        <div className="h-4 grow bg-mainRed"></div>
      </div>
      <div className="w-view flex-col w-full h-fit text-white relative ">
        <div className="mt-2 flex gap-10 overflow-x-hidden" ref={sliderRef}>
          {videos?.map((video, index) => {
            return <Video key={index} path={video.key} />;
          })}
        </div>
        <div
          className=" w-10 h-20 flex justify-center items-center bg-blackBlurHevy rounded absolute  top-1/2 right-0 cursor-pointer z-10"
          onClick={() => {
            next();
          }}
        >
          <FaAngleRight className="text-3xl text-white" />
        </div>
        <div
          className="mr-3 w-10 h-20 flex justify-center items-center bg-blackBlurHevy rounded absolute top-1/2 cursor-pointer z-10"
          onClick={() => {
            prev();
          }}
        >
          <FaAngleLeft className="text-3xl text-white" />
        </div>
      </div>
    </div>
  );
}

export default Videos;
