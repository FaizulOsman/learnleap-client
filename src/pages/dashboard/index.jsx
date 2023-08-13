import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};