import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft, FaRegPlayCircle } from "react-icons/fa";
import { newdummys } from "../../dummy/newdummys";
import axios from "axios";

function Hero() {
  const [current, setCurrent] = useState(0);
  const length = newdummys.length;
  const [news, setNews] = useState([]);
  console.log(news);

  useEffect(() => {
    const getNews = async () => {
      const res = await axios.get("http://localhost:5000/api/news/getall");
      const newsFilter = res.data.filter((item, i) => {
        return i < 3;
      });
      setNews(newsFilter);
    };
    getNews();
  }, []);

  useEffect(() => {
    const loop = setInterval(() => {
      next();
    }, 10000);
    return () => clearInterval(loop);
  }, [current]);
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
        {news.map((e, index) => {
          let img = e?.contents[0]?.contentImg;
          if (!e?.contents[0]?.contentImg) {
            img = `defaultNewsImg.jpg`;
          }

          return (
            <div
              key={index}
              className={
                (current === index ? "opacity-100" : "opacity-0") +
                " absolute bg-no-repeat shrink-0 w-full h-full ease-in-out duration-500 rounded flex justify-center items-end"
              }
              style={{
                backgroundImage: `url("http://localhost:5000/images/${img}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="text-white bg-lightPurpleBlur w-10/12 h-fit shrink-0 rounded mb-4 border-l-4 border-mainRed pl-4 py-4">
                <h1 className="text-2xl font-bold">{e?.newsName}</h1>
                <h3 className="">{e?.newsShortContent}</h3>
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
      <div className="hidden h-80 md:flex md:flex flex-col ml-3 justify-between w-4/12">
        {news.map((item, index) => {
          let img = item?.contents[0]?.contentImg;
          if (!item?.contents[0]?.contentImg) {
            img = `defaultNewsImg.jpg`;
          }

          return (
            <div
              key={index}
              className="flex hover:bg-mainRedBlur py-1 px-2 cursor-pointer items-center"
            >
              <div className="flex h-32 items-center w-40 shrink-0 ">
                <img
                  src={`http://localhost:5000/images/${img}`}
                  alt=""
                  className="h-full object-cover w-full "
                />
              </div>
              <div className="flex flex-col text-white justify-center ml-1">
                <h1 className="font-bold text-sm">{item?.newsName}</h1>
                <h1 className="text-sm">
                  {!item?.newsShortContent.length > 30
                    ? item?.newsShortContent
                    : `${item?.newsShortContent.slice(0, 30)}....`}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hero;
