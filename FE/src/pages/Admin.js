import React, { useContext } from "react";
import { UserContext } from "../contexts/User/UserContext";
import { Outlet } from "react-router-dom";

function Admin() {
  const [user] = useContext(UserContext);
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Admin;
