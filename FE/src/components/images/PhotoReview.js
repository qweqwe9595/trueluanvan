import React from "react";

function PhotoReview({ photoReview }) {
  const [photoReviewLink, setPhotoReviewLink] = photoReview;
  return (
    <div className="fixed w-screen h-screen bg-blackBlur top-0 left-0 z-50 flex items-center justify-center">
      <span
        className="absolute top-10 right-10 text-4xl font-bold cursor-pointer"
        onClick={() => {
          setPhotoReviewLink(false);
        }}
      >
        X
      </span>
      <div>
        <img src={photoReviewLink ? photoReviewLink : ""} alt="" />
      </div>
    </div>
  );
}

export default PhotoReview;
