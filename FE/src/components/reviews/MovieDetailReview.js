import React from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

function MovieDetailReview() {
  return (
    <div className="w-full flex flex-col gap-4 mt-2 font-dosis">
      <div className="bg-lightPurple rounded-xl p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <img
              className="h-16 w-16 rounded-full object-cover p-1 border-mainRed border-2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Leonardo_Dicaprio_Cannes_2019_2.jpg/250px-Leonardo_Dicaprio_Cannes_2019_2.jpg"
              alt=""
            />
            <span className="font-bold text-xl capitalize">name</span>
          </div>
          <div className="flex gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <div className="bg-mainPurple rounded-xl flex items-center px-2 mt-2">
          <input
            className="bg-mainPurple grow p-2 rounded-xl outline-0"
            type="text"
            placeholder="Your Review"
          />
          <AiOutlineSend className="text-mainRed text-2xl" />
        </div>
      </div>
      <div className="bg-lightPurple rounded-xl p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <img
              className="h-16 w-16 rounded-full object-cover p-1 border-mainRed border-2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Leonardo_Dicaprio_Cannes_2019_2.jpg/250px-Leonardo_Dicaprio_Cannes_2019_2.jpg"
              alt=""
            />
            <span className="font-bold text-xl capitalize">name</span>
          </div>
          <div className="flex gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <div className="bg-mainPurple rounded-xl flex items-center px-2 mt-2">
          <input
            className="bg-mainPurple grow p-2 rounded-xl outline-0"
            type="text"
            placeholder="Your Review"
          />
          <AiOutlineSend className="text-mainRed text-2xl" />
        </div>
        <h2 className="text-mainRed cursor-pointer float-right font-bold text-xl">
          Detail {">>"}
        </h2>
      </div>
    </div>
  );
}

export default MovieDetailReview;
