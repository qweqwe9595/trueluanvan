import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

function Polls() {
  const [polls, setpolls] = useState([]);

  useEffect(() => {
    const getPolls = async () => {
      const res = await axios.get("http://localhost:5000/api/polls/getall");
      setpolls(res.data);
    };
    getPolls();
  }, []);

  return (
    <>
      <div className="relative">
        <input
          className="w-full text-whiteBlur p-2 outline-none rounded bg-transparent border font-dosis "
          outline={true}
          // onChange={(e) => {
          //   setNameQuery(e.target.value);
          //   getByName(e.target.value);
          // }}
          placeholder="Search News By Name"
        />
        <FaSearch className="absolute right-4 top-3 " />
      </div>

      <div className="flex w-full flex-wrap font-dosis gap-4 mt-10">
        {polls.map((item, index) => {
          let img = item?.pollImg || "defaultNewsImg.jpg";
          return (
            <Link
              to={`/polls/${item._id}`}
              className="w-60 cursor-pointer hover:scale-125 ease-in duration-200"
              key={item._id + Date() + index}
            >
              <img
                className="w-full h-32 object-cover"
                src={`http://localhost:5000/images/${img}`}
              />
              <h1 className="text-xl ">
                {item?.pollsName?.length > 50
                  ? item?.pollsName?.slice(0, 50) + " ..."
                  : item?.pollsName}
              </h1>
              <p>
                {item?.pollDesc?.length > 80
                  ? item?.pollDesc?.slice(0, 80) + " ..."
                  : item?.pollDesc}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Polls;
