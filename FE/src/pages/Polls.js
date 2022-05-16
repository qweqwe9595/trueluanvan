import React from "react";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import MovieDetailWall from "../components/smallSections/MovieDetailWall";
import PollsList from "../components/polls/Polls";

function Polls() {
  return (
    <div className="flex flex-col w-screen max-w-full text-white bg-mainPurple">
      <TopNav></TopNav>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailWall content={"ALL POLLS"} />
        <PollsList />
      </div>
      <div className="w-screen max-w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Polls;
