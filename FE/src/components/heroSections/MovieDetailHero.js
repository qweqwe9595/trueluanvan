import React, { useState } from "react";
import { SiThemoviedatabase } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import { FiPlay, FiBookmark } from "react-icons/fi";
import RatingModal from "../modal/RatingModal";

function MovieDetailHero({ movie }) {
  const [open, setOpen] = useState(false);
  const directors = movie?.credits?.crew?.filter(
    (crew) => crew.known_for_department === "Directing"
  );
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <RatingModal openProp={[open, setOpen]} movie={movie} />
      <div className="w-full px-10 lg:px-60 md:flex py-4 relative bg-hero ">
        <div className="w-full px-10 rounded-xl font-dosis md:max-w-lg">
          <img
            className="w-full rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
          <div className="font-bold text-5xl text-center md:hidden mt-4 mb-4">
            {movie?.title}
          </div>
          <div className="hidden md:flex  font-dosis gap-2 justify-center mt-2">
            <div className="flex px-3 py-1 border-2 border-mainRed w-fit rounded-3xl items-center font-bold cursor-pointer text-sm">
              <FiPlay className="text-mainRed text-4xl" />
              Play trailer
            </div>
            <div className="flex px-3 py-1 border-2 border-mainRed w-fit rounded-3xl items-center font-bold cursor-pointer text-sm">
              <FiBookmark className="text-mainRed text-4xl" />
              <span>Add to watch list</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between px-10 font-dosis md:justify-start md:px-0 md:gap-8 ">
            <div className="flex items-center gap-2 md:flex-col md:items-start">
              <span className="font-bold text-yellow md:text-white md:text-2xl">
                Web Rate
              </span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl md:text-3xl">4.5</span>
                <SiThemoviedatabase className="text-yellow text-xl md:text-mainRed md:text-3xl" />
              </div>
            </div>
            <div
              className="flex items-center gap-2 md:flex-col md:items-start cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            >
              <span className="font-bold text-yellow md:text-white md:text-2xl">
                Your Rate
              </span>
              <div className="flex items-center gap-2 ">
                <span className="font-bold text-xl md:text-3xl">8.0</span>
                <FaStar className="text-yellow text-xl md:text-mainRed md:text-3xl" />
              </div>
            </div>
          </div>
          <h1 className="hidden md:block text-6xl font-bold font-dosis mt-4 text-center">
            {movie?.title}
          </h1>
          <div className="flex font-dosis gap-4 justify-center mt-2 md:hidden">
            <div className="flex px-4 py-3 border-2 border-mainRed w-fit rounded-3xl items-center font-bold cursor-pointer">
              <FiPlay className="text-mainRed text-2xl" />
              Play trailer
            </div>
            <div className="flex px-4 py-3 border-2 border-mainRed w-fit rounded-3xl items-center font-bold cursor-pointer">
              <FiBookmark className="text-mainRed text-xl" />
              <span>Add to watch list</span>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4 md:justify-start items-start">
            {movie?.genres
              ?.filter((genre, index) => index < 3)
              .map((genre, index) => {
                return (
                  <div
                    key={index}
                    className="px-5 py-1 border-2 border-mainRed w-fit rounded-3xl items-center cursor-pointer font-bold"
                  >
                    {genre?.name}
                  </div>
                );
              })}
          </div>
          <div className="border-t-2 border-b-2 border-mainRed mt-4 py-4 font-dosis text-xl">
            <p>{movie.overview}</p>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-bold ">
              Director:{" "}
              <span className="font-normal">
                {directors?.map((dir, index) => {
                  if (index === directors.length - 1)
                    return (
                      <a key={index} className="cursor-pointer text-mainBlue">
                        {dir.name}
                      </a>
                    );
                  return (
                    <a key={index} className="cursor-pointer text-mainBlue">
                      {dir.name} -{" "}
                    </a>
                  );
                })}
              </span>
            </h3>
            <h3 className="font-bold ">
              Company:{" "}
              <span className="font-normal">
                {movie?.production_companies?.map((com, index) => {
                  if (index === movie.production_companies.length - 1)
                    return (
                      <a key={index} className="cursor-pointer text-mainBlue">
                        {com.name}
                      </a>
                    );
                  return (
                    <a key={index} className="cursor-pointer text-mainBlue">
                      {com.name} -{" "}
                    </a>
                  );
                })}
              </span>
            </h3>
            <h3 className="font-bold ">
              Status:{" "}
              <span className="font-normal text-mainBlue">{movie?.status}</span>
            </h3>
            <h3 className="font-bold ">
              Home Page:{" "}
              <a href={movie?.homepage} className="font-normal text-mainBlue">
                {movie?.homepage}
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailHero;
