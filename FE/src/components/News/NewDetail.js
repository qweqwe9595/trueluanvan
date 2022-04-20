import React, { useEffect, useRef, useState } from "react";
import ErrorLogin from "../dialog/ErrorLogin";

function NewDetail({ dataProp, index, contentProp, edit, setEdit }) {
  const [data, setData] = dataProp;
  const [content, setContent] = useState(contentProp);
  const [reviewImg, setReviewImg] = useState(null);
  const [name, setName] = useState("Content's Name");
  const [text, setText] = useState("Content's Text");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const fileRef = useRef(null);

  const addContent = () => {
    const temp = data;
    temp[index] = { contentName: name, contentText: text };
    temp[index].contentImg = fileRef.current.files[0] || null;
    setData(temp);
    console.log(temp);
  };

  useEffect(() => {
    setFile(content.contentImg);
  }, [edit]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`w-full px-4 py-2 ${
        edit === index ? "hover:border hover:border-white outline-0 " : " "
      }`}
    >
      {error && <ErrorLogin message={error} close={setError} />}
      <div className="w-full flex flex-col gap-4">
        <h1
          className={`text-center text-4xl font-dosis font-bold ${
            edit === index
              ? "hover:border hover:border-dashed hover:border-white outline-0"
              : ""
          }`}
          contentEditable={edit === index ? "true" : "false"}
          onInput={(e) => {
            setName(e.target.textContent);
            addContent;
          }}
          suppressContentEditableWarning={true}
        >
          {content.contentName}
        </h1>
        <div>
          {edit == index && (
            <>
              <input
                ref={fileRef}
                type="file"
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  const imgFile = e.target.files[0];
                  console.log(imgFile);

                  if (imgFile) {
                    console.log(
                      ["imgFile.type", "image/jpeg"].includes(imgFile.type)
                    );
                    if (
                      !["imgFile.type", "image/jpeg"].includes(imgFile.type)
                    ) {
                      e.target.value = "";
                      return setError("PNG AND JPEG only");
                    }

                    setReviewImg(URL.createObjectURL(imgFile));
                    setFile(imgFile);
                    addContent();
                  }
                }}
              />
              <input
                className="px-1 bg-white text-black cursor-pointer"
                type="button"
                value="Select Image"
                onClick={() => {
                  fileRef.current.click();
                }}
              />
              <img
                className="w-full max-h-96 object-cover s"
                src={file && URL.createObjectURL(file)}
                alt=""
              />
              {file && (
                <button
                  className="text-mainRed hover:underline"
                  onClick={() => {
                    setFile(null);
                    addContent();
                    fileRef.current.value = "";
                  }}
                >
                  Delete Photo
                </button>
              )}
            </>
          )}

          {content.contentImg && edit !== index ? (
            <>
              <img
                className="w-full max-h-96 object-cover"
                src={URL.createObjectURL(content.contentImg)}
                alt=""
              />
            </>
          ) : (
            ""
          )}
        </div>
        <img />
        <p
          className={`text-xl ${
            edit === index &&
            "hover:border hover:border-dashed hover:border-white outline-0"
          }`}
          contentEditable={edit === index ? "true" : "false"}
          onInput={(e) => {
            setText(e.target.textContent);
            addContent();
          }}
          suppressContentEditableWarning={true}
        >
          {content.contentText}
        </p>
      </div>
      {edit == index && (
        <div className="px-8 flex flex-col">
          <button
            className="hover:underline hover:underline-offset-1"
            onClick={() => {
              addContent();
              setData((prev) => [
                ...prev,
                {
                  contentName: "Write name Here",
                  contentText: "Write Content Here",
                },
              ]);
              setEdit(data.length);
            }}
          >
            More Content
          </button>
        </div>
      )}
      {edit !== index && (
        <div className="px-8 flex flex-col">
          <button
            className="hover:underline hover:underline-offset-1"
            onClick={() => {
              setEdit(index);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </form>
  );
}

export default NewDetail;
