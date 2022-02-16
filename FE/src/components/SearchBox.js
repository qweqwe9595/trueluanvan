import React from "react";
import { FaSearch } from "react-icons/fa";
import { BiExit } from "react-icons/bi";

function SearchBox({ searching, setSearching }) {
  const searchBoxHandler = (e) => {
    e.stopPropagation();
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
      <div className="w-11/12 mt-5 flex flex-col rounded  bg-white px-4 ">
        <div className="flex bg-white items-center py-3 border-b border-mainPurple">
          <FaSearch className="text-mainRed text-xl" />
          <input
            type="text"
            className="w-full focus:outline-none ml-3 "
            placeholder="Searching"
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
          <div className="w-full flex hover:bg-mainPurple cursor-pointer">
            <div className="h-24 mr-3">
              <img
                src="https://subnhanhtv.com/wp-content/uploads/2021/12/Nguoi-Nhen-Khong-Con-Nha-Spider-Man-No-Way-Home-2021-poster-185x278.jpg"
                alt=""
                className="object-cover h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">spider man</span>
              <span>2020</span>
              <span>Tom </span>
            </div>
          </div>
          <div className="w-full flex hover:bg-mainPurple cursor-pointer">
            <div className="h-24 mr-3">
              <img
                src="https://subnhanhtv.com/wp-content/uploads/2021/12/Nguoi-Nhen-Khong-Con-Nha-Spider-Man-No-Way-Home-2021-poster-185x278.jpg"
                alt=""
                className="object-cover h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">spider man</span>
              <span>2020</span>
              <span>Tom </span>
            </div>
          </div>
          <div className="w-full flex hover:bg-mainPurple cursor-pointer">
            <div className="h-24 mr-3">
              <img
                src="https://subnhanhtv.com/wp-content/uploads/2021/12/Nguoi-Nhen-Khong-Con-Nha-Spider-Man-No-Way-Home-2021-poster-185x278.jpg"
                alt=""
                className="object-cover h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">spider man</span>
              <span>2020</span>
              <span>Tom </span>
            </div>
          </div>
          <div className="w-full flex hover:bg-mainPurple cursor-pointer">
            <div className="h-24 mr-3">
              <img
                src="https://subnhanhtv.com/wp-content/uploads/2021/12/Nguoi-Nhen-Khong-Con-Nha-Spider-Man-No-Way-Home-2021-poster-185x278.jpg"
                alt=""
                className="object-cover h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">spider man</span>
              <span>2020</span>
              <span>Tom </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
