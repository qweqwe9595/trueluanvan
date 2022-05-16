import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/MovieDetail";
import Rates from "./pages/Rates";
import PostNews from "./pages/News/PostNews";
import News from "./pages/News/News";
import { Routes, Route } from "react-router-dom";
import CeleDetail from "./pages/CeleDetail";
import { UserContextProvider, UserContext } from "./contexts/User/UserContext";
import { useContext, useEffect } from "react";
import { getCookie } from "./helper/cookie";
import MoviesList from "./pages/MoviesList";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Reviews from "./pages/Reviews";
import TrendingNews from "./pages/News/TrendingNews";
import Dashboard from "./components/admin/big Component/Dashboard";
import Setting from "./components/admin/big Component/Setting";
import Tables from "./components/admin/big Component/News";
import ReviewsAdmin from "./components/admin/big Component/Reviews";
import RatesAdmin from "./components/admin/big Component/Rates";
import Polls from "./pages/Polls";
import PollsDetail from "./pages/PollsDetail";

function App() {
  const [user, setUser] = useContext(UserContext);
  const params = useLocation();

  useEffect(() => {
    const userToken = getCookie("Token");
    const getUser = async () => {
      if (!userToken) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/users`, {
          headers: { token: `bearer ${userToken}` },
        });
        const resWatchLater = await axios.get(
          `http://localhost:5000/api/movielist/getdefault`,
          {
            headers: { token: `bearer ${userToken}` },
          }
        );
        const resList = await axios.get(
          `http://localhost:5000/api/movielist/getuserlist`,
          {
            headers: { token: `bearer ${userToken}` },
          }
        );

        setUser({
          ...res.data.data,
          ...{ token: `bearer ${userToken}` },
          ...{ watchLater: resWatchLater.data },
          ...{ list: resList.data },
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    getUser();
  }, [params]);

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
      <Route path="/rates" element={<Rates />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/news">
        <Route path=":id" element={<News />} />
        <Route path="trending" element={<TrendingNews />} />
        <Route path="postnew" element={<PostNews />} />a
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="" element={<Dashboard />} />
        <Route path="settings" element={<Setting />} />
        <Route path="news" element={<Tables />} />
        <Route path="rates" element={<RatesAdmin />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
      </Route>
      <Route path="/polls">
        <Route path="trending" element={<Polls />} />
        <Route path=":id" element={<PollsDetail />} />
      </Route>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
