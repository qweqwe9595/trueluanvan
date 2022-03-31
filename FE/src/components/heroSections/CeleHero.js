import React from "react";

//1136406
function CeleHero({ cele }) {
  // const celeId = useParams().celeId;

  return (
    <div>
      <div className="w-full px-10 lg:px-60 md:flex py-4 relative bg-hero ">
        <div className="w-full px-10 rounded-xl font-dosis md:max-w-lg">
          <img
            className="w-full rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${cele?.profile_path}`}
            alt=""
          />
          <div className="font-bold text-5xl text-center md:hidden mt-4 mb-4">
            {cele?.name}
          </div>
        </div>
        <div className="w-full">
          <h1 className="hidden md:block text-6xl font-bold font-dosis mt-4 text-center">
            {cele?.name}
          </h1>
          <div className="flex justify-center gap-2 mt-4 md:justify-start items-start">
            <div className="px-5 py-1 border-2 border-mainRed w-fit rounded-3xl items-center cursor-pointer font-bold">
              {cele?.known_for_department}
            </div>
          </div>
          <div className="border-t-2 border-b-2 border-mainRed mt-4 py-4 font-dosis text-xl">
            <p>{cele?.biography}</p>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-bold ">
              BirthDay:{" "}
              <span className="font-normal text-mainBlue">
                {cele?.birthday}
              </span>
            </h3>
            <h3 className="font-bold ">
              BirthPlace:{" "}
              <span className="font-normal text-mainBlue">
                {cele?.place_of_birth}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CeleHero;
