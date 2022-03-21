import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { initMoviesState, moviesReducer } from "./movieReducer";

export const TheMovieDBContext = React.createContext();
const TMDB_TOKEN = "500cc81d4dbf1d8c0a24c0ee8576f22c";

const getPopular = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_TOKEN}&language=en-US&page=1`
  );
  return { popular: res.data.results };
};

const getPopular2 = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_TOKEN}&language=en-US&page=2&`
  );
  return { popular2: res.data.results };
};

const getUpComming = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_TOKEN}&language=en-US&page=1`
  );
  return { upComming: res.data.results };
};

const getPopularCele = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/person/popular?api_key=${TMDB_TOKEN}&language=en-US&page=1`
  );
  return { celebrities: res.data.results };
};

const joinVideos = async (id) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_TOKEN}&language=en-US&append_to_response=videos,genre`
  );
  return res.data;
};

export function TheMovieDbProvider({ children }) {
  const [movies, dispatch] = useReducer(moviesReducer, initMoviesState);
  useEffect(async () => {
    let popularMovies = await getPopular();
    let popularMovies2 = await getPopular2();
    let upCommingMovies = await getUpComming();
    let celebrities = await getPopularCele();
    //push VIDEOS into upcomming

    const upCommingMoviesArray = await upCommingMovies.upComming.map(
      async (movie) => {
        return await joinVideos(movie.id);
      }
    );

    const popular2MoviesArray = await popularMovies2.popular2.map(
      async (movie) => {
        return await joinVideos(movie.id);
      }
    );

    const popularMoviesArray = await popularMovies.popular.map(
      async (movie) => {
        return await joinVideos(movie.id);
      }
    );

    await Promise.all(upCommingMoviesArray).then((res) => {
      upCommingMovies = { ...upCommingMovies, ...{ upComming: res } };
    });
    await Promise.all(popularMoviesArray).then((res) => {
      popularMovies2 = { ...popularMovies, ...{ popular: res } };
    });
    await Promise.all(popular2MoviesArray).then((res) => {
      popularMovies2 = { ...popularMovies2, ...{ popular2: res } };
    });
    //set userRateMovies

    //set popular
    dispatch({
      type: "SET_POPULAR",
      payload: popularMovies,
    });
    dispatch({
      type: "SET_POPULAR2",
      payload: popularMovies2,
    });
    //set upcomming
    dispatch({ type: "SET_UPCOMMING", payload: upCommingMovies });
    //set celeb
    dispatch({ type: "SET_CELEBRITIES", payload: celebrities });
  }, []);

  return (
    <TheMovieDBContext.Provider value={movies}>
      {children}
    </TheMovieDBContext.Provider>
  );
}
