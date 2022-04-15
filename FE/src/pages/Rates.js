import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Item from "../components/rates/Item";
import { UserContext } from "../contexts/User/UserContext";
import axios from "axios";

function Rates() {
  const [user] = useContext(UserContext);
  const [rateMovies, setRateMovies] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length == 0) return;
    const concatMovies = async () => {
      const getAllUserRatesRes = await axios.get(
        "http://localhost:5000/api/rates/user",
        { headers: { token: user.token } }
      );
      const getMoviesRes = await getAllUserRatesRes.data.map(async (rate) => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${rate.movieId}?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US`
        );

        return { ...res.data, rate };
      });
      await Promise.all(getMoviesRes).then((result) => {
        setRateMovies(result);
      });
    };
    concatMovies();
  }, [user, refresh]);

  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white">
      <TopNav />
      <div className="flex flex-col w-screen max-w-full px-2 mt-10 gap-10 xl:px-52 md:px-10 2xl:px-6 w-full min-h-screen">
        {rateMovies.map((movie, index) => (
          <Item key={index} movie={movie} refresh={setRefresh} />
        ))}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Rates;
