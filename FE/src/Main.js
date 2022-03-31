import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/MovieDetail";
import CeleDetail from "./pages/CeleDetail";
import MoviesList from "./pages/MoviesList";

function Main() {
  return (
    <Routes>
      <Route path="detail/:movieId" element={<MovieDetail />} />
      <Route path="cele/detail/:celeId" element={<CeleDetail />} />
      <Route path="movielist/:category" element={<MoviesList />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default Main;
