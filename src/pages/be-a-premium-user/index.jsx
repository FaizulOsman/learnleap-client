import RootLayout from "@/layouts/RootLayout";
import React from "react";

const BeAPremiumUser = () => {
  return (
    <div>
      <h1 className="text-3xl text-center">Coming Soon...</h1>
    </div>
  );
};

export default BeAPremiumUser;

BeAPremiumUser.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
