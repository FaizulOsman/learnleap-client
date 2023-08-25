/* eslint-disable react/no-children-prop */
import React from "react";
import SideBar from "../components/Sidebar/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <SideBar children={children} />
    </>
  );
};

export default AdminLayout;
