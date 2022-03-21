import React from "react";

function Story({ movie }) {
  return (
    <div className="font-dosis text-white">
      <p className="font-sans">{movie?.overview}</p>
      <div>
        <p className="font-bold text-mainRed">
          Tag line:{" "}
          <span className="font-bold text-white">{movie?.tagline}</span>
        </p>
        <p className="font-bold text-mainRed">
          Genres:{" "}
          {movie?.genres?.map((item, index) => {
            if (index === movie?.genres?.length - 1)
              return (
                <span key={index} className="font-bold text-white">
                  {item?.name}
                </span>
              );
            return (
              <span key={index} className="font-bold text-white">
                {item?.name} -{" "}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default Story;
