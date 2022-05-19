import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function Review({ review }) {
  const [yourRating, setYourRating] = useState(review?.rate?.point);
  return (
    <div className="bg-lightPurple rounded-xl p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <img
            className="h-16 w-16 rounded-full object-cover p-1 border-mainRed border-2"
            src={`http://localhost:5000/images/${
              review?.userId?.img || "defaultNewsImg.jpg"
            }`}
            alt=""
          />
          <span className="font-bold text-xl capitalize">
            {review?.userId?.userName || review?.userId?.email}
          </span>
        </div>
        <div className="flex gap-1 flex-row-reverse">
          {[...Array(5)].map((star, index) => {
            return (
              <div key={index}>
                <input
                  className="hidden"
                  id={`radio${index + 1}`}
                  key={index}
                  type="radio"
                  value={index + 1}
                />
                <label className="cursor-pointer" htmlFor={`radio${index + 1}`}>
                  <FaStar
                    color={index + 1 <= yourRating ? "#DD003F" : "#e4e6e9"}
                    value={index + 1}
                    id={index + 1}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-mainPurple rounded-xl flex items-center px-2 mt-2">
        <p className="bg-mainPurple grow p-2 outline-0">{review?.review}</p>
      </div>
    </div>
  );
}

export default Review;
