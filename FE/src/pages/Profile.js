import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import ProfileHero from "../components/heroSections/ProfileHero";
import MoviesSection from "../components/movieSections/MovieSection/MoviesSection";
import MoviesSection3 from "../components/movieSections/MovieSection3/MoviesSection3";
import MoviesSection2 from "../components/movieSections/MovieSection2/MoviesSection2";
import ReviewGenerality from "../components/reviews/ReviewGenerality";
import PollGenerality from "../components/smallSections/PollGenerality";
import Footer from "../components/Footer";
import { TheMovieDBContext } from "../contexts/TMDB/theMovieDbContext";
import axios from "axios";
import { getCookie } from "../helper/cookie";
import { UserContext } from "../contexts/User/UserContext";
import { Link } from "react-router-dom";

function Profile() {
  const movies = useContext(TheMovieDBContext);
  const [user] = useContext(UserContext);
  const [rateMovies, setRateMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  useEffect(async () => {
    try {
      if (Object.keys(user).length === 0) return;
      //get user rates
      const res2 = await axios.get(`http://localhost:5000/api/rates/user`, {
        headers: { token: user.token },
      });
      const PromiseConcat = res2.data.map(async (movie) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US&append_to_response=videos`
        );

        return res.data;
      });

      //watch later
      const WatchLaterPromise = user.watchLater.movies.map(async (id) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US&append_to_response=videos`
        );

        return res.data;
      });

      await Promise.all(PromiseConcat).then((res) => {
        setRateMovies(res);
      });
      await Promise.all(WatchLaterPromise).then((res) => {
        setWatchLater(res);
      });
    } catch (error) {
      console.log(error.response);
    }
  }, [user]);

  useEffect(async () => {
    const token = `bearer ${getCookie("Token")}`;
    const res = await axios.get(`http://localhost:5000/api/reviews/user`, {
      headers: { token },
    });
    setReviews(res.data.reviewsQuery.reverse());
  }, []);

  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white">
      <TopNav />
      <div className="flex flex-col md:flex-row w-screen max-w-full px-2 mt-10 gap-10 xl:px-52 md:px-10 2xl:px-64 justify-center">
        <div className="w-full md:w-1/3 xl:w-2/12 ">
          <ProfileHero
            user={user}
            rateAmount={rateMovies.length}
            reviewAmount={reviews.length}
          />
        </div>
        <div className="grow bg-lightPurple px-2 rounded-xl overflow-x-hidden profileHero">
          <MoviesSection type="Your Rates" movies={rateMovies} />
          <Link to={"/rates"} className="float-right mt-4 font-dosis text-xl">
            See All Rates
            <span className="font-bold text-2xl text-mainRed">{" >>"}</span>
          </Link>
        </div>
      </div>
      <div className="mx-2 md:mx-10 xl:mx-52 2xl:mx-64 bg-lightPurple mt-10 px-10 py-4 rounded-xl profileHero">
        <ReviewGenerality reviews={reviews} />
      </div>
      <div className="mx-2 md:mx-10 xl:mx-52 2xl:mx-64 bg-lightPurple mt-10 px-10 py-4 rounded-xl profileHero">
        <MoviesSection3 type={`Watch Later`} movies={watchLater} rate={false} />
        <Link to={"/lists"} className="float-right mt-4 font-dosis text-xl">
          See All
          <span className="font-bold text-2xl text-mainRed">{" >>"}</span>
        </Link>
      </div>
      <Link
        to={"/yourNews"}
        className="mx-2 md:mx-10 xl:mx-52 2xl:mx-64 bg-lightPurple mt-10 px-10 py-4 rounded-xl profileHero"
      >
        All your news hear
      </Link>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Profile;
