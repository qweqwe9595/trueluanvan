import React, { useContext } from "react";
import { ConfirmDialogContext } from "../../contexts/Dialog/dialogContext";
import axios from "axios";
import { getCookie } from "../../helper/cookie";
import { UserContext } from "../../contexts/User/UserContext";

function RateConfirm() {
  const [user] = useContext(UserContext);
  const [confirmDialog, setConfirmDialog] = useContext(ConfirmDialogContext);
  const { movieId, point } = confirmDialog;

  const ratingDb = async () => {
    try {
      const token = `bearer ${getCookie("Token")}`;
      const res = await axios.post(
        "http://localhost:5000/api/rates/rating",
        {
          movieId,
          point,
        },
        { headers: { token: user, token } }
      );
      setConfirmDialog({ open: false });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div
      className="bg-mainPurple text-black w-10/12 md:w-96  rounded-xl text-center py-10 flex flex-col gap-3 items-center relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className="absolute text-white font-bold  right-4 top-4"
        onClick={() => setConfirmDialog(false)}
      >
        X
      </button>
      <h1 className="text-yellow font-bold text-sm">RATTING CONFIRM</h1>
      <h3 className="font-bold text-white text-2xl">
        {confirmDialog?.movieName}
      </h3>
      <h4 className="font-bold text-yellow text-4xl">{confirmDialog?.point}</h4>
      <button
        className="bg-yellow px-14 rounded-xl text-white font-bold py-1 text-xl"
        onClick={() => ratingDb()}
      >
        Confirm
      </button>
    </div>
  );
}

export default RateConfirm;
