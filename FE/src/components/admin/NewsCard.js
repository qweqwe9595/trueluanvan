import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/Dropdown";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import NewsClient from "./modals/NewsClient";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/User/UserContext";

export default function NewsCard() {
  const [user] = useContext(UserContext);
  const [allNews, setAllNews] = useState([]);
  const [news, setNews] = useState([]);
  const [fillter, setFillter] = useState("pending");
  const [reviewId, setReviewId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getAllNews = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/news/getall?query=user",
          {
            headers: { token: user.token },
          }
        );
        setAllNews(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getAllNews();
  }, [user, reviewId]);

  useEffect(() => {
    switch (fillter) {
      case "pending": {
        const temp = allNews.filter((item) => item.approved === false);
        setNews(temp);
        break;
      }
      case "approved": {
        const temp = allNews.filter((item) => item.approved === true);
        setNews(temp);
        break;
      }
      case "all": {
        setNews(allNews);
        break;
      }
      default: {
        return;
      }
    }
  }, [allNews, fillter]);
  const approving = () => {
    if (!reviewId) return;
    axios
      .patch(`http://localhost:5000/api/news/approving/${reviewId}`)
      .then((res) => {
        setReviewId(null);
      });
  };

  const deleting = async () => {
    if (!reviewId) return;
    console.log(reviewId);
    const rest = await axios
      .delete(`http://localhost:5000/api/news/delete/${reviewId}`)
      .then((res) => {
        setReviewId(null);
      });
    setReviewId(null);
  };

  return (
    <>
      {reviewId && (
        <Modal
          size="3xl"
          active={showModal}
          toggler={() => setShowModal(false)}
        >
          <ModalHeader toggler={() => setShowModal(false)}>
            Modal Title
          </ModalHeader>
          <ModalBody>
            <div className="">
              <NewsClient id={reviewId} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => setShowModal(false)}
              ripple="dark"
            >
              Close
            </Button>
            {fillter === "pending" && (
              <Button
                color="green"
                onClick={(e) => {
                  setShowModal(false);
                  approving();
                }}
                ripple="light"
              >
                Approved
              </Button>
            )}

            <Button
              color="red"
              onClick={(e) => {
                setShowModal(false);
                deleting();
              }}
              ripple="light"
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      )}

      <Card>
        <div
          className="w-full h-28 flex items-center px-6 rounded-xl
      bg-gradient-to-bl from-mainPurple to-lightPurple "
        >
          <div className="flex w-full justify-between">
            <h2 className="text-white text-2xl">News</h2>
            <h2 className="text-white  flex cursor-pointer">
              <Dropdown
                color="transparent"
                buttonText={
                  <div className="w-12 flex items-center text-white">
                    <span className="text-2xl font-normal flex">
                      Fillter
                      <Icon
                        name={"arrow_drop_down"}
                        size="2xl"
                        color={"white"}
                      ></Icon>
                    </span>
                  </div>
                }
                rounded
                style={{
                  padding: 0,
                  color: "transparent",
                }}
              >
                <div className="flex flex-col">
                  <div
                    className="text-black hover:bg-lightPurple px-2 py-1 rounded-xl hover:text-white ease-in duration-100"
                    onClick={() => {
                      setFillter(`all`);
                    }}
                  >
                    All
                  </div>
                  <div
                    className="text-black hover:bg-lightPurple px-2 py-1 rounded-xl hover:text-white ease-in duration-100"
                    onClick={() => {
                      setFillter(`pending`);
                    }}
                  >
                    Pending
                  </div>
                  <div
                    className="text-black hover:bg-lightPurple px-2 py-1 rounded-xl hover:text-white ease-in duration-100"
                    onClick={() => {
                      setFillter(`approved`);
                    }}
                  >
                    Approved
                  </div>
                </div>
              </Dropdown>
            </h2>
          </div>
        </div>
        <CardBody>
          <div className="overflow-x-auto max-h-96 overflow-scroll">
            <table className="items-center w-full bg-transparent border-collapse ">
              <thead>
                <tr>
                  <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    News's Name
                  </th>
                  <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Owner
                  </th>
                  <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Status
                  </th>
                  <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {news?.map((item, index) => {
                  return (
                    <tr
                      key={new Date() + index}
                      className="cursor-pointer"
                      onClick={() => {
                        setReviewId(item._id);
                        setShowModal(true);
                      }}
                    >
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {item?.newsName}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {item?.userId?.email}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left ">
                        {item?.approved ? (
                          <i className="fas fa-circle fa-sm text-green mr-2">
                            <span className="text-black font-normal text-sm font-sans ml-1">
                              Approved
                            </span>
                          </i>
                        ) : (
                          <i className="fas fa-circle fa-sm text-yellow mr-2">
                            <span className="text-black font-normal text-sm font-sans ml-1">
                              Pending
                            </span>
                          </i>
                        )}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {new Date(item?.createdAt).toDateString(`en`)}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
