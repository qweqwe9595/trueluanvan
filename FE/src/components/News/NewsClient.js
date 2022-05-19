import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import { useParams } from "react-router-dom";

function NewsClient() {
  const [news, setNews] = useState([]);
  const [user] = useContext(UserContext);
  const newsId = useParams().id;

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/news/getone/${newsId}`
        );
        setNews(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getNews();
  }, [user]);

  return (
    <div className="w-full flex flex-col gap-4 bg-lightPurple py-4 rounded-xl mt-4">
      <div className="flex flex-col gap-4">
        <div className="w-full px-8 py-2">
          <h1 className="text-3xl text-center text-mainRed outline-0">
            {news?.newsName}
          </h1>
          <h3 className="text-xl outline-0">{news?.newsShortContent}</h3>
          <p className="text-right ">
            By{" "}
            <span className="text-mainRed outline-0 ">
              {news?.userId?.userName || news?.userId?.email}
            </span>
          </p>
        </div>
        <div className="w-7/12 border-b border-mainRedBlur m-auto"></div>
        {news?.contents?.map((item, index) => {
          const time = new Date();
          return (
            <div key={time + index} className={`w-full px-4 py-2`}>
              <div className="w-full flex flex-col gap-4">
                <h1 className={`text-center text-4xl font-dosis font-bold`}>
                  {item?.contentName}
                </h1>
                <div>
                  <img
                    className="w-full max-h-96 object-cover"
                    src={`http://localhost:5000/images/${item?.contentImg}`}
                    alt=""
                  />
                </div>
                <p className={`text-xl `}>{item?.contentText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewsClient;
