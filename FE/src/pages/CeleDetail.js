import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import CeleHero from "../components/heroSections/CeleHero";
import Footer from "../components/Footer";
import MovieDetailImage from "../components/images/MovieDetailImage";
import axios from "axios";
import { useParams } from "react-router-dom";
import CeleCredits from "../components/credits.js/CeleCredits";
import MovieDetailWall from "../components/smallSections/MovieDetailWall";

function CeleDetail() {
  const [cele, setCele] = useState();

  const celeId = useParams().celeId;
  useEffect(async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/person/${celeId}?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US&append_to_response=images,credits`
    );
    setCele(res.data);
  }, []);
  return (
    <div className="flex flex-col w-screen max-w-full text-white bg-mainPurple">
      <TopNav></TopNav>
      <div className="w-screen max-w-full">
        <CeleHero cele={cele} />
      </div>

      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailImage images={cele?.images?.profiles} />
      </div>
      <div className="w-screen max-w-full px-10 lg:px-60 mt-10">
        <MovieDetailWall content={"CREDITS"} />
        <CeleCredits
          credits={cele?.credits?.cast?.filter((item, index) => index < 20)}
        />
      </div>
      <div className="w-screen max-w-full mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default CeleDetail;
