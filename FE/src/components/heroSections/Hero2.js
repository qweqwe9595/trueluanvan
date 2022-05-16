import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaAngleUp, FaAngleDown } from "react-icons/fa";

function Hero2({ movies }) {
  console.log(movies);
  const sliderRef = useRef(null);
  const [youtubeURL, setYourubeURL] = useState("");
  useEffect(() => {
    setYourubeURL(movies[0]?.videos?.results[0].key);
  }, [movies]);

  const down = () => {
    const slideUp = setInterval(() => {
      sliderRef.current.scrollTop += 5;
    }, 25);
    setTimeout(() => {
      window.clearInterval(slideUp);
    }, 500);
  };

  const up = () => {
    const slideUp = setInterval(() => {
      sliderRef.current.scrollTop -= 5;
    }, 25);
    setTimeout(() => {
      window.clearInterval(slideUp);
    }, 500);
  };

  const showTrailer = (key) => {
    setYourubeURL(key);
  };

  return (
    <div className="w-full mt-7 lg:px-20">
      <h1 className="flex items-center font-bold uppercase">
        New Trailer <FaAngleRight className="text-mainRed" />
      </h1>
      <div className="h-60 w-full sm:h-96 flex mt-5">
        <div className="w-full sm:w-8/12  h-60 bg-blackBlur sm:h-full">
          <iframe
            width="420"
            height="315"
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeURL}`}
          ></iframe>
        </div>
        <div className="grow relative">
          <div
            ref={sliderRef}
            className="hidden sm:flex flex-col h-full overflow-hidden gap-1 relative py-4 "
          >
            {movies?.map((movie) => (
              <div
                key={movie?.id}
                className="flex py-4 hover:bg-mainRed cursor-pointer px-2"
                onClick={() => showTrailer(movie?.videos?.results[0].key)}
              >
                <div className="h-full w-24 ">
                  <img
                    className="h-full w-full object-contain"
                    src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <h1 className="font-bold uppercase ">{movie?.title}</h1>
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
