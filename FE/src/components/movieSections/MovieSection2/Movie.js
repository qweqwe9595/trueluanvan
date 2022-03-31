import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

import { AiOutlineStar } from "react-icons/ai";
import { FiBookmark } from "react-icons/fi";
import RattingBox from "../../smallSections/RattingBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../helper/cookie";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  let navigate = useNavigate();
  const userToken = getCookie("Token");
  const [averagePoint, setAveragePoint] = useState("no rating");

  useEffect(async () => {
    const res = await axios.get(
      `http://localhost:5000/api/rates/movie/average/${movie.id}`
    );
    setAveragePoint(res.data.averagePoint);
  }, []);

  return (
    <Link
      to={`/detail/${movie?.id}`}
      key={movie?.id}
      className="h-60 w-96 rounded-lg shrink-0 cursor-pointer relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="movie-hover left-0 top-0 h-full w-full bg-blackOpacity z-10 absolute pt-28 pl-5 hover:bg-blackBlurHevy overflow-x-hidden">
        {userToken && (
          <div
            className="movie-options absolute top-10 text-mainRed flex flex-col items-end"
            onClick={(e) => e.stopPropagation()}
          >
            <FiBookmark
              className="icon-thick bg-white w-11
    h-11 rounded-full text-2xl px-2 py-2 border-4 border-whiteC4 hover:bg-mainRed hover:text-white"
            />
            <div className="absolute flex flex-row-reverse mt-2 items-center gap-2 top-12">
              <AiOutlineStar
                className="rates icon-thick bg-white w-11
      h-11 rounded-full text-xl px-2 py-2  border-4 border-whiteC4 hover:bg-mainRed hover:text-white hover:text-white"
              />
              <RattingBox movie={movie} />
            </div>
          </div>
        )}

        <h1 className="font-bold text-2xl uppercase">{movie?.title}</h1>
        <div className="flex items-center mb-2">
          <FaStar className="mr-2  text-yellow"></FaStar>
          <span>{averagePoint}/5</span>
        </div>
        <h2 className="px-1.5 bg-mainRed inline rounded">See now</h2>
      </div>
    </Link>
  );
}

export default Movie;
