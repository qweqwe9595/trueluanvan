import React from 'react'
import {Link} from "react-router-dom"
import {FaSearch} from "react-icons/fa"

function PollsDetail() {
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
      {/* {news.map((item, index) => {
        let img = item?.contents[0]?.contentImg;
        if (!item?.contents[0]?.contentImg) {
          img = "defaultNewsImg.jpg";
        }
        return (
          <Link
            to={`/news/${item._id}`}
            className="w-60 cursor-pointer hover:scale-125 ease-in duration-200"
            key={item._id + Date() + index}
          >
            <img
              className="w-full h-32 object-cover"
              src={`http://localhost:5000/images/${img}`}
            />
            <h1 className="text-xl ">
              {item?.newsName.length > 50
                ? item?.newsName.slice(0, 50) + " ..."
                : item?.newsName}
            </h1>
            <p>
              {item?.newsShortContent.length > 80
                ? item?.newsShortContent.slice(0, 80) + " ..."
                : item?.newsShortContent}
            </p>
          </Link>
        );
      })} */}
    </div>
  </>
  )
}

export default PollsDetail