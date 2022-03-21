import React from "react";
import { FaAngleRight } from "react-icons/fa";

function CelebritiesSection({ cele }) {
  const celeFilter = cele?.filter((item, index) => {
    return index < 4;
  });

  return (
    <div className="h-fit flex-1 shrink-0">
      <h1 className="mt-8 text-2xl font-bold">Most Search Celebrites</h1>
      <hr className="mt-2 border-mainRed " />
      <div className="flex flex-col mt-4 gap-4">
        {celeFilter?.map((cele) => {
          return (
            <div
              key={cele.id}
              className="flex pl-3 py-1 hover:bg-mainRed hover:rounded cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${cele.profile_path}`}
                alt=""
                className="h-14 w-14 object-cover rounded-full"
              />
              <div className="ml-2">
                <h1 className="font-bold capitalize">{cele.name}</h1>
                <p className="text-yellow">{cele.popularity}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center mt-4">
        See all Celebrities <FaAngleRight className="text-2xl text-mainRed" />
      </div>
    </div>
  );
}

export default CelebritiesSection;
