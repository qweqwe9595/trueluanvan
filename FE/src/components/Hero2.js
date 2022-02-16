import React, { useRef } from "react";

import { FaAngleRight, FaAngleUp, FaAngleDown } from "react-icons/fa";
const dummy = [
  {
    movieName: "john wick",
    img: "http://ae01.alicdn.com/kf/Ha3b850cd05374d7e810fb68c99767aa0z.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 2",
    img: "https://cdn-amz.fado.vn/images/I/41DpGdw%2BzkL.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 3",
    img:
      "https://i.pinimg.com/originals/22/25/8f/22258fee7719c92aabb5163463f909ff.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 4",
    img:
      "https://upload.wikimedia.org/wikipedia/vi/a/a8/Johnwick_filmreview_poster200.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
  {
    movieName: "john wick 6",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    category: "romance",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
];
function Hero2() {
  const sliderRef = useRef(null);

  const up = () => {
    const slideUp = setInterval(() => {
      sliderRef.current.scrollTop += 5;
    }, 25);
    setTimeout(() => {
      window.clearInterval(slideUp);
    }, 500);
  };

  const down = () => {
    const slideUp = setInterval(() => {
      sliderRef.current.scrollTop -= 5;
    }, 25);
    setTimeout(() => {
      window.clearInterval(slideUp);
    }, 500);
  };

  return (
    <div className="w-full mt-7 md:px-20">
      <h1 className="flex items-center font-bold uppercase">
        New Trailer <FaAngleRight className="text-mainRed" />
      </h1>
      <div className="h-60 w-full sm:h-96 flex mt-5">
        <div className="w-full sm:w-8/12  h-60 bg-blackBlur sm:h-full">
          <video
            className="w-full h-full"
            controls
            poster={
              "https://cdnimg.vietnamplus.vn/t1200/Uploaded/mzdic/2021_09_30/ronaldo-ky-luc-3009-2.jpg"
            }
          >
            <source src="./stocks/videos/trailer/test.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="grow relative">
          <div
            ref={sliderRef}
            className="hidden sm:flex flex-col h-full overflow-scroll  gap-1 relative"
          >
            {dummy.map((i) => (
              <div className="flex h-1/5 hover:bg-mainRed cursor-pointer">
                <div className="h-full w-24 ">
                  <img
                    className="h-full w-full object-contain"
                    src={i.img}
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="font-bold uppercase">{i.movieName}</h1>
                  <p>2:22</p>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => up()}
            className="hidden sm:flex absolute top-0 w-full justify-center h-7 bg-whiteBlur cursor-pointer items-center"
          >
            <FaAngleUp className="text-mainRed text-2xl" />
          </div>
          <div
            onClick={() => down()}
            className="hidden sm:flex absolute bottom-0 w-full justify-center h-7 bg-whiteBlur cursor-pointer items-center"
          >
            <FaAngleDown className="text-mainRed text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
