import React from "react";
import TopNav from "../components/TopNav";
import Hero2 from "../components/Hero2";
import Hero from "../components/Hero";
import MoviesSection from "../components/MoviesSection";
import CelebritiesSection from "../components/CelebritiesSection";
import MoviesSection2 from "../components/MoviesSection2";
import MoviesSection3 from "../components/MoviesSection3";
import Footer from "../components/Footer";
import StatisticalTable from "../components/StatisticalTable";

function Home() {
  return (
    <div className="flex flex-col w-screen max-w-full bg-mainPurple text-white ">
      <TopNav></TopNav>
      <Hero></Hero>
      <div className="flex flex-col w-screen max-w-full px-2 md:px-20">
        <MoviesSection2
          type="Tv show"
          categories={["action", "romance"]}
        ></MoviesSection2>
        <div className="h-fit w-screen flex items-center justify-between gap-10">
          <MoviesSection
            type="News"
            categories={["action", "romance"]}
          ></MoviesSection>
          <CelebritiesSection></CelebritiesSection>
        </div>
        <Hero2></Hero2>
        <MoviesSection3
          type="Tv show"
          categories={["action", "romance"]}
        ></MoviesSection3>
        <StatisticalTable
          contents={["top view", "top rate", "top box office"]}
        />
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
