import React from "react";

function MovieDetailTrailer({ trailer }) {
  const mainTrailer = trailer?.filter((item) => item.type === "Trailer")[0];
  return (
    <div className="font-dosis w-full">
      <div className="flex items-center">
        <div className="h-4 w-4 bg-mainRed"></div>
        <h1 className="font-bold text-xl mx-2">TRAILER</h1>
        <div className="h-4 grow bg-mainRed"></div>
      </div>
      <div className="iframe-container w-full pt-2/3 mt-2">
        <iframe
          src={`https://www.youtube.com/embed/${mainTrailer?.key}`}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}

export default MovieDetailTrailer;
