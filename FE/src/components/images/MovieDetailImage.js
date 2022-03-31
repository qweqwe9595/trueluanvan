import React, { useRef, useState, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import PhotoReview from "./PhotoReview";
function MovieDetailImage({ images }) {
  images = images?.filter((image, index) => index < 20);
  const sliderRef = useRef(null);
  const [slide, setSlide] = useState(false);
  const [photoReview, setPhotoReview] = useState(false);

  useEffect(() => {
    setSlide(false);
    if (
      sliderRef.current.scrollWidth >
      sliderRef.current.parentElement.offsetWidth
    ) {
      setSlide(true);
    } else {
      setSlide(false);
    }

    const resize = window.addEventListener("resize", () => {
      if (
        sliderRef.current.scrollWidth >
        sliderRef.current.parentElement.offsetWidth
      ) {
        setSlide(true);
      } else {
        setSlide(false);
      }
    });
    return () => {
      return resize;
    };
  }, []);

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
    <div className="font-dosis w-full">
      {photoReview && (
        <PhotoReview photoReview={[photoReview, setPhotoReview]} />
      )}
      <div className="flex items-center">
        <div className="h-4 w-4 bg-mainRed"></div>
        <h1 className="font-bold text-xl mx-2">PHOTOS</h1>
        <div className="h-4 grow bg-mainRed"></div>
      </div>
      <div className="flex-col h-fit text-white relative bg-transparent w-full">
        <div
          ref={sliderRef}
          className="w-full mt-2 flex gap-10 overflow-x-hidden"
        >
          {images?.map((image, index) => {
            return (
              <img
                key={index}
                className="h-60 w-40 rounded-lg shrink-0 cursor-pointer object-cover"
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                alt=""
                onClick={() =>
                  setPhotoReview(
                    `https://image.tmdb.org/t/p/w500/${image.file_path}`
                  )
                }
              />
            );
          })}
        </div>
        {slide ? (
          <>
            <div
              className="w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full absolute right-0 top-1/2 cursor-pointer"
              onClick={() => {
                next();
              }}
            >
              <FaAngleRight className="text-3xl text-mainRed" />
            </div>
            <div
              className="w-10 h-10 flex justify-center items-center bg-whiteBlur rounded-full absolute top-1/2 cursor-pointer"
              onClick={() => {
                prev();
              }}
            >
              <FaAngleLeft className="text-3xl text-mainRed" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MovieDetailImage;
