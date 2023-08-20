import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";

const UpdateTest = () => {
  return <div>Update Test</div>;
};

export default UpdateTest;

UpdateTest.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
