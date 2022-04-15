import React, { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import MovieDetailHero from "../components/heroSections/MovieDetailHero";
import MovieDetailTrailer from "../components/trailer/MovieDetailTrailer";
import MovieDetailTopCast from "../components/celebritySections/MovieDetailTopCast";
import Videos from "../components/videos/Videos";
import MovieDetailImage from "../components/images/MovieDetailImage";
import MoviesSection3 from "../components/movieSections/MovieSection3/MoviesSection3";
import { TheMovieDBContext } from "../contexts/TMDB/theMovieDbContext";
import Story from "../components/story/Story";
import MovieDetailWall from "../components/smallSections/MovieDetailWall";
import MovieDetailReview from "../components/reviews/MovieDetailReview";
import BoxOffice from "../components/boxoffice/BoxOffice";
import MovieDetailTenical from "../components/technicalSpecs/MovieDetailTenical";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
const TMDB_TOKEN = "500cc81d4dbf1d8c0a24c0ee8576f22c";

function MovieDetail() {
  const [movieTMDB, setMovieTMDB] = useState({});
  const [movieTMDBImages, setMovieTMDBImages] = useState([]);
  const [movies, dispatch] = useContext(TheMovieDBContext);
  const TMDBToken = movies.token;
  const movieId = useParams().movieId;
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDBToken}&language=en-US&append_to_response=videos,credits`
    );
    setMovieTMDB(res.data);
    const resImage = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${TMDBToken}&language=en-US&include_image_language=en`
    );
    setMovieTMDBImages(resImage.data.posters);
  }, [movieId, refresh]);

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
  }, [refresh]);

  return (
    <div className="flex flex-col w-screen max-w-full text-white bg-mainPurple">
      <TopNav></TopNav>
      <div className="w-screen max-w-full">
        <MovieDetailHero movie={movieTMDB} setRefresh={setRefresh} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailTrailer trailer={movieTMDB?.videos?.results} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailTopCast celebs={movieTMDB?.credits?.cast} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <Videos videos={movieTMDB?.videos?.results} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailImage images={movieTMDBImages} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailWall content={"YOU MIGHT LIKE"} />
        <MoviesSection3 movies={movies?.popular2} />
      </div>

      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailWall content={"STORY LINE"} />
        <Story movie={movieTMDB} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailWall content={"REVIEWS"} />
        <MovieDetailReview movie={movieTMDB} setRefresh={setRefresh} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailWall content={"TECHNICAL SPECS"} />
        <MovieDetailTenical movie={movieTMDB} />
      </div>
      <div className="w-screen max-w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default MovieDetail;
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
