import React from "react";

function MovieDetailWall({ content }) {
  return (
    <div className="flex items-center">
      <div className="h-4 w-4 bg-mainRed"></div>
      <h1 className="font-bold text-xl mx-2">{content}</h1>
      <div className="h-4 grow bg-mainRed"></div>
    </div>
  );
}

export default MovieDetailWall;
