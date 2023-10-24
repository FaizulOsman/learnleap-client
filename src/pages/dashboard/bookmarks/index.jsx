import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";
import React from "react";

const jwt = require("jsonwebtoken");

const Saved = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  return (
    <div className="text-center py-10">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
        See bookmark list
      </h2>
      <button className="flex items-center  rounded-lg bg-blue-700 px-3 py-[2px] mx-auto mt-5">
        <Link href="/bookmarks">
          <h6 className="btn-text text-white">Bookmarks</h6>
        </Link>
      </button>
    </div>
  );
};

export default Saved;

Saved.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
