import React, { useRef, useState } from "react";

function AdminNews() {
  const [edit, setEdit] = useState(true);
  const [contentAmount, setContentAmount] = useState(0);
  const [reviewImg, setReviewImg] = useState(null);
  const htmlRef = useRef(null);

  const getEditData = () => {
    setEdit(false);
    const trim = htmlRef.current.outerHTML.replace(
      `contenteditable="true"`,
      ""
    );
    trim.replace("hover:border hover:border-white", "");
    trim.replace("hover:border hover:border-dashed hover:border-mainRed", "");
    setTest(trim);
  };
  return (
    <div className="w-full flex flex-col gap-4 bg-lightPurple  py-4 rounded-xl mt-4">
      <p className="text-center text-2xl">Create A News</p>
      <div className="flex flex-col gap-4" ref={htmlRef}>
        <div className="w-full px-8 py-2 hover:border hover:border-white">
          <h1
            contentEditable={edit ? true : false}
            className="text-3xl text-center text-mainRed outline-0 hover:border hover:border-dashed hover:border-mainRed"
            onInput={(e) => setNewName(e.currentTarget.textContent)}
            suppressContentEditableWarning={true}
          >
            News's Name
          </h1>
          <h3
            className="text-xl outline-0 hover:border hover:border-dashed hover:border-mainRed"
            onInput={(e) => setShortContent(e.currentTarget.textContent)}
            contentEditable={edit ? true : false}
            suppressContentEditableWarning={true}
          >
            New short content
          </h3>
          <p className="text-right ">
            By{" "}
            <span className="text-mainRed outline-0 hover:border hover:border-dashed hover:border-mainRed">
              ipsum
            </span>
          </p>
        </div>
        <div className="w-7/12 border-b border-mainRedBlur m-auto "></div>
        <div className="hover:border hover:border-white">
          {Array(contentAmount)
            .fill("dummy")
            ?.map((item, index) => {
              const time = new Date().getTime().toString() + index;
              return (
                <div key={time} className="w-full px-4 py-2">
                  <div className="w-full flex flex-col gap-4">
                    <h1
                      className="text-center text-4xl font-dosis font-bold hover:border hover:border-dashed hover:border-mainRed outline-0"
                      contentEditable={edit ? true : false}
                      suppressContentEditableWarning={true}
                    >
                      Content's Name
                    </h1>
                    <div>
                      <input
                        type="file"
                        onChange={(e) => {
                          const [file] = e.target.files;
                          if (file) {
                            setReviewImg(URL.createObjectURL(file));
                          }
                        }}
                      />
                      {reviewImg && (
                        <>
                          <img
                            className="w-full max-h-96 object-cover"
                            src={reviewImg}
                            alt=""
                          />
                          <button
                            className="text-mainRed hover:underline"
                            onClick={() => {
                              setReviewImg(null);
                            }}
                          >
                            Delete Photo
                          </button>
                        </>
                      )}
                    </div>
                    <img />
                    <p
                      className="text-xl hover:border hover:border-dashed hover:border-mainRed outline-0"
                      contentEditable={edit ? true : false}
                      suppressContentEditableWarning={true}
                    >
                      Content
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {edit && (
        <div className="px-8 flex flex-col">
          <button
            className="hover:underline hover:underline-offset-1"
            onClick={() => setContentAmount((prev) => prev + 1)}
          >
            More Content
          </button>
          <button className="bg-mainPurple py-2" onClick={() => getEditData()}>
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminNews;
