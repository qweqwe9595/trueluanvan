import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Movie from "./Movie";

function MoviesSection4({ more, moviesProp, resest }) {
  const [page, setPage] = more;
  const [movies, setMovies] = moviesProp;
  const [sortType, setSortType] = useState("");
  const [categories, setCategories] = useState(null);

  //get cates
  useEffect(() => {
    let catesTemp = [];
    let cates = [];
    catesTemp = movies.map((movie) => {
      let temp = [];
      movie.genres.forEach((item) => {
        temp.push(item.name);
      });
      return temp;
    });
    catesTemp.forEach((cate) => cate.forEach((item) => cates.push(item)));

    const filterCates = cates.filter(
      (cate, index) => cates.indexOf(cate) == index
    );
    setCategories(filterCates);
  }, [movies]);

  const showMore = () => {
    setPage((prev) => prev + 1);
  };

  const showLess = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const filter = (category) => {
    const movieFilter = movies.filter((movie) => {
      let match = false;
      movie.genres.forEach((item) => {
        if (item.name === category) {
          match = true;
        }
      });
      return match;
    });
    setMovies(movieFilter);
  };

  const sort = (value) => {
    switch (value) {
      case "web": {
        let moviesSoft = movies
          .sort((a, b) => {
            return parseFloat(a.averagePoint) - parseFloat(b.averagePoint);
          })
          .reverse();
        setMovies(moviesSoft);
        break;
      }
      case "name": {
        let moviesSoft = movies
          .sort((a, b) => {
            return parseFloat(a.title) - parseFloat(b.title);
          })
          .reverse();
        setMovies(moviesSoft);
        break;
      }
      case "date": {
        let moviesSoft = movies.sort((a, b) => {
          const aMili = new Date(a.release_date).getTime();
          const bMili = new Date(b.release_date).getTime();
          return parseFloat(aMili) - parseFloat(bMili);
        });
        setMovies(moviesSoft);
        break;
      }
    }
    setSortType(value);
  };

  return (
    <div className="w-full flex flex-col items-center font-dosis">
      <div className="">
        <select
          className="text-white bg-mainPurple border-mainRed border w-40 rounded-xl outline-none h-8 after:text-mainRed cursor-pointer px-2"
          name=""
          id=""
          onChange={(e) => sort(e.target.value)}
        >
          <option value="none"></option>
          <option value="web">Web Rating</option>
          <option value="name">Name</option>
          <option value="date">Release Day</option>
        </select>
      </div>
      <div className="flex gap-2 w-full flex-wrap mt-4 justify-center">
        {categories &&
          categories.map((category, index) => (
            <div
              className="px-4 border-white border rounded-xl flex items-center cursor-pointer hover:bg-mainRed hover:border-mainRed text-xl"
              key={index}
              onClick={() => filter(category)}
            >
              {category}
            </div>
          ))}
        <button
          className="flex items-center text-xl"
          onClick={() => {
            resest((prev) => !prev);
          }}
        >
          <FaTimes className="text-mainRed" />
          Delete Filter
        </button>
      </div>
      <div className="flex w-full flex-wrap gap-10 justify-center mt-10">
        {movies.map((movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </div>
      <div className="flex items-center mt-10 gap-4 relative">
        <button
          className="text-xl absolute right-40"
          onClick={() => setPage(1)}
        >
          Top
        </button>
        <button className="text-xl " onClick={() => showLess()}>
          Back
        </button>
        <span className="text-xl text-mainRed">Page {page}</span>
        <button className="text-xl " onClick={() => showMore()}>
          Next
        </button>
      </div>
    </div>
  );
}

export default MoviesSection4;
