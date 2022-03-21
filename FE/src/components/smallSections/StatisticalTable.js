import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaCircle } from "react-icons/fa";

const dummy = [
  [
    { name: "spider", views: 10 },
    { name: "spider", views: 10 },
    { name: "spider", views: 10 },
    { name: "spider", views: 10 },
    { name: "spider", views: 10 },
  ],
  [
    { name: "spider2", views: 10 },
    { name: "spider2", views: 10 },
    { name: "spider2", views: 10 },
    { name: "spider2", views: 10 },
    { name: "spider2", views: 10 },
  ],
  [
    { name: "spider3", views: 10 },
    { name: "spider3", views: 10 },
    { name: "spider3", views: 10 },
    { name: "spider3", views: 10 },
    { name: "spider3", views: 10 },
  ],
];

function StatisticalTable({ contents }) {
  const [slideNumber, setslideNumber] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    setslideNumber(0);
  }, []);

  const slidingRight = async () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft += 20;
      scrollAmount += 20;
      if (scrollAmount >= sliderRef.current.offsetWidth) {
        window.clearInterval(slideTimer);
      }
    }, 10);
  };
  const slidingLeft = async () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft -= 20;
      scrollAmount += 20;
      if (scrollAmount >= sliderRef.current.offsetWidth) {
        window.clearInterval(slideTimer);
      }
    }, 10);
  };

  const changeSlide = (number) => {
    setslideNumber(number);
    if (slideNumber < number) {
      let slide = number - slideNumber;
      if (slide == 1) {
        slidingRight();
      } else if (slide == 2) {
        slidingRight().then((e) => slidingRight());
      }
    }
    if (slideNumber > number) {
      let slide = slideNumber - number;
      if (slide == 1) {
        slidingLeft();
      } else if (slide == 2) {
        slidingLeft().then((e) => slidingLeft());
      }
    }
  };

  return (
    <div className="w-full py-4">
      <div className="w-full px-4">
        <h1 className="text-2xl font-bold border-l-4 border-mainRed pl-2">
          Top
        </h1>
        <Slider changeSlide={changeSlide} />
        <div
          ref={sliderRef}
          className="w-full flex mt-4 overflow-x-hidden md:px-5"
        >
          <div className="w-full mr-4 md:border-r-2 md:px-12 border-yellow md:shrink pt-4 shrink-0 sm:px-10">
            <h1 className="font-bold text-xl">Top views</h1>
            {dummy[0].map((e, i) => {
              return (
                <div key={i} className="mt-3 first:mt-0">
                  <div className="w-full flex justify-between ">
                    <span className="capitalize">{e.name}</span>
                    <span>{e.views}</span>
                  </div>
                  <hr className="w-full border-orange" />
                </div>
              );
            })}
            <p className="flex items-center float-right font-bold mt-4 capitalize cursor-pointer">
              show all
              <FaAngleRight className="text-mainRed" />
            </p>
          </div>
          <div className="md:shrink w-full mr-4 md:border-r-2 border-yellow md:px-12 pt-4 shrink-0 sm:px-10">
            <h1 className="font-bold text-xl">Top views</h1>
            {dummy[0].map((e, i) => {
              return (
                <div key={i} className="mt-3 first:mt-0">
                  <div className="w-full flex justify-between ">
                    <span className="capitalize">{e.name}</span>
                    <span>{e.views}</span>
                  </div>
                  <hr className="w-full border-orange" />
                </div>
              );
            })}
            <p className="flex items-center float-right font-bold mt-4 capitalize cursor-pointer">
              show all
              <FaAngleRight className="text-mainRed" />
            </p>
          </div>
          <div className="md:shrink md:px-12 w-full border-yellow pt-4 shrink-0 sm:px-10">
            <h1 className="font-bold text-xl">Top views</h1>
            {dummy[0].map((e, i) => {
              return (
                <div key={i} className="mt-3 first:mt-0">
                  <div className="w-full flex justify-between ">
                    <span className="capitalize">{e.name}</span>
                    <span>{e.views}</span>
                  </div>
                  <hr className="w-full border-orange" />
                </div>
              );
            })}
            <p className="flex items-center float-right font-bold mt-4 capitalize cursor-pointer">
              show all
              <FaAngleRight className="text-mainRed" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
//bg-mainRed px-2 rounded
const Slider = ({ changeSlide }) => {
  return (
    <div className="flex w-full justify-center gap-4 md:hidden">
      <div
        className="slider-btn h-8 w-8 rounded-full bg-white cursor-pointer px-2"
        onClick={() => changeSlide(0)}
      >
        <p className="slider-text text-white capitalize font-bold">topview</p>
      </div>
      <div
        className="slider-btn h-8 w-8 rounded-full bg-white cursor-pointer px-2"
        onClick={() => changeSlide(1)}
      >
        <p className="slider-text text-white">topview</p>
      </div>
      <div
        className="slider-btn h-8 w-8 rounded-full bg-white cursor-pointer px-2"
        onClick={() => changeSlide(2)}
      >
        <p className="slider-text text-white">topview</p>
      </div>
    </div>
  );
};

export default StatisticalTable;
