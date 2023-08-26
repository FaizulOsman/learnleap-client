import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

const MyProfile = () => {
  return <div>MyProfile</div>;
};

export default MyProfile;

MyProfile.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
