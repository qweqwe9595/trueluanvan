import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Movie from "./Movie";
import { Link } from "react-router-dom";

function MoviesSection({ type, categories, movies }) {
  const sliderRef = useRef(null);
  const [slide, setSlide] = useState(true);

  const next = () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft += 20;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  };
  const prev = () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft -= 20;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  };

  return (
    <div className="flex-col text-white relative bg-transparent w-full">
      {type && <h1 className="uppercase text-xl font-bold mt-3">{type}</h1>}
      {categories && (
        <div className="flex gap-5 mt-5">
          {categories?.map((i, index) => (
            <span
              key={index}
              className="hover:text-yellow cursor-pointer uppercase"
            >
              #{i}
            </span>
          ))}
        </div>
      )}

      <div
        ref={sliderRef}
        className="w-full mt-2 flex gap-10 overflow-x-hidden relative"
      >
        {movies?.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
      {slide ? (
        <>
          <div
            style={{ transform: "translateY(-120%)" }}
            className="w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full absolute right-0 top-48 cursor-pointer"
            onClick={() => {
              next();
            }}
          >
            <FaAngleRight className="text-3xl text-mainRed" />
          </div>
          <div
            style={{ transform: "translateY(-120%)" }}
            className="w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full absolute top-48 cursor-pointer"
            onClick={() => {
              prev();
            }}
          >
            <FaAngleLeft className="text-3xl text-mainRed" />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default MoviesSection;
