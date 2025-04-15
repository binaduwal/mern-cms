import React from "react";
import { Outlet } from "react-router-dom";
import DashNav from "./DashNav";

const UserDashboard = () => {
  return (
    <div className=" flex ">
      <div className=" absolute z-[30]">
      <DashNav />
      </div>
      <div className=" flex-1 container mb-10 ml-16 lg:ml-24">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
