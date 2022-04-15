import React, { useState, useRef } from "react";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function MoviesSection3({ type, categories, movies, rate = true }) {
  const sliderRef = useRef(null);

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
    <div className="flex-col w-full text-white relative bg-transparent ">
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

      <div ref={sliderRef} className="mt-2 flex gap-10 overflow-x-hidden h-fit">
        {movies?.map((movie) => {
          return (
            <Link to={`/detail/${movie?.id}`} key={movie?.id} className="h-fit">
              <div
                className="h-72 w-60 cursor-pointer"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <h1 className="font-bold">{movie?.title}</h1>
              <div className="flex gap-2 justify-start ">
                {movie?.genres?.map((genre, index) => {
                  if (index < 2)
                    return (
                      <h2
                        key={genre?.id}
                        className="px-1.5 inline rounded-lg bg-orange"
                      >
                        {genre?.name}
                      </h2>
                    );
                })}
              </div>
              {rate && (
                <div className="flex items-center">
                  <span className="mr-2">10/10</span>
                  <FaStar className="text-mainRed"></FaStar>
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <div
        className=" w-10 h-20 flex justify-center items-center bg-blackBlur absolute top-1/3 cursor-pointer right-0"
        onClick={() => {
          next();
        }}
      >
        <FaAngleRight className="text-3xl text-white" />
      </div>
      <div
        className="mr-3 w-10 h-20 flex justify-center items-center bg-blackBlur absolute top-1/3 cursor-pointer"
        onClick={() => {
          prev();
        }}
      >
        <FaAngleLeft className="text-3xl text-white" />
      </div>
    </div>
  );
}

export default MoviesSection3;
