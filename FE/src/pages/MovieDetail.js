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

function MovieDetail() {
  const [movieTMDB, setMovieTMDB] = useState({});
  const [movieTMDBImages, setMovieTMDBImages] = useState([]);
  const movies = useContext(TheMovieDBContext);
  const TMDBToken = movies.token;
  const movieId = useParams().movieId;
  useEffect(async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDBToken}&language=en-US&append_to_response=videos,credits`
    );
    setMovieTMDB(res.data);
    const resImage = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${TMDBToken}&language=en-US&include_image_language=en`
    );
    setMovieTMDBImages(resImage.data.posters);
  }, []);

  return (
    <div className="flex flex-col w-screen max-w-full text-white bg-mainPurple">
      <TopNav></TopNav>
      <div className="w-screen max-w-full">
        <MovieDetailHero movie={movieTMDB} />
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
        <MovieDetailReview />
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
