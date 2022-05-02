import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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

  let img = user?.img;
  if (!img) {
    img = "defaultNewsImg.jpg";
  }

  const editProfile = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/users/${user._id}`,
        { userName, sex, dateOfBirth },
        { headers: { token: user.token } }
      );
    } catch (error) {}
  };

  return (
    <>
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
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-8 px-4 text-black">
                  <label htmlFor="">Sex: </label>
                  <select
                    className="w-42 border border-gray-500 text-black"
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
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
            onClick={(e) => setShowModal(false)}
            ripple="light"
          >
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
      <div className="w-full flex justify-center items-center pt-12 pb-10">
        <div className="profileHero h-60 w-60 bg-lightPurple rounded-2xl flex flex-col items-center justify-between pb-7">
          <div className="flex flex-col items-center relative bottom-5">
            <img
              className="w-28 h-28 rounded-full object-cover border-4 border-mainRed"
              src={`http://localhost:5000/images/${img}`}
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
