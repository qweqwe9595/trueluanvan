import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getCookie } from "../../helper/cookie";

function RatingModal({ openProp, movie }) {
  const [open, setOpen] = openProp;
  const [ratingValue, setRatingValue] = useState(1);

  const rating = async () => {
    location.reload();
    try {
      const token = `bearer ${getCookie("Token")}`;
      const res = await axios.post(
        "http://localhost:5000/api/rates/rating",
        {
          movieId: movie.id,
          point: ratingValue,
        },
        { headers: { token } }
      );
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };
  const removeRating = async () => {
    try {
      console.log("asd");
      const token = `bearer ${getCookie("Token")}`;
      await axios.post(
        "http://localhost:5000/api/rates/rating",
        {
          movieId: movie.id,
          point: 0,
        },
        { headers: { token } }
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed top-0 left-0 w-screen max-w-full h-screen bg-blackBlur z-50 flex items-center justify-center font-dosis"
          onClick={(e) => {
            setOpen(false);
            e.stopPropagation();
          }}
        >
          <div
            className="relative w-11/12 pt-10 bg-lightPurple flex flex-col items-center justify-center rounded"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="absolute right-4 top-4 flex items-center justify-center text-mainRed font-bold h-8 w-8 bg-white rounded-full cursor-pointer"
              onClick={(e) => {
                setOpen(false);
              }}
            >
              X
            </div>
            <h1 className="font-bold text-4xl">{movie?.title}</h1>
            <div className="flex flex-row-reverse text-3xl cursor-pointer gap-2 mt-2">
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
                    <label
                      className="cursor-pointer"
                      htmlFor={`radio${index + 1}`}
                    >
                      <FaStar
                        color={index + 1 <= ratingValue ? "#DD003F" : "#e4e6e9"}
                        value={index + 1}
                        id={index + 1}
                        onMouseEnter={(e) => {
                          setRatingValue(e.target.getAttribute("value"));
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            <button
              className="w-full bg-yellow py-2 font-bold mt-2"
              onClick={() => {
                rating();
                setOpen(false);
              }}
            >
              Confirm
            </button>
            <button
              className="w-full py-2 font-bold"
              onClick={() => {
                removeRating();
                setOpen(false);
              }}
            >
              Remove Rating
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RatingModal;
