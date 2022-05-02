import React, { useContext, useRef, useState } from "react";
import JsxParser from "react-jsx-parser";
import NewDetail from "./NewDetail";
import axios from "axios";
import { UserContext } from "../../contexts/User/UserContext";

function AdminNews() {
  const [user] = useContext(UserContext);
  const [edit, setEdit] = useState(-1);
  const [newsName, setNewsName] = useState("News's Name Here");
  const [summary, setSummary] = useState("Summary Here");

  const htmlRef = useRef(null);
  const [data, setData] = useState([]);

  const postNew = async () => {
    try {
      let files = [];
      let bodyFormData = new FormData();
      bodyFormData.append("newsName", newsName.toLocaleLowerCase());
      bodyFormData.append("newsShortContent", summary);
      data.forEach((content, index) => {
        bodyFormData.append(
          `contents[${index}][contentName]`,
          content.contentName
        );
        bodyFormData.append(
          `contents[${index}][contentText]`,
          content.contentText
        );
        bodyFormData.append("newsImgs", content.contentImg);
      });

      const res = await axios.post(
        "http://localhost:5000/api/news/createone",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: user.token,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-lightPurple py-4 rounded-xl mt-4">
      <p className="text-center text-2xl">Create A News</p>
      <div className="flex flex-col gap-4" ref={htmlRef}>
        <div className="w-full px-8 py-2 hover:border hover:border-white">
          <h1
            contentEditable={edit ? true : false}
            className="text-3xl text-center text-mainRed outline-0 hover:border hover:border-dashed hover:border-white"
            onInput={(e) => {
              setNewsName(e.target.textContent);
            }}
            suppressContentEditableWarning={true}
          >
            {newsName}
          </h1>
          <h3
            className="text-xl outline-0 hover:border hover:border-dashed hover:border-white"
            contentEditable={edit ? true : false}
            onInput={(e) => {
              setSummary(e.target.textContent);
            }}
            suppressContentEditableWarning={true}
          >
            {summary}
          </h3>
          <p className="text-right ">
            By <span className="text-mainRed outline-0 ">{user?.email}</span>
          </p>
        </div>
        <div className="w-7/12 border-b border-mainRedBlur m-auto"></div>

        {data.map((item, index) => {
          const time = new Date();

          return (
            <NewDetail
              key={`${time}+${index}`}
              dataProp={[data, setData]}
              contentProp={item}
              index={index}
              edit={edit}
              setEdit={setEdit}
            />
          );
        })}
      </div>
      {edit == -1 && (
        <div className="px-8 flex flex-col">
          <button
            className="hover:underline hover:underline-offset-1"
            onClick={() => {
              setData((prev) => [
                ...prev,
                {
                  contentName: "Write name Here",
                  contentText: "Write Content Here",
                },
              ]);
              setEdit((prev) => prev + 1);
            }}
          >
            More Content
          </button>
        </div>
      )}
      <div className="px-8 flex flex-col">
        <button className="bg-mainPurple py-2" onClick={() => postNew()}>
          Done
        </button>
      </div>
    </div>
  );
}

export default AdminNews;
