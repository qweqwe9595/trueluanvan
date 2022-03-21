import React from "react";

function MovieDetailTopCast({ celebs }) {
  const celebsMini = celebs?.filter((item, index) => index < 13);
  return (
    <div className="font-dosis w-full">
      <div className="flex items-center">
        <div className="h-4 w-4 bg-mainRed"></div>
        <h1 className="font-bold text-xl mx-2">TOP CASTS</h1>
        <div className="h-4 grow bg-mainRed"></div>
      </div>
      <div className="grid md:grid-cols-2 w-full  mt-4">
        {celebsMini?.map((celeb, index) => {
          return (
            <div
              key={index}
              className="flex px-6 py-2 border-2 border-mainPurple hover:bg-mainRedBlur hover:rounded hover:border-mainRed hover:border-2 cursor-pointer max-w-sm"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${celeb?.profile_path}`}
                alt=""
                className="h-14 w-14 object-cover rounded-full"
              />
              <div className="ml-2">
                <h1 className="font-bold capitalize">{celeb?.name}</h1>
                <p className="text-yellow">{celeb?.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieDetailTopCast;
