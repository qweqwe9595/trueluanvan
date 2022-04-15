import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { UserContext } from "../../contexts/User/UserContext";
import axios from "axios";
import { getCookie } from "../../helper/cookie";
import RatingModal from "../modal/RatingModal";
import ErrorLogin from "../dialog/ErrorLogin";
import Review from "./Review";

function MovieDetailReview({ movie, setRefresh }) {
  const [user] = useContext(UserContext);
  const [yourRating, setYourRating] = useState(null);
  const [ratingId, setRatingId] = useState(null);
  const [rating, setRating] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewSuccess, setReviewSucess] = useState(false);

  useEffect(async () => {
    const token = `bearer ${getCookie("Token")}`;
    const res = await axios.get(
      `http://localhost:5000/api/rates/usersmovierate/${movie.id}`,
      { headers: { token } }
    );

    setYourRating(res?.data?.point);
    setRatingId(res?.data?._id);
  }, [movie, rating]);

  useEffect(async () => {
    const token = `bearer ${getCookie("Token")}`;
    const res = await axios.get(
      `http://localhost:5000/api/reviews/movie/${movie.id}`,
      { headers: { token } }
    );
    setReviews(
      res.data.reviewsQuery.reverse().filter((item, index) => index < 5)
    );
  }, [movie, rating]);

  const sendReview = async (e) => {
    const token = `bearer ${getCookie("Token")}`;
    e.preventDefault();
    if (!yourRating) return setError("You need rating to write a review");
    if (!reviewText)
      return setError("Need atleast 5 characters on your review");
    const res = await axios.post(
      "http://localhost:5000/api/reviews/reviewing",
      {
        userId: user._id,
        movie: movie,
        movieId: movie.id,
        review: reviewText,
        rate: ratingId,
      },
      { headers: { token } }
    );
    setRefresh((prev) => !prev);
    setReviewSucess(true);
  };
  return (
    <div className="w-full flex flex-col gap-4 mt-2 font-dosis">
      {error && <ErrorLogin message={error} close={setError} />}
      {rating && (
        <RatingModal
          openProp={[rating, setRating]}
          movie={movie}
          yourRatingProp={[yourRating, setYourRating]}
          refresh={setRefresh}
        />
      )}
      {reviewSuccess && (
        <ErrorLogin
          message={"Review Success"}
          close={setReviewSucess}
          type={true}
        />
      )}
      {user.token && (
        <form className="bg-lightPurple rounded-xl p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 ">
              <img
                className="h-16 w-16 rounded-full object-cover p-1 border-mainRed border-2"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Leonardo_Dicaprio_Cannes_2019_2.jpg/250px-Leonardo_Dicaprio_Cannes_2019_2.jpg"
                alt=""
              />
              <span className="font-bold text-xl capitalize">
                {user?.email}
              </span>
            </div>
            <div
              className="flex gap-1 flex-row-reverse"
              onClick={() => setRating(true)}
            >
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
            <input
              className="bg-mainPurple grow p-2 rounded-xl outline-0"
              type="text"
              placeholder="Your Review"
              required
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              onClick={(e) => {
                sendReview(e);
              }}
            >
              <AiOutlineSend className="text-mainRed text-2xl" type="submit" />
            </button>
          </div>
          <h2 className="text-mainRed cursor-pointer float-right font-bold text-xl">
            Detail {">>"}
          </h2>
        </form>
      )}
      {reviews.map((review, index) => (
        <Review key={index} review={review} user={user} rate={yourRating} />
      ))}
    </div>
  );
}

export default MovieDetailReview;
