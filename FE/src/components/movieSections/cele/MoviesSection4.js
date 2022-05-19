import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Movie from "./Movie";
import { UserContext } from "../../../contexts/User/UserContext";

function MoviesSection4({ more, moviesProp, reset }) {
  const [user] = useContext(UserContext);
  const [page, setPage] = more;
  const [movies, setMovies] = moviesProp;
  const [refresh, setRefresh] = reset;

  const showMore = () => {
    setPage((prev) => prev + 1);
    setRefresh((prev) => !prev);
  };

  const showLess = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-center font-dosis">
      <div className="flex w-full flex-wrap gap-10 justify-center mt-10">
        {movies.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
      <div className="flex items-center mt-10 gap-4 relative">
        <button
          className="text-xl absolute right-40"
          onClick={() => {
            setPage(1);
            setRefresh((prev) => !prev);
          }}
        >
          Top
        </button>
        <button className="text-xl " onClick={() => showLess()}>
          Back
        </button>
        <span className="text-xl text-mainRed">Page {page}</span>
        <button className="text-xl " onClick={() => showMore()}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MoviesSection4;
