import AdminLayout from "@/layouts/AdminLayout";
import Link from "next/link";
import React from "react";

const Saved = () => {
  return (
    <div className="text-center my-10">
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
  return <AdminLayout>{page}</AdminLayout>;
};
