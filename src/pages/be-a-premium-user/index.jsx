import useProtectedRoute from "@/hooks/useProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import React from "react";

const jwt = require("jsonwebtoken");

const BeAPremiumUser = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

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
