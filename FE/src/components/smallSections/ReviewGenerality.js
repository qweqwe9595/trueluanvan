import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaAngleDoubleRight } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nisi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nisi.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, nisi.";
import { getCookie } from "../../helper/cookie";
import axios from "axios";
import dateFormat from "dateformat";

function ReviewGenerality({ reviews }) {
  const reviewsFilter = reviews?.filter((item, index) => index < 5);
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl ">YOUR REVIEWS</h1>
      {reviewsFilter.map((item) => {
        const date = dateFormat(item?.createdAt, "fullDate") || "";

        return (
          <div
            key={item._id}
            className="mt-5 px-4 bg-mainPurple rounded-2xl py-6 w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-4 flex-1 w-8/12">
              <p className="px-4 py-1 rounded-2xl bg-white text-mainRed font-bold">
                {item?.movie?.title}
              </p>
              <h3 className="flex-1 text-md break-normal">{item.review}</h3>
            </div>
            <h3 className="w-4/12">{date}</h3>
          </div>
        );
      })}

      <h3 className="flex items-center gap-2 cursor-pointer mt-4">
        Show {reviews ? reviews.length - 5 : 0} Mores
        <FaAngleDoubleRight className="text-mainRed text-xl" />
      </h3>
    </div>
  );
}

export default ReviewGenerality;
