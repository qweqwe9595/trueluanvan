import axios from "axios";
import React, { useContext, useState } from "react";
import { FaStar, FaEllipsisV } from "react-icons/fa";
import dateFormat from "dateformat";
import RatingModal from "../modal/RatingModal";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/User/UserContext";

function Item({ movie, refresh }) {
  const [options, setOptions] = useState(false);
  const [rating, setRating] = useState(false);
  const [yourRating, setYourRating] = useState(movie.rate.point);
  const [user] = useContext(UserContext);

  const deleteRate = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/rates/${movie.id}`,
        { headers: { token: user.token } }
      );
      refresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/detail/${movie.id}`}
      className="flex w-full rounded-xl hover:bg-mainRedBlur p-4 relative"
      onMouseLeave={() => setOptions(false)}
    >
      {options && (
        <div
          className="absolute right-6 top-10 bg-blackBlur px-2 py-2"
          onClick={(e) => e.preventDefault()}
        >
          <div
            className="pr-20 pl-2 hover:bg-mainRed cursor-pointer"
            onClick={() => setRating(true)}
          >
            Edit
          </div>
          <div
            className="pr-20 pl-2 hover:bg-mainRed cursor-pointer"
            onClick={() => deleteRate()}
          >
            Delete
          </div>
        </div>
      )}
      {rating && (
        <RatingModal
          movie={movie}
          openProp={[rating, setRating]}
          yourRatingProp={[yourRating, setYourRating]}
        />
      )}
      <div className="w-28 h-32">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt=""
        />
      </div>
      <div className="flex-grow h-full flex flex-col justify-evenly px-4">
        <h1 className="text-2xl font-bold ">{movie?.title}</h1>
        <p className="flex items-center gap-2 text-xl">
          {yourRating}/5 <FaStar className="text-mainRed" />
        </p>
        <p className="font-light">{dateFormat(movie?.createdAt, "fullDate")}</p>
      </div>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setOptions(!options);
        }}
      >
        <FaEllipsisV className="text-xl" />
      </div>
    </Link>
  );
}

export default Item;
