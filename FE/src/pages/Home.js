import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Hero2 from "../components/heroSections/Hero2";
import Hero from "../components/heroSections/Hero";
import MoviesSection from "../components/movieSections/MovieSection/MoviesSection";
import CelebritiesSection from "../components/celebritySections/CelebritiesSection";
import MoviesSection2 from "../components/movieSections/MovieSection2/MoviesSection2";
import MoviesSection3 from "../components/movieSections//MovieSection3/MoviesSection3";
import Footer from "../components/Footer";
import StatisticalTable from "../components/smallSections/StatisticalTable";
import RateConfirm from "../components/dialog/RateConfirm";
import { TheMovieDBContext } from "../contexts/TMDB/theMovieDbContext";
import { ConfirmDialogContext } from "../contexts/Dialog/dialogContext";
import axios from "axios";
import { getCookie } from "../helper/cookie";
import { UserContext } from "../contexts/User/UserContext";
const TMDB_TOKEN = "500cc81d4dbf1d8c0a24c0ee8576f22c";

function Home() {
  const [movies, dispatch] = useContext(TheMovieDBContext);
  const [dialog, setDialog] = useContext(ConfirmDialogContext);
  const [user]=useContext(UserContext)
  useEffect(async () => {
    let popularMovies = await getPopular();
    let popularMovies2 = await getPopular2();
    let upCommingMovies = await getUpComming();
    let celebrities = await getPopularCele();
    //push VIDEOS into upcomming

    const upCommingMoviesArray = await upCommingMovies.upComming.map(
      async (movie) => { 
        if(!user) return movie
        return await joinVideos(movie.id);
      }
    );
    const popular2MoviesArray = await popularMovies2.popular2.map(
      async (movie) => {
        if(!user) return movie
        return await joinVideos(movie.id);
      }
    );
    const popularMoviesArray = await popularMovies.popular.map(
      async (movie) => {
        if(!user) return movie
        return await joinVideos(movie.id);
      }
    );
    const upCommingMoviesArrayJoinWatchList = await upCommingMovies.upComming.map(
      async (movie) => {
        if(!user) return movie
        return await joinWatchList(movie);
      }
    );
    const popular2MoviesArrayJoinWatchList = await popularMovies2.popular2.map(
      async (movie) => {
        if(!user) return movie
        return await joinWatchList(movie);
      }
    );
    const popularMoviesArrayJoinWatchList = await popularMovies.popular.map(
      async (movie) => {
        if(!user) return movie
        return await joinWatchList(movie);
      }
    );

    await Promise.all(upCommingMoviesArray).then(async (res) => {
      await Promise.all(upCommingMoviesArrayJoinWatchList).then((res) => {
        upCommingMovies = { ...upCommingMovies, ...{ upComming: res } };
      });
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
  console.log(movies);
  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white ">
      {dialog.movieName ? (
        <div
          className="fixed w-screen h-screen bg-blackBlur flex justify-center items-center z-50"
          onClick={() => {
            setDialog(false);
          }}
        >
          <RateConfirm />
        </div>
      ) : (
        ""
      )}

      <TopNav></TopNav>
      <Hero></Hero>
      <div className="flex flex-col w-screen max-w-full">
        <div className="w-full px-4 lg:px-20">
          <MoviesSection2
            type="UpComming"
            movies={movies.upComming}
          ></MoviesSection2>
        </div>
        <div className="h-fit w-full flex gap-10 bg-lightPurple px-4 lg:px-20">
          <div className="w-full lg:w-2/3">
            <MoviesSection type="News" movies={movies.popular}></MoviesSection>
          </div>
          <div className="hidden grow lg:block">
            <CelebritiesSection cele={movies?.celebrities}></CelebritiesSection>
          </div>
        </div>
        <div className="w-full px-4 lg:px-20">
          <Hero2 movies={movies?.upComming}></Hero2>
        </div>
        <div className="w-full px-4 lg:px-20 bg-lightPurple">
          <MoviesSection3
            type="Up Comming 2"
            movies={movies?.popular2}
          ></MoviesSection3>
        </div>
        <div className="w-full px-4 lg:px-20 bg-Purple">
          <StatisticalTable
            contents={["top view", "top rate", "top box office"]}
          />
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default Home;

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

const joinWatchList = async (movie) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/movielist/getdefault`,
      { headers: { token: `bearer ${getCookie("Token")}` } }
    );
    if (res.data.movies.includes(movie.id.toString())) {
      return { ...movie, ...{ watchLater: true } };
    }
    return { ...movie, ...{ watchLater: false } };
  } catch (error) {
    console.log(error);
  }
};
