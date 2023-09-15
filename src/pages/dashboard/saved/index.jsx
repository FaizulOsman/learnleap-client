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
      <h1 className="text-2xl font-semibold">See bookmark list</h1>
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
