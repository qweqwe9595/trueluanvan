import React, { useContext, useRef, useState } from "react";
import JsxParser from "react-jsx-parser";
import NewDetail from "./NewDetail";
import axios from "axios";
import { UserContext } from "../../contexts/User/UserContext";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { useNavigate } from "react-router-dom";

function AdminNews() {
  const [user] = useContext(UserContext);
  const [edit, setEdit] = useState(-1);
  const [newsName, setNewsName] = useState("News's Name Here");
  const [summary, setSummary] = useState("Summary Here");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  console.log(newsName);

  const htmlRef = useRef(null);
  const [data, setData] = useState([]);

  const postNew = async () => {
    try {
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
        if (content.contentImg) {
          let file = content.contentImg;
          const myNewFile = new File(
            [content.contentImg],
            `${index}${content.contentImg.name}`,
            { type: content.contentImg.type }
          );
          bodyFormData.append("newsImgs", file);
        }
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
    } catch (error) {
      console.log(error.response);
    }
  };

  function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel,
      range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }

  return (
    <div className="w-full flex flex-col gap-4 bg-lightPurple py-4 rounded-xl mt-4">
      {showModal && (
        <Modal size="xl" active={showModal} toggler={() => setShowModal(false)}>
          <ModalHeader toggler={() => setShowModal(false)}>
            Submit to admin ?
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              color="green"
              onClick={(e) => {
                setShowModal(false);
                postNew();
                navigate("/news/trending");
              }}
              ripple="light"
            >
              Yes
            </Button>
            <Button
              color="red"
              onClick={(e) => {
                setShowModal(false);
              }}
              ripple="light"
            >
              No
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <p className="text-center text-2xl">Create A News</p>
      <div className="flex flex-col gap-4" ref={htmlRef}>
        <div className="w-full px-8 py-2 hover:border hover:border-white">
          <h1
            contentEditable={edit ? true : false}
            className="text-3xl text-center text-mainRed outline-0 hover:border hover:border-dashed hover:border-white max-w-full break-words"
            onInput={(e) => {
              // e.target.html(getCaretPosition(e.target));
              setNewsName(e.target.textContent);
            }}
            suppressContentEditableWarning={true}
          >
            News's Name
          </h1>
          <h3
            className="text-xl outline-0 hover:border hover:border-dashed hover:border-white break-words"
            contentEditable={edit ? true : false}
            onInput={(e) => {
              setSummary(e.target.textContent);
              // e.target.html(getCaretPosition(e.target));
            }}
            suppressContentEditableWarning={true}
          >
            Summary Here
          </h3>
          <p className="text-right ">
            By{" "}
            <span className="text-mainRed outline-0 ">
              {user?.userName || user?.email}
            </span>
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
        <button
          className="bg-mainPurple py-2"
          onClick={() => {
            console.log(data);
            setShowModal(true);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default AdminNews;
