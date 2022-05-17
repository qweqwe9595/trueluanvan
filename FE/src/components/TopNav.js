import React, { useState, useRef, useEffect, useContext } from "react";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import SearchBox from "./smallSections/SearchBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, eraseCookie } from "../helper/cookie";
import { UserContext } from "../contexts/User/UserContext";

function TopNav() {
  const [userId, setUserId] = useState();
  const [menuHamburger, setMenuHamburger] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const [searching, setSearching] = useState(false);
  const [user] = useContext(UserContext);

  const userToken = getCookie("Token");

  useEffect(async () => {
    if (!userToken) return;
    const res = await axios.get(`http://localhost:5000/api/users`, {
      headers: { token: `bearer ${userToken}` },
    });
    setUserId(res.data.data._id);
  }, []);

  return (
    <div className="topnav h-14 justify-between flex bg-mainPurpleBlur w-screen max-w-full px-10 text-white items-center top-0 z-50 font-dosis">
      <img
        className="text-mainRed h-fit w-20"
        src="/stocks/img/logo/logo.svg"
        alt="logo"
      />
      <ul className="md:flex hidden">
        <Link to="/">
          <li className="mr-4 text-lg cursor-pointer">HOME</li>
        </Link>

        <Link
          to={"/movielist/upcommingmovies"}
          className="mr-4 text-lg cursor-pointer"
        >
          MOVIES
        </Link>
        <Link to="/news/trending">
          <li className="mr-4 text-lg cursor-pointer">NEWS</li>
        </Link>
        <li className="mr-4 text-lg cursor-pointer">CELEBRITIES</li>
        <Link to="/polls/trending">
          <li className="text-lg cursor-pointer">POLLS</li>
        </Link>
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
        {userToken && (
          <li
            className="flex items-center border border-mainRed p-2 rounded-xl hover:bg-mainRed ease-in delay-75 cursor-pointer relative"
            onClick={() => setMenuUser(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                setMenuUser(false);
                console.log("asdasd");
              }, 200);
            }}
          >
            <FaUserAlt className="mr-1"></FaUserAlt>
            <span>{user?.userName || user?.email}</span>
            <AiFillCaretDown />
            {menuUser && (
              <div className="absolute top-10 left-0">
                <MenuUser userId={userId} />
              </div>
            )}
          </li>
        )}

        {!userToken && (
          <Link to="/login">
            <li className="font-bold cursor-pointer ml-2 hover:bg-lightPurple px-6 pb-1 rounded flex items-center">
              Login
            </li>
          </Link>
        )}
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

function MenuUser({ userId }) {
  const [user, setUser] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  let navigate = useNavigate();
  const logOut = () => {
    setUser(null);
    navigate("/");
    eraseCookie("Token");
  };
  useEffect(() => {
    if (!user) return;
    setIsAdmin(user.isAdmin);
  }, [user]);
  return (
    <ul className="w-32 bg-black flex flex-col p-4 text-white">
      <Link to={`/profile/${userId}`}>
        <li className="font-bold cursor-pointer hover:underline">
          Your Account
        </li>
      </Link>
      {isAdmin && (
        <Link to={`/admin`}>
          <li className="font-bold cursor-pointer hover:underline">Admin</li>
        </Link>
      )}

      <li
        className="font-bold cursor-pointer hover:underline"
        onClick={() => {
          logOut();
        }}
      >
        Log out
      </li>
    </ul>
  );
}
export default TopNav;
