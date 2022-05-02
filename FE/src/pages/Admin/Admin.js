import React, { useContext } from "react";
import { UserContext } from "../../contexts/User/UserContext";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import "@material-tailwind/react/tailwind.css";

function Admin() {
  const [user] = useContext(UserContext);
  return (
    <div className="max-w-full">
      <Sidebar />
      <div className="md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
