import React from "react";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import MovieDetailWall from "../../components/smallSections/MovieDetailWall";
import AdminNews from "../../components/News/AdminNews";

function PostNews() {
  return (
    <div className="flex flex-col w-screen max-w-full text-white bg-mainPurple">
      <TopNav></TopNav>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailWall content={"STORY LINE"} />
        <AdminNews />
      </div>
      <div className="w-screen max-w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default PostNews;
