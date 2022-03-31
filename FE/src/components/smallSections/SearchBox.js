import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SearchBox({ searching, setSearching }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const event = (e) => {
      if (e.key === "Enter") {
        navigate(`/movielist/search?string=${searchValue}`);
        setSearching(false);
      }
    };
    window.addEventListener("keypress", event);
    return () => window.removeEventListener("keypress", event);
  }, [searchValue]);

  const searchBoxHandler = (e) => {
    e.stopPropagation();
  };

  const typing = () => {
    const seaching = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=500cc81d4dbf1d8c0a24c0ee8576f22c&language=en-US&query=${searchValue}&page=1&include_adult=false`
      );
      setSearchResult(res.data.results);
    };
    seaching();
  };

  return (
    <div
      className={
        (!searching ? "hidden" : "") +
        " w-screen h-screen absolute bg-mainPurple top-0 left-0 flex  text-mainRed bg-opacity justify-center items-start"
      }
      onClick={() => {
        setSearching(!searching);
      }}
    >
      <div
        className="w-11/12 mt-5 flex flex-col rounded  bg-white px-4 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex bg-white items-center py-3 border-b border-mainPurple">
          <FaSearch className="text-mainRed text-xl" />
          <input
            type="text"
            className="w-full focus:outline-none ml-3 "
            placeholder="Searching"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              typing();
            }}
          />
          <BiExit
            onClick={() => setSearching(false)}
            className="text-2xl cursor-pointer"
          ></BiExit>
        </div>
        <p className="font-bold py-3">Results</p>
        <div
          className="flex flex-col gap-0.5 max-h-96 overflow-y-scroll pb-4"
          onClick={(e) => {
            searchBoxHandler(e);
          }}
        >
          {searchResult.map((item) => {
            return (
              <Link
                to={`/detail/${item.id}`}
                className="w-full flex  hover:bg-mainPurple cursor-pointer hover:text-white"
              >
                <div className="h-24 mr-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt=""
                    className="object-cover h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">{item.original_title}</span>
                  <span>{item.release_date}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
