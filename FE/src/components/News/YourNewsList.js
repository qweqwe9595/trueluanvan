import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import { Link } from "react-router-dom";
import InputIcon from "@material-tailwind/react/InputIcon";
import { FaSearch } from "react-icons/fa";

function YourNewsList() {
  const [user] = useContext(UserContext);
  const [news, setNews] = useState([]);
  const [nameQuery, setNameQuery] = useState("");

  useEffect(() => {
    if (!user) return;

    const getAllNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/news/getuser", {
          headers: { token: user.token },
        });
        setNews(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getAllNews();
  }, [user]);
  console.log(user);

  return (
    <>
      <div>
        {user && (
          <Link to={`/news/postnew`} className="text-mainRed">
            Write your News
          </Link>
        )}
      </div>
      <div className="flex w-full flex-wrap font-dosis gap-4 mt-10">
        {news.map((item, index) => {
          let img = item?.contents[0]?.contentImg;
          if (!item?.contents[0]?.contentImg) {
            img = "defaultNewsImg.jpg";
          }
          return (
            <Link
              to={`/news/${item._id}`}
              className="w-60 cursor-pointer hover:scale-125 ease-in duration-200 relative"
              key={item._id + Date() + index}
            >
              {!item.approved && (
                <div className="w-full h-full bg-blackBlur absolute top-0 left-0 flex items-center justify-center">
                  Not approved Yet
                </div>
              )}

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
        })}
      </div>
    </>
  );
}

export default YourNewsList;
