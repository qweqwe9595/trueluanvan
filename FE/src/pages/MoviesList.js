import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MoviesSection4 from "../components/movieSections/MovieSection4/MoviesSection4";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../contexts/User/UserContext";
const TMDB_TOKEN = "500cc81d4dbf1d8c0a24c0ee8576f22c";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const movieType = useParams().type;
  const [searchParams] = useSearchParams();
  const [user] = useContext(UserContext);

  const [resestFilter, setResestFilter] = useState(false);
  useEffect(async () => {
    switch (movieType) {
      case "popularmovies":
        {
          console.log("asds");
          let popularMovies = await getPopular(page);
          console.log(popularMovies);
          const popularMoviesArray = await popularMovies.popular.map(
            async (movie) => {
              return await joinRates(movie, user.token);
            }
          );
          await Promise.all(popularMoviesArray).then((res) => {
            setMovies((prev) => [...res]);
          });
        }
        break;
      case "upcommingmovies":
        {
          let upCommingMovies = await getUpComming(page);
          const upCommingMoviesArray = await upCommingMovies.upComming.map(
            async (movie) => {
              return await joinRates(movie, user?.token);
            }
          );
          await Promise.all(upCommingMoviesArray).then((res) => {
            setMovies((prev) => [...res]);
          });
        }
        break;
      case "search":
        {
          let searchString = searchParams.get("string");
          console.log(searchString);
          let searchMovies = await getSearchData(searchString, page);
          const searchMoviesArray = await searchMovies.map(async (movie) => {
            return await joinRates(movie, user?.token);
          });
          await Promise.all(searchMoviesArray).then((res) => {
            setMovies((prev) => [...res]);
          });
        }
        break;
    }
  }, [page, user, resestFilter, searchParams]);

  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white ">
      <TopNav></TopNav>
      <div className="flex flex-col w-screen max-w-full">
        <div className="w-full px-4 lg:px-80 mt-10">
          <MoviesSection4
            more={[page, setPage]}
            moviesProp={[movies, setMovies]}
            resest={setResestFilter}
          ></MoviesSection4>
        </div>

        <div className="w-full px-4 lg:px-20 bg-Purple">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default MoviesList;
const getPopular = async (page = 1) => {
  console.log(page);
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_TOKEN}&language=en-US&page=${page}`
  );
  return { popular: res.data.results };
};

const getUpComming = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_TOKEN}&language=en-US&page=1`
  );
  return { upComming: res.data.results };
};

const getSearchData = async (searchString, page = 1) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US&query=${searchString}&page=${page}&include_adult=false`
  );
  return res.data.results;
};

const joinVideos = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,genre`
  );
  return res.data;
};

const joinRates = async (movie, token) => {
  const resTMDB = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,genre`
  );

  const movieWithGenre = resTMDB.data;
  if (!token) return movieWithGenre;
  const res = await axios.get(
    `http://localhost:5000/api/rates/movie/average/${movieWithGenre.id}`,
    {
      headers: { token: token },
    }
  );
  let rate = res.data;
  if (res.data.averagePoint == "No rating") {
    rate = { averagePoint: -1 };
  }
  return { ...movieWithGenre, ...rate };
};
