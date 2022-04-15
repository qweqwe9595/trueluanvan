import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaEllipsisV } from "react-icons/fa";
import dateFormat from "dateformat";
import axios from "axios";
import { UserContext } from "../../contexts/User/UserContext";
import RatingModal from "../modal/RatingModal";

function ReviewList({ review, refresh }) {
  const [movie, setMovie] = useState(review.movie || []);
  const [user] = useContext(UserContext);
  const [rate, setRate] = useState("?");
  const [options, setOptions] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const getRate = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/rates/usersmovierate/${review?.movieId}`,
        { headers: { token: user.token } }
      );
      setRate(res.data);
      setReviewPoint(res.data.review);
    };
    getRate();
  }, [review]);

  useEffect(() => {
    const getMovie = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${review?.movieId}?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US&append_to_response=videos`
      );
      setMovie({ ...res.data, ...{ review: review } });
    };
    getMovie();
  }, []);

  const deleteReview = async () => {
    const res = await axios.delete(
      `http://localhost:5000/api/reviews/delete/${review?._id}`,
      { headers: { token: user.token } }
    );
    refresh((prev) => !prev);
  };

  return (
    <Link
      to={`/detail/${review?.movieId}`}
      className="flex w-full rounded-xl hover:bg-mainRedBlur p-4 relative"
      onMouseLeave={() => setOptions(false)}
    >
      {updating && (
        <RatingModal
          openProp={[updating, setUpdating]}
          yourRatingProp={[rate, setRate]}
          movie={movie}
          review={review}
          refresh={refresh}
        />
      )}
      {options && (
        <div
          className="absolute right-6 top-10 bg-blackBlur px-2 py-2"
          onClick={(e) => e.preventDefault()}
        >
          <div
            className="pr-20 pl-2 hover:bg-mainRed cursor-pointer"
            onClick={() => {
              setOptions(false);
              setUpdating(true);
            }}
          >
            Edit
          </div>
          <div
            className="pr-20 pl-2 hover:bg-mainRed cursor-pointer"
            onClick={() => {
              setOptions(false);
              deleteReview();
            }}
          >
            Delete
          </div>
        </div>
      )}
      <div className="w-28 h-32">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt=""
        />
      </div>
      <div className="flex-grow h-full flex flex-col justify-evenly px-4 max-w-md">
        <h1 className="text-2xl font-bold ">{movie?.title}</h1>
        <p className="flex items-center gap-2 text-xl">
          {rate?.point}/5 <FaStar className="text-mainRed" />
        </p>
        <p className="text-xl max-w-full">Your review : {review?.review}</p>
        <p className="font-light">{dateFormat(movie?.createdAt, "fullDate")}</p>
      </div>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setOptions(!options);
        }}
      >
        <FaEllipsisV className="text-xl absolute right-2" />
      </div>
    </Link>
  );
}

export default ReviewList;
