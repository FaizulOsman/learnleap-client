/* eslint-disable react/no-children-prop */
import React from "react";
import SideBar from "../Sidebar/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <SideBar children={children} />
    </>
  );
};

export default AdminLayout;
