import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Item from "../components/lists/Item";
import { UserContext } from "../contexts/User/UserContext";
import axios from "axios";
import MoviesSection4 from "../components/movieSections/cele/MoviesSection4";
import MovieDetailWall from "../components/smallSections/MovieDetailWall";
const TMDB_TOKEN = "500cc81d4dbf1d8c0a24c0ee8576f22c";

function CeleLists() {
  const [user] = useContext(UserContext);
  const [cele, setCele] = useState([]);
  const [page, setPage] = useState(1);
  const [listId, setListId] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    if (!user) return;
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${TMDB_TOKEN}&language=en-US&page=${page}`
    );
    return setCele(res.data.results);
  }, [user, refresh]);

  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white ">
      <TopNav></TopNav>
      <div className="flex flex-col w-screen max-w-full min-h-screen">
        <div className="w-full px-4 mt-10">
          <MovieDetailWall content={"MOST POPULAR"} />
          <MoviesSection4
            more={[page, setPage]}
            moviesProp={[cele, setCele]}
            reset={[refresh, setRefresh]}
          ></MoviesSection4>
        </div>
        <div className="w-full px-4 lg:px-20 bg-Purple">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default CeleLists;
