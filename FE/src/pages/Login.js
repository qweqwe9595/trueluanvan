import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { setCookie } from "../helper/cookie";
import ErrorLogin from "../components/dialog/ErrorLogin";
import { useNavigate, Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError("fill all the field");
    }
    try {
      const resLogin = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      setCookie("Token", resLogin.data.token, 10);
      navigate("/");
    } catch (err) {
      if (err.response.data.message == "wrong user") {
        return setError("wrong user");
      }
    }
  };

  const responseFacebook = async (response) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/loginfb", {
        userName: response.name,
        email: response.id,
        password: response.id,
        img: response.picture.data.url,
      });
      setCookie("Token", res.data.token, 10);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("./stocks/img/login/bg.jpg ")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {error ? <ErrorLogin message={error} close={setError} /> : ""}
      <div className="flex flex-col items-center w-full">
        <div className="lg:hidden flex mb-16 text-white gap-10 ">
          <Link to="/register">
            <span className="text-3xl font-bold cursor-pointer">Sign In</span>
          </Link>

          <span className="text-3xl font-bold border-b-4 border-mainRed pb-1 cursor-pointer">
            Login
          </span>
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
            Login your account
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="block lg:flex items-center justify-between mt-4 cursor-pointer">
            <button
              className="lg:block hidden py-1 px-10 bg-mainRed text-2xl  rounded-md cursor-pointer"
              onClick={(e) => {
                login(e);
              }}
            >
              Login
            </button>
            <Link to={"/register"} className="float-right text-xl">
              Dont have an Account?
            </Link>
          </div>
          <div className="lg:flex hidden flex gap-10 w-full justify-center mt-10">
            <FacebookLogin
              appId="304504911838312"
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="text-blue-500 flex items-center gap-2 py-4 px-4 bg-white rounded-3xl cursor-pointer flex items-center"
              icon="fa-facebook"
            />
          </div>
          <button
            className="lg:hidden absolute py-1 px-16 bg-mainRed text-2xl font-bold rounded-2xl cursor-pointer"
            style={{
              left: "50%",
              bottom: "-35px",
              transform: "translate(-50%,-50%)",
            }}
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
        </form>
        <div className="flex mt-16 gap-10 lg:hidden">
          <FacebookLogin
            appId="304504911838312"
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="text-blue-500 flex items-center gap-2 py-4 px-4 bg-white rounded-3xl cursor-pointer flex items-center"
            icon="fa-facebook"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
