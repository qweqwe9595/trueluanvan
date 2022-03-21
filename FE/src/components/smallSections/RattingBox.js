import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { ConfirmDialogContext } from "../../contexts/Dialog/dialogContext";

function RattingBox({ movie }) {
  const [confirmDialog, setConfirmDialog] = useContext(ConfirmDialogContext);
  const [ratingValue, setRatingValue] = useState(0);
  const rating = () => {
    if (!ratingValue) {
      setRatingValue(3);
    }
    setConfirmDialog({
      open: "true",
      movieId: movie.id,
      point: ratingValue,
      movieName: movie.title,
    });
  };

  return (
    <>
      <div className="flex flex-row-reverse bg-white px-2 py-1 rounded-xl border-whiteC4 border-4 gap-1 text-black">
        {[...Array(5)].map((star, index) => {
          return (
            <div key={index}>
              <input
                className="hidden"
                id={`radio${index + 1}`}
                key={index}
                type="radio"
                value={index + 1}
              />
              <label className="cursor-pointer" htmlFor={`radio${index + 1}`}>
                <FaStar
                  color={index + 1 <= ratingValue ? "#DD003F" : "#e4e6e9"}
                  value={index + 1}
                  id={index + 1}
                  onMouseEnter={(e) => {
                    setRatingValue(e.target.getAttribute("value"));
                  }}
                  onClick={() => {
                    rating();
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RattingBox;
