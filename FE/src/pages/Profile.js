import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import ProfileHero from "../components/heroSections/ProfileHero";
import MoviesSection from "../components/movieSections/MovieSection/MoviesSection";
import MoviesSection3 from "../components/movieSections/MovieSection3/MoviesSection3";
import MoviesSection2 from "../components/movieSections/MovieSection2/MoviesSection2";
import ReviewGenerality from "../components/smallSections/ReviewGenerality";
import PollGenerality from "../components/smallSections/PollGenerality";
import Footer from "../components/Footer";
import { TheMovieDBContext } from "../contexts/TMDB/theMovieDbContext";
import axios from "axios";
import { getCookie } from "../helper/cookie";

function Profile() {
  const movies = useContext(TheMovieDBContext);
  const [user, setUser] = useState({});
  const userToken = getCookie("Token");

  useEffect(async () => {
    if (!userToken) return;
    const res = await axios.get(`http://localhost:5000/api/users`, {
      headers: { token: `bearer ${userToken}` },
    });
    setUser(res.data.data);
  }, []);
  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white">
      <TopNav />
      <div className="flex flex-col md:flex-row w-screen max-w-full px-2 mt-10 gap-10 xl:px-52 md:px-10 2xl:px-64 justify-center">
        <div className="w-full md:w-1/3 xl:w-2/12 ">
          <ProfileHero user={user} />
        </div>
        <div className="grow md:flex bg-lightPurple px-2 rounded-xl overflow-x-hidden profileHero">
          <MoviesSection
            type="UpComming"
            categories={["action", "romance"]}
            movies={movies.userRates}
          />
        </div>
      </div>
      {/* <div className="mx-2 md:mx-10 xl:mx-52 2xl:mx-64 bg-lightPurple mt-10 px-10 py-4 rounded-xl profileHero">
        <MoviesSection3 type="Tv show" categories={["action", "romance"]} />
      </div> */}
      <div className="mx-2 md:mx-10 xl:mx-52 2xl:mx-64 bg-lightPurple mt-10 px-10 py-4 rounded-xl profileHero">
        <ReviewGenerality />
      </div>
      <div className="mx-2 md:mx-10 xl:mx-52 2xl:mx-64 bg-lightPurple mt-10 px-10 py-4 rounded-xl profileHero">
        <PollGenerality />
      </div>
      {/* <div className="mx-2 md:mx-10 xl:mx-52 2xl:mx-64 bg-lightPurple mt-10 px-10 py-4 rounded-xl profileHero">
        <MoviesSection2 type="Tv show" categories={["action", "romance"]} />
      </div> */}
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Profile;
