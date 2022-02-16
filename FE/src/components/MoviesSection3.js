import React, { useState, useRef } from "react";
import { FaStar, FaAngleRight, FaAngleLeft } from "react-icons/fa";

const dummy = [
  {
    movieName: "john wick",
    img: "http://ae01.alicdn.com/kf/Ha3b850cd05374d7e810fb68c99767aa0z.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 2",
    img: "https://cdn-amz.fado.vn/images/I/41DpGdw%2BzkL.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 3",
    img:
      "https://i.pinimg.com/originals/22/25/8f/22258fee7719c92aabb5163463f909ff.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 4",
    img:
      "https://upload.wikimedia.org/wikipedia/vi/a/a8/Johnwick_filmreview_poster200.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 6",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
  {
    movieName: "john wick 5",
    img:
      "https://i.pinimg.com/originals/eb/9a/f8/eb9af8f47691f8486f65f87f8d91ad99.jpg",
    direactor: "amet consectetur",
    category: ["action", "romain"],
  },
];

function MoviesSection3({ type, categories }) {
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
    <div className="flex-col w-full text-white relative bg-transparent">
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
            <div className="h-fit">
              <div
                key={index}
                className="h-72 w-60 pt-28 pl-2 shrink-0 cursor-pointer"
                style={{
                  backgroundImage: `url(${movie.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <h1 className="font-bold">{movie.movieName}</h1>
              <div className="flex gap-2 justify-start ">
                {movie.category.map((i) => {
                  return (
                    <h2 className="px-1.5 inline rounded-lg bg-orange">{i}</h2>
                  );
                })}
              </div>

              <div className="flex items-center">
                <span className="mr-2">10/10</span>
                <FaStar className="text-mainRed"></FaStar>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="mr-3 w-10 h-20 flex justify-center items-center bg-blackBlur absolute top-1/2 cursor-pointer right-0"
        onClick={() => {
          next();
        }}
      >
        <FaAngleRight className="text-3xl text-white" />
      </div>
      <div
        className="mr-3 w-10 h-20 flex justify-center items-center bg-blackBlur absolute top-1/2 cursor-pointer"
        onClick={() => {
          prev();
        }}
      >
        <FaAngleLeft className="text-3xl text-white" />
      </div>
    </div>
  );
}

export default MoviesSection3;
