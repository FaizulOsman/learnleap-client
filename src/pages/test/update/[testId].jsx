import AdminLayout from "@/components/layouts/AdminLayout";
import { useRouter } from "next/router";
import React from "react";

const UpdateTest = () => {
  const router = useRouter();
  const id = router.query.testId;
  return <div>ID: {id}</div>;
};

export default UpdateTest;

UpdateTest.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
