import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/MovieDetail";
import { Routes, Route } from "react-router-dom";
import CeleDetail from "./pages/CeleDetail";
import { UserContextProvider, UserContext } from "./contexts/User/UserContext";
import { useContext, useEffect } from "react";
import { getCookie } from "./helper/cookie";
import MoviesList from "./pages/MoviesList";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

function App() {
  const [user, setUser] = useContext(UserContext);
  const params = useLocation();

  useEffect(() => {
    const userToken = getCookie("Token");
    console.log(userToken);
    const getUser = async () => {
      if (!userToken) return;
      const res = await axios.get(`http://localhost:5000/api/users`, {
        headers: { token: `bearer ${userToken}` },
      });
      setUser({ ...res.data.data, ...{ token: `bearer ${userToken}` } });
    };
    getUser();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/detail/:movieId" element={<MovieDetail />} />
      <Route path="/cele/detail/:celeId" element={<CeleDetail />} />
      <Route path="/movielist/:type" element={<MoviesList />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
