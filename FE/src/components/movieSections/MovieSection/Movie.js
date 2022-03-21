import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function Movie({ movie }) {
  const [averagePoint, setAveragePoint] = useState("no rating");
  useEffect(async () => {
    const res = await axios.get(
      `http://localhost:5000/api/rates/movie/average/${movie.id}`
    );
    setAveragePoint(res.data.averagePoint);
  }, []);
  return (
    <div>
      <div
        key={movie?.id}
        className="h-60 w-40 rounded-lg pt-28 pl-2 shrink-0 cursor-pointer"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.poster_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="px-1.5 bg-yellow inline rounded-lg">
          {movie.genres ? movie.genres[0].name : "asdsa"}
        </h2>
        <h1 className="font-bold">{movie?.title}</h1>
        <div className="flex items-center">
          <FaStar className="mr-2"></FaStar>
          <span>{averagePoint}/5</span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
