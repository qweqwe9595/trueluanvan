import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";

function ProfileHero({ user }) {
  return (
    <div className="w-full flex justify-center items-center pt-12 pb-10">
      <div className="profileHero h-60 w-60 bg-lightPurple rounded-2xl flex flex-col items-center justify-between pb-7">
        <div className="flex flex-col items-center relative bottom-5">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-mainRed"
            src="https://play-lh.googleusercontent.com/UYYMhIMoJNu-3Z4FP0il1ZnH34IGxgieTSacyasT4IKsVviH7gWx0BNybaPDkDnE9hYg"
            alt=""
          />
          <div className="px-2 py-1 bg-mainRedBlur rounded-xl border-mainRed border cursor-pointer absolute top-24 hover:bg-mainRed">
            Edit Profile
          </div>
        </div>
        <h1 className="font-bold text-xl">{user?.email}</h1>
        <div className="w-full flex justify-around">
          <div className="text-center">
            <h3 className="font-bold">Reviews</h3>
            <span>{user?.rates ? user.rates.length : "0"}</span>
          </div>
          <div className="text-center">
            <h3 className="font-bold">Ratings</h3>
            <span>{user?.reviews ? user.reviews.length : "0"}</span>
          </div>
          <div className="text-center">
            <h3 className="font-bold">Rating</h3>
            <span>90</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;
