import React, { useState, useRef } from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import SearchBox from "./SearchBox";

function TopNav() {
  const [menuHamburger, setMenuHamburger] = useState(false);
  const [searching, setSearching] = useState(false);

  return (
    <div className="topnav md:h-20 h-14 justify-between flex bg-mainPurpleBlur w-screen px-10 text-white items-center fixed top-0 z-50">
      <img
        className="text-mainRed h-fit w-20"
        src="./stocks/img/logo/logo.svg"
        alt="logo"
      />
      <ul className="md:flex hidden">
        <li className="mr-4 text-lg cursor-pointer">HOME</li>
        <li className="mr-4 text-lg cursor-pointer">MOVIES</li>
        <li className="mr-4 text-lg cursor-pointer">TV SHOW</li>
        <li className="mr-4 text-lg cursor-pointer">CELEBRITIES</li>
        <li className="text-lg cursor-pointer">PAGE</li>
      </ul>
      <ul className="md:flex hidden flex items-center">
        <li>
          <FaSearch
            className="text-mainRed text-xl mr-2 cursor-pointer"
            onClick={() => {
              setSearching(!searching);
            }}
          ></FaSearch>
        </li>
        <li className="flex items-center border border-mainRed p-2 rounded-xl hover:bg-mainRed ease-in delay-75 cursor-pointer">
          <FaUserAlt className="mr-1"></FaUserAlt>
          <span>Lippo</span>
        </li>
      </ul>
      <div className="flex md:hidden items-center">
        <FaSearch
          className="text-mainRed  text-2xl mr-5 cursor-pointer"
          onClick={() => {
            setSearching(!searching);
          }}
        ></FaSearch>
        <div
          className="space-y-2 md:hidden cursor-pointer"
          onClick={() => setMenuHamburger(!menuHamburger)}
        >
          <span className="block w-8 h-1 bg-mainRed"></span>
          <span className="block w-8 h-1 bg-mainRed"></span>
          <span className="block w-8 h-1 bg-mainRed"></span>
        </div>
      </div>
      <Menu menuHamburger={menuHamburger}></Menu>
      <SearchBox searching={searching} setSearching={setSearching}></SearchBox>
    </div>
  );
}

function Menu({ menuHamburger }) {
  return (
    <ul
      className={
        (menuHamburger ? "opacity-1 " : "opacity-0 hidden") +
        ` md:hidden flex w-screen absolute flex-col top-14 md:top-20 left-0 text-white items-center bg-lightPurple transition ease-in delay-150`
      }
    >
      <li className="font-bold text-center w-full text-lg cursor-pointer pt-2 pb-2 hover:bg-mainRed">
        HOME
      </li>
      <li className="font-bold text-center w-full text-lg cursor-pointer pt-2 pb-2 hover:bg-mainRed">
        MOVIES
      </li>
      <li className="font-bold text-center w-full text-lg cursor-pointer pt-2 pb-2 hover:bg-mainRed">
        TV SHOW
      </li>
      <li className="font-bold text-center w-full text-lg cursor-pointer pt-2 pb-2 hover:bg-mainRed">
        CELEBRITIES
      </li>
      <li className="font-bold text-center w-full text-lg cursor-pointer pt-2 pb-2 hover:bg-mainRed">
        PAGE
      </li>
    </ul>
  );
}

export default TopNav;
