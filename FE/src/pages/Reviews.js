import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import ReviewList from "../components/reviews/ReviewList";
import { UserContext } from "../contexts/User/UserContext";
import axios from "axios";

function Reviews() {
  const [user] = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (!user) return;
    if (Object.keys(user).length === 0) return;
    const getAllReviewMovies = async () => {
      const reviewsRes = await axios.get(
        "http://localhost:5000/api/reviews/user",
        { headers: { token: user.token } }
      );
      setReviews(reviewsRes.data.reviewsQuery);
    };
    getAllReviewMovies();
  }, [user, refresh]);

  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white">
      <TopNav />
      <div className="flex flex-col w-screen max-w-full px-2 mt-10 gap-10 xl:px-52 md:px-10 2xl:px-6 w-full min-h-screen">
        {reviews.map((review, index) => (
          <ReviewList key={index} review={review} refresh={setRefresh} />
        ))}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Reviews;
