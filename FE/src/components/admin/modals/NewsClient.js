import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/User/UserContext";

function NewsClient({ id }) {
  const [news, setNews] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/news/getone/${id}`,
          { headers: { token: user.token } }
        );
        setNews(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (!user) return;
    getNews();
  }, [user, id]);

  return (
    <div className="w-full flex flex-col gap-4 bg-lightPurple py-4 rounded-xl mt-4 text-white font-Open">
      <p className="text-center text-2xl">{news?.Name}</p>
      <div className="flex flex-col gap-4">
        <div className="w-full px-8 py-2">
          <h1 className="text-3xl text-center text-mainRed outline-0 break-words">
            asd
          </h1>
          <h3 className="text-xl outline-0 break-words">
            {news?.newsShortContent}
          </h3>
          <p className="text-right ">
            By{" "}
            <span className="text-mainRed outline-0 ">
              {news?.userId?.email}
            </span>
          </p>
        </div>
        <div className="w-7/12 border-b border-mainRedBlur m-auto"></div>
        {news?.contents?.map((item, index) => {
          const time = new Date();
          return (
            <div key={time + index} className={`w-full px-4 py-2`}>
              <div className="w-full flex flex-col gap-4">
                <h1 className={`text-center text-xl font-bold break-words`}>
                  {item?.contentName}
                </h1>
                <div>
                  <img
                    className="w-full max-h-96 object-cover"
                    src={`http://localhost:5000/images/${item?.contentImg}`}
                    alt=""
                  />
                </div>
                <p className={`text-md font-light`}>{item?.contentText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewsClient;
