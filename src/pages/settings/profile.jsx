import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
