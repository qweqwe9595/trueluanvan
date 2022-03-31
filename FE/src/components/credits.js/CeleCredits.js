import React from "react";
import { Link } from "react-router-dom";

function CeleCredits({ credits }) {
  return (
    <div className="w-full font-dosis">
      <div className="grid grid-cols-4 ">
        <span className="col-span-2 font-bold text-xl">Title</span>
        <span className="font-bold text-xl">Character</span>
        <span className="font-bold text-xl">Year</span>
        <div className="col-span-4 bg-mainRed w-full h-2 mb-2"></div>
        {credits?.map((credit, index) => {
          return (
            <Link
              key={index}
              className="col-span-4 grid grid-cols-4 font-bold gap-2"
              to={`/detail/${credit?.id}`}
            >
              <span className="col-span-2 text-mainRed">
                {credit?.original_title}
              </span>
              <span className="text-orange">{credit?.character}</span>
              <span className="mb-2">{credit?.release_date}</span>
              <div className="col-span-4 w-full h-1 border-t-2 border-mainRed"></div>
            </Link>
          );
        })}
      </div>
      <h1 className="text-xl font-bold float-right cursor-pointer">
        Show More
      </h1>
    </div>
  );
}

export default CeleCredits;
