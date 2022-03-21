import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft, FaRegPlayCircle } from "react-icons/fa";

const dummy = [
  {
    index: 0,
    img:
      "https://upload.wikimedia.org/wikipedia/vi/f/fe/1917_%282019%29_Film_Poster.jpeg",
  },
  {
    index: 1,
    img:
      "https://cdnb.artstation.com/p/assets/images/images/017/317/689/large/toan-juno-final.jpg?1555483923",
  },
  {
    index: 2,
    img:
      "https://ae01.alicdn.com/kf/HTB1rx4QIGmWBuNjy1Xaq6xCbXXaS/T-L-M-khung-ANT-NG-I-N-NG-G-C-MINI-MOVIE-POSTER-DS-2.jpg_Q90.jpg_.webp",
  },
  {
    index: 3,
    img:
      "https://cdn.shopify.com/s/files/1/0548/8404/0870/products/TheFrontLine-WarMoviePoster_821048c5-929c-44af-97ea-75dc51073889_1200x.jpg?v=1617381737",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const length = dummy.length;

  const next = () => {
    if (current === length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    console.log(current);
    if (current === 0) {
      setCurrent(3);
    } else {
      setCurrent(current - 1);
    }
  };

  useEffect(() => {
    const loop = setInterval(() => {
      next();
    }, 10000);
    return () => clearInterval(loop);
  }, [current]);

  return (
    <div
      className="xl:px-28 w-screen max-w-full h-650px flex items-center pt-14 bg-lightPurpleBlur px-2"
      style={{
        backgroundImage: ``,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="w-full md:w-8/12 relative h-80 ">
        {dummy.map((e) => {
          return (
            <div
              key={e.index}
              className={
                (current === e.index ? "opacity-100" : "opacity-0") +
                " absolute bg-no-repeat shrink-0 w-full h-full ease-in-out duration-500 rounded flex justify-center items-end"
              }
              style={{
                backgroundImage: `url("${e.img}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="text-white bg-lightPurpleBlur w-10/12 h-fit shrink-0 rounded mb-4 border-l-4 border-mainRed pl-4 py-4">
                <div className="flex items-center">
                  <FaRegPlayCircle className="text-4xl" />
                  <span className="ml-3">2:20</span>
                </div>
                <h1 className="text-2xl font-bold">Movies Name</h1>
                <h3 className="">Movies director</h3>
              </div>
            </div>
          );
        })}

        <button
          className="absolute text-center right-0 top-2/4"
          onClick={() => next()}
        >
          <div className="mr-3 w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full">
            <FaAngleRight className="text-3xl text-mainRed" />
          </div>
        </button>
        <button className="absolute top-2/4 left-0" onClick={() => prev()}>
          <div className="ml-3 w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full">
            <FaAngleLeft className="text-3xl text-mainRed" />
          </div>
        </button>
      </div>
      <div className="hidden h-80 md:flex-auto md:flex md:flex flex-col ml-3 justify-between">
        <div className="flex hover:bg-mainRedBlur py-1 px-2 cursor-pointer">
          <div className="flex h-32 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/f/fe/1917_%282019%29_Film_Poster.jpeg"
              alt=""
              className="h-full w-44 object-cover"
            />
          </div>

          <div className="flex flex-col text-white justify-center ml-1">
            <h1 className="font-bold text-xl">Movie Name</h1>
            <h2 className="italic">Movie Director</h2>
            <h3>infos</h3>
          </div>
        </div>
        <div className="flex hover:bg-mainRedBlur py-1 px-2 cursor-pointer">
          <div className="flex items-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0548/8404/0870/products/TheFrontLine-WarMoviePoster_821048c5-929c-44af-97ea-75dc51073889_1200x.jpg?v=1617381737"
              alt=""
              className="h-32 w-44 object-cover"
            />
          </div>

          <div className="flex flex-col text-white justify-center ml-1">
            <h1 className="font-bold text-xl">Movie Name</h1>
            <h2 className="italic">Movie Director</h2>
            <h3>infos</h3>
          </div>
        </div>
        <div className="flex hover:bg-mainRedBlur py-1 px-2 cursor-pointer">
          <div className="flex items-center">
            <img
              src="https://ae01.alicdn.com/kf/HTB1rx4QIGmWBuNjy1Xaq6xCbXXaS/T-L-M-khung-ANT-NG-I-N-NG-G-C-MINI-MOVIE-POSTER-DS-2.jpg_Q90.jpg_.webp"
              alt=""
              className="h-32 w-44 object-cover"
            />
          </div>

          <div className="flex flex-col text-white justify-center ml-1">
            <h1 className="font-bold text-xl">Movie Name</h1>
            <h2 className="italic">Movie Director</h2>
            <h3>infos</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
