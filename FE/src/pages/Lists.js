import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Item from "../components/lists/Item";
import { UserContext } from "../contexts/User/UserContext";
import axios from "axios";

function Lists() {
  const [user] = useContext(UserContext);
  const [rateMovies, setRateMovies] = useState([]);
  const [listId, setListId] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    if (!user) return;
    const WatchLaterPromise = user.watchLater.movies.map(async (id) => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US&append_to_response=videos`
      );
      return res.data;
    });

    await Promise.all(WatchLaterPromise).then((res) => {
      setRateMovies(res);
    });
  }, [user, refresh]);

  useEffect(() => {
    if (!user) return;
    const getdefault = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/movielist/getdefault",
        { headers: { token: user.token } }
      );
      setListId(res.data);
    };
    getdefault();
  }, [user, refresh]);

  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white">
      <TopNav />
      <div className="flex flex-col w-screen max-w-full px-2 mt-10 gap-10 xl:px-52 md:px-10 2xl:px-6 w-full min-h-screen">
        {rateMovies?.map((movie, index) => (
          <Item
            key={index}
            movie={movie}
            refresh={setRefresh}
            listId={listId?._id}
          />
        ))}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Lists;
