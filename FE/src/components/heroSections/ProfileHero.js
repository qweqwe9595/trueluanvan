import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { UserContext } from "../../contexts/User/UserContext";
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import InputIcon from "@material-tailwind/react/InputIcon";

function ProfileHero({ rateAmount, reviewAmount }) {
  const [user, setUser] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [sex, setSex] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [previewURL, setPreviewUrl] = useState(
    "/stocks/img/avatar/avatarDefault.jpg"
  );
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const fileRef = useRef(null);

  const editProfile = async () => {
    try {
      if (!userName || !sex || !dateOfBirth || !fileRef.current.files.length)
        return;
      var formData = new FormData();
      formData.append("userName", userName);
      formData.append("sex", sex);
      formData.append("dateOfBirth", dateOfBirth);
      console.log(fileRef.current.files.length);
      if (fileRef.current.files.length !== 0) {
        formData.append("img", fileRef.current.files[0]);
      }
      const res = await axios.patch(
        "http://localhost:5000/api/users/626bf6a790ae97313b35bdb4",
        formData,
        { headers: { token: user?.token } }
      );
      console.log(res.data);
      const resUpdate = await axios.get("http://localhost:5000/api/users", {
        headers: { token: user?.token },
      });
      setUser((prev) => {
        return { ...prev, ...resUpdate.data.data };
      });
      setShowModal(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
          <ModalHeader toggler={() => setShowModal(false)}>
            Edit Profile
          </ModalHeader>
          <ModalBody>
            <div className="w-96">
              <Card>
                <CardBody>
                  <div className="mt-4 mb-8 px-4">
                    <InputIcon
                      type="text"
                      color="lightBlue"
                      placeholder="Name"
                      iconName="account_circle"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-4 mb-8 px-4 text-black font-bold">
                    <p>Avatar</p>
                    <input
                      ref={fileRef}
                      type="file"
                      name="photo"
                      required
                      onChange={function (e) {
                        if (e.target.files[0]) {
                          setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                    <img src={previewURL} className="photo-preview" />
                  </div>
                  <div className="mb-8 px-4 text-black">
                    <label htmlFor="">Sex: </label>
                    <select
                      className="w-42 border border-gray-500 text-black"
                      onChange={(e) => {
                        setSex(e.target.value);
                      }}
                      required
                    >
                      <option value={true}>Male</option>
                      <option value={false}>Female</option>
                    </select>
                  </div>
                  <div className="mb-4 px-4 text-black">
                    <label htmlFor="">Date of birth: </label>
                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      min="1900-01-01"
                      max="2018-12-31"
                      required
                      value={dateOfBirth}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
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

            <Button
              color="green"
              onClick={(e) => {
                editProfile();
              }}
              ripple="light"
            >
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </form>

      <div className="w-full flex justify-center items-center pt-12 pb-10">
        <div className="profileHero h-60 w-60 bg-lightPurple rounded-2xl flex flex-col items-center justify-between pb-7">
          <div className="flex flex-col items-center relative bottom-5">
            <img
              className="w-28 h-28 rounded-full object-cover border-4 border-mainRed"
              src={`http://localhost:5000/images/${
                user?.img || "defaultNewsImg.jpg"
              }`}
              alt=""
            />
            <div
              className="px-2 py-1 bg-mainRedBlur rounded-xl border-mainRed border cursor-pointer absolute top-24 hover:bg-mainRed"
              onClick={(e) => setShowModal(true)}
            >
              Edit Profile
            </div>
          </div>
          <h1 className="font-bold text-xl">{user?.userName}</h1>
          <div className="w-full flex justify-around">
            <div className="text-center">
              <h3 className="font-bold">Reviews</h3>
              <span>{reviewAmount || 0}</span>
            </div>
            <div className="text-center">
              <h3 className="font-bold">Ratings</h3>
              <span>{rateAmount || 0}</span>
            </div>
            <div className="text-center">
              <h3 className="font-bold">Polls</h3>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHero;
