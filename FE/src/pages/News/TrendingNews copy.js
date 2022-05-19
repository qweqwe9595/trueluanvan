import React from "react";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import MovieDetailWall from "../../components/smallSections/MovieDetailWall";
import NewsList from "../../components/News/NewsList";

function TrendingNews() {
  return (
    <div className="flex flex-col w-screen max-w-full text-white bg-mainPurple min-h-screen">
      <TopNav></TopNav>
      <div className="w-full max-w-full px-10 lg:px-60 mt-10 ">
        <MovieDetailWall content={"NEWEST"} />
        <NewsList />
      </div>
      <div className="w-screen max-w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default TrendingNews;
