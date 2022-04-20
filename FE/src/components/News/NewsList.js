import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import { Link } from "react-router-dom";

function NewsList() {
  const [user] = useContext(UserContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      const res = await axios.get("http://localhost:5000/api/news/getall", {
        headers: { token: user.token },
      });
      setNews(res.data);
    };
    getAllNews();
  }, [user]);
  console.log(news);

  return (
    <div className="flex w-full flex-wrap font-dosis gap-4 mt-10">
      {news.map((item, index) => {
        return (
          <Link
            to={`/news/${item._id}`}
            className="w-60 cursor-pointer hover:scale-125 ease-in duration-200"
            key={item._id + Date() + index}
          >
            {item?.contents[0]?.contentImg && (
              <img
                className="w-full h-32 object-cover"
                src={`http://localhost:5000/images/${item?.contents[0]?.contentImg}`}
              />
            )}
            <h1 className="text-xl ">{item?.newsName}</h1>
            <p>{item?.newsShortContent}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default NewsList;
