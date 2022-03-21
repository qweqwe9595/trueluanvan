import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { setCookie, getCookie, eraseCookie } from "../helper/cookie";
import axios from "axios";
import ErrorLogin from "../components/dialog/ErrorLogin";

import { useNavigate, Link } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    if (!password || !email || !passwordConfirm) {
      return setError("fill all fields");
    }
    if (password !== passwordConfirm) {
      return setError("password not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      let user = res.data.userInfo;
      user["userId"] = res.data.userInfo._id;
      setCookie("userInfo", JSON.stringify(user), 10);
      const resLogin = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      setCookie("Token", resLogin.data.token, 10);
      navigate("/login");
    } catch (err) {
      if (err.response.data.code == 11000) {
        setError("already have this email");
      } else {
        setError("something wrong");
      }
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("./stocks/img/login/bg.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {error ? <ErrorLogin message={error} close={setError} /> : ""}
      <div className="flex flex-col items-center w-full">
        <div className="lg:hidden flex mb-16 text-white gap-10 ">
          <span className="text-3xl font-bold border-b-4 border-mainRed pb-1 cursor-pointer">
            Sign In
          </span>
          <Link to="/login">
            <span className="text-3xl font-bold  cursor-pointer">Login</span>
          </Link>
        </div>
        <form
          className="lg:w-8/12 login-form px-10 py-10 w-10/12 flex flex-col text-white justify-center rounded-3xl bg-mainPurple relative"
          style={{
            backgroundImage: `url("./stocks/img/login/loginbg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="lg:text-left lg:uppercase text-center text-3xl font-bold">
            Create a new account
          </h1>
          <label className="ml-2 mt-4">Email</label>
          <input
            className="py-2 px-4 rounded-3xl mt-2 focus:outline-0"
            style={{ color: "#413636" }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="ml-2 mt-2">Password</label>
          <input
            className="py-2 px-4 rounded-3xl mt-2 focus:outline-0"
            style={{ color: "#413636" }}
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label className="ml-2 mt-2">Password Confirm</label>
          <input
            className="py-2 px-4 rounded-3xl mt-2 focus:outline-0"
            style={{ color: "#413636" }}
            type="text"
            placeholder="Password Confirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <div className="flex items-center justify-between mt-4 cursor-pointer">
            <button className="lg:block hidden py-1 px-10 bg-mainRed text-2xl rounded-md cursor-pointer">
              Sign In
            </button>
            <span className="float-right">Already Have Account?</span>
          </div>
          <div className="lg:flex hidden flex gap-10 w-full justify-center mt-10">
            <div className="py-1 px-14 bg-white rounded-xl cursor-pointer">
              <FcGoogle style={{ color: "#059BE5", fontSize: "40px" }} />
            </div>
            <div className="py-1 px-14 bg-white rounded-xl cursor-pointer">
              <FaFacebook style={{ color: "#059BE5", fontSize: "40px" }} />
            </div>
          </div>
          <button
            className="lg:hidden absolute py-1 px-16 bg-mainRed text-2xl font-bold rounded-2xl cursor-pointer"
            style={{
              left: "50%",
              bottom: "-35px",
              transform: "translate(-50%,-50%)",
            }}
            onClick={(e) => signIn(e)}
          >
            Sign In
          </button>
        </form>
        <div className="flex mt-16 gap-10 lg:hidden">
          <div className="py-2 px-14 bg-white rounded-3xl cursor-pointer">
            <FcGoogle style={{ color: "#059BE5", fontSize: "40px" }} />
          </div>
          <div className="py-2 px-14 bg-white rounded-3xl cursor-pointer">
            <FaFacebook style={{ color: "#059BE5", fontSize: "40px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
