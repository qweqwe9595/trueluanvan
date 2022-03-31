import React from "react";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  return (
    <Link to={`/detail/${movie.id}`}>
      <div
        key={movie?.id}
        className="h-60 w-40 rounded-lg pt-28 pl-2 shrink-0 cursor-pointer relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.poster_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-blackOpacity h-full w-full top-0 left-0 absolute pl-4 pt-32">
          <h2 className="px-1.5 bg-yellow inline rounded-lg">
            {movie.genres ? movie?.genres[0]?.name : ""}
          </h2>
          <h1 className="font-bold">{movie?.title}</h1>
        </div>
      </div>
      {movie?.userPoint && (
        <div className="flex items-center">
          <span>Your Rate&nbsp;</span>
          <span>{movie.userPoint}/5&nbsp;</span>
          <FaStar className="mr-2 text-mainRed" />
        </div>
      )}
    </Link>
  );
}

export default Movie;
