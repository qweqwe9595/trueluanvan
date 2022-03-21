import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/MovieDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/detail/:movieId" element={<MovieDetail />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
