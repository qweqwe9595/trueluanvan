import React from "react";
import CurrencyFormat from "react-currency-format";

function MovieDetailTenical({ movie }) {
  return (
    <div className="flex flex-col gap-4 mt-4 font-dosis font-bold text-xl">
      <h1 className="text-mainRed">
        Run Time: <span className="text-white">{movie?.runtime} minutes</span>
      </h1>
      <h1 className="text-mainRed">
        Budget:{" "}
        <span className="text-white">
          <CurrencyFormat
            value={movie?.budget}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </span>
      </h1>
      <h1 className="text-mainRed">
        Box Office:{" "}
        <span className="text-white">
          <CurrencyFormat
            value={movie?.revenue}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </span>
      </h1>
      <h1 className="text-mainRed">
        Status: <span className="text-white">{movie?.status}</span>
      </h1>
      <h1 className="text-mainRed">
        Origin Title:{" "}
        <span className="text-white">{movie?.original_title}</span>
      </h1>
      <h1 className="text-mainRed">
        Release Date: <span className="text-white">{movie?.release_date}</span>
      </h1>
    </div>
  );
}

export default MovieDetailTenical;
