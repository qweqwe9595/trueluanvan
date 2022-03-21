import React from "react";
import { FaEllipsisV, FaAngleDoubleRight } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nisi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nisi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nisi.";

function ReviewGenerality() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl">YOUR REVIEWS</h1>
      <div className="mt-5 px-4 bg-mainPurple w-fit rounded-2xl py-6 cursor-pointer">
        <div className="flex items-center gap-4">
          <p className="px-4 py-1 rounded-2xl bg-white text-mainRed font-bold">
            Titanic
          </p>
          <h3 className="text-md">
            {text.length > 70 ? text.slice(0, 70) + "..." : text}
          </h3>
          <div className="flex items-center gap-2">
            <AiFillLike className="text-mainRed text-2xl" />
            1.2k
            <AiFillDislike className="text-2xl" />
            1.2k
            <button></button>
          </div>
        </div>
      </div>
      <h3 className="flex items-center gap-2 cursor-pointer mt-4">
        Show Mores
        <FaAngleDoubleRight className="text-mainRed text-xl" />
      </h3>
    </div>
  );
}

export default ReviewGenerality;
