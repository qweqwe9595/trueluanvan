import React, { useState, useRef, useEffect, useContext } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Movie from "./Movie";
import { Link } from "react-router-dom";

function MoviesSection2({ type, categories, movies, rate }) {
  const [rating, setRating] = useState(null);
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
    <div className="w-view flex-col w-full h-96 text-white relative ">
      <h1 className="uppercase text-xl font-bold mt-3">{type}</h1>
      <div className="flex gap-5 mt-5">
        {categories?.map((i, index) => {
          return (
            <span
              key={index}
              className="hover:text-yellow cursor-pointer uppercase"
            >
              #{i}
            </span>
          );
        })}
      </div>
      <div ref={sliderRef} className="mt-2 flex gap-10 overflow-x-hidden">
        {movies?.map((movie, index) => {
          return <Movie key={index} movie={movie} rate={rate} />;
        })}
      </div>
      <div
        style={{ transform: "translateY(-50%)" }}
        className=" w-10 h-20 flex justify-center items-center bg-blackBlurHevy rounded absolute top-1/2 right-0 cursor-pointer z-10"
        onClick={() => {
          next();
        }}
      >
        <FaAngleRight className="text-3xl text-white" />
      </div>
      <div
        style={{ transform: "translateY(-50%)" }}
        className="mr-3 w-10 h-20 flex justify-center items-center bg-blackBlurHevy rounded absolute top-1/2 cursor-pointer z-10"
        onClick={() => {
          prev();
        }}
      >
        <FaAngleLeft className="text-3xl text-white" />
      </div>
      <Link
        to={"/movielist/upcommingmovies"}
        className="flex items-center mt-4 absolute right-2 cursor-pointer"
      >
        See all <FaAngleRight className="text-2xl text-mainRed" />
      </Link>
    </div>
  );
}

export default MoviesSection2;
