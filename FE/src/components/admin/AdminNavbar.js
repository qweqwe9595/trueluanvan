import { useLocation, Link } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import NavbarInput from "@material-tailwind/react/NavbarInput";
import Image from "@material-tailwind/react/Image";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/User/UserContext";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const location = useLocation().pathname;
  const [user] = useContext(UserContext);
  const [userName, setUserName] = useState("admin");

  useEffect(() => {
    if (!user) return;
    setUserName(user.email);
  }, user);

  return (
    <nav className="bg-lightPurple md:ml-64 py-6 px-3">
      <div className="container max-w-full mx-auto flex items-center justify-between pr-20 md:pr-20 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar("left-0")}
          >
            <Icon name="menu" size="2xl" color="white" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("-left-64")}
            >
              <Icon name="close" size="2xl" color="white" />
            </Button>
          </div>
        </div>

        <div className="flex items-center w-full max-w-screen justify-between">
          <h4 className="uppercase text-white text-sm tracking-wider mt-1">
            {location === "/"
              ? "DASHBOARD"
              : location.toUpperCase().replace("/", "")}
          </h4>
          <div className="flex">
            <Dropdown
              color="transparent"
              buttonText={
                <div
                  className="w-12 flex items-center gap-4"
                  style={{
                    transform: "translate(-50px,0)",
                  }}
                >
                  <p className="text-white">{userName}</p>
                  <Image
                    src={`http://localhost:5000/images/${
                      user?.img || "defaultNewsImg.jpg"
                    }`}
                    rounded
                  />
                </div>
              }
              rounded
              style={{
                padding: 0,
                color: "transparent",
              }}
            >
              <DropdownItem color="lightBlue">
                <Link to={"/"}>Back To Home</Link>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
