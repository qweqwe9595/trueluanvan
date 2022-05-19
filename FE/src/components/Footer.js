import React from "react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full border-t-2 border-mainRed mt-6 flex flex-col items-center py-4 px-5">
      <div className="flex font-bold gap-10">
        <span>Help</span>
        <span>IMDB.com</span>
        <span>Term of use</span>
      </div>
      <div className="text-center">
        Currently, people's demand to watch movies is increasing in parallel
        with the need to learn more about movie information and evaluate them.
        The building of a movie information and rating website helps people
        better understand the movies they've seen or are about to see, from
        which they can choose the right product, in addition, users can also
        rate based on their feelings. his personal about the movie. Therefore,
        "Developing a web application to display and review movies" is
        considered a solution to help users express their personal views about
        the movie.
      </div>
      <div>
        <h1 className="font-bold">Coppy right by Phạm Hoàng Duy</h1>
        <div className="flex w-full justify-center text-mainRed gap-4">
          <FaFacebookSquare className="text-4xl cursor-pointer" />
          <FaTwitterSquare className="text-4xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
