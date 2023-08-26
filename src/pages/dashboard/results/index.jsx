import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

const Results = () => {
  return (
    <div className="text-center my-10">
      <h1 className="text-2xl font-semibold">Coming soon...</h1>
    </div>
  );
};

export default Results;

Results.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
