import React, { useState, useRef } from "react";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";

const dummy = [
  {
    movieName: "john wick",
    img: "http://ae01.alicdn.com/kf/Ha3b850cd05374d7e810fb68c99767aa0z.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 2",
    img: "https://cdn-amz.fado.vn/images/I/41DpGdw%2BzkL.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 3",
    img:
      "https://i.pinimg.com/originals/22/25/8f/22258fee7719c92aabb5163463f909ff.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 4",
    img:
      "https://upload.wikimedia.org/wikipedia/vi/a/a8/Johnwick_filmreview_poster200.jpg",
    direactor: "amet consectetur",
    category: "action",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
  {
    movieName: "john wick 6",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    category: "romance",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: "romance",
  },
];

function MoviesSection({ type, categories }) {
  const [mobile, setMobile] = useState(true);
  const sliderRef = useRef(null);
  const moviesArray = mobile
    ? dummy.filter((e, index) => index < 10)
    : dummy.filter((e, index) => index < 10);

  const next = () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft += 20;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  };
  const prev = () => {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      sliderRef.current.scrollLeft -= 20;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  };

  return (
    <div className="flex-2 flex-col w-full h-96 text-white relative bg-transparent ml-2">
      <h1 className="uppercase text-xl font-bold mt-3">{type}</h1>
      <div className="flex gap-5 mt-5">
        {categories.map((i) => (
          <span className="hover:text-yellow cursor-pointer uppercase">
            #{i}
          </span>
        ))}
      </div>
      <div ref={sliderRef} className="mt-2 flex gap-10 overflow-y-hidden">
        {moviesArray.map((movie, index) => {
          return (
            <div
              key={index}
              className="h-60 w-40 rounded-lg pt-28 pl-2 shrink-0 cursor-pointer"
              style={{
                backgroundImage: `url(${movie.img})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="px-1.5 bg-yellow inline rounded-lg">
                {movie.category}
              </h2>
              <h1 className="font-bold">{movie.movieName}</h1>
              <div className="flex items-center">
                <FaStar className="mr-2"></FaStar>
                <span>10/10</span>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="mr-3 w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full absolute right-3 top-1/2 cursor-pointer"
        onClick={() => {
          next();
        }}
      >
        <FaAngleRight className="text-3xl text-mainRed" />
      </div>
      <div
        className="mr-3 w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full absolute top-1/2 cursor-pointer"
        onClick={() => {
          prev();
        }}
      >
        <FaAngleLeft className="text-3xl text-mainRed" />
      </div>
    </div>
  );
}

export default MoviesSection;
