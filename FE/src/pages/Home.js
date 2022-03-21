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

function Home() {
  const movies = useContext(TheMovieDBContext);
  const [dialog, setDialog] = useContext(ConfirmDialogContext);
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
            categories={["action", "romance"]}
            moviesDB={movies}
          ></MoviesSection2>
        </div>
        <div className="h-fit w-full flex gap-10 bg-lightPurple px-4 lg:px-20">
          <div className="w-full lg:w-2/3">
            <MoviesSection
              type="News"
              categories={["action", "romance"]}
              movies={movies.popular}
            ></MoviesSection>
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
            type="Tv show"
            categories={["action", "romance"]}
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
