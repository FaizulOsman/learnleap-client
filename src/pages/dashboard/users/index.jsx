/* eslint-disable react/jsx-key */
import Table from "@/components/UI/Table/Table";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteUserMutation,
  useGetAllUsersByQueryQuery,
  useGetMyProfileQuery,
  useUpdateUserMutation,
} from "@/redux/user/userApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const jwt = require("jsonwebtoken");

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  const { data: getAllUsers } = useGetAllUsersByQueryQuery({
    headers,
    limit,
    page,
    sortOrder,
  });
  const [
    updateUser,
    {
      isSuccess: isUpdateUserSuccess,
      isError: isUpdateUserError,
      error: updateUserError,
    },
  ] = useUpdateUserMutation();

  const [
    deleteUser,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteErrMessage,
    },
  ] = useDeleteUserMutation();
  const handleDeleteUser = (user) => {
    const isConfirmed = window.confirm(`Do you want to delete ${user?.email}`);
    if (isConfirmed) {
      deleteUser({ id: user?.id, headers });
    }
  };

  const handleSetRole = ({ user, e }) => {
    if (e.target.checked) {
      const data = { role: "admin" };
      updateUser({ id: user?.id, data, headers });
    } else {
      const data = { role: "user" };
      updateUser({ id: user?.id, data, headers });
    }

    setTimeout(() => {
      window.location.reload();
    }, [3000]);
  };

  const handlePremium = (user, value) => {
    const data = { isPremium: value };
    updateUser({ id: user?.id, data, headers });

    setTimeout(() => {
      window.location.reload();
    }, [3000]);
  };

  useEffect(() => {
    setAllUsers(getAllUsers?.data);
    setMeta(getAllUsers?.meta);

    if (isDeleteSuccess) {
      toast.success("Successfully deleted user.");
      setAllUsers(getAllUsers?.data);
    }
    if (isDeleteError) {
      toast.error(deleteErrMessage?.message || "Something went wrong");
    }

    if (isUpdateUserSuccess) {
      toast.success("Successfully Updated User.");
      setAllUsers(getAllUsers?.data);
    }
    if (isUpdateUserError) {
      toast.error(updateUserError?.message || "Something went wrong");
    }
  }, [
    getAllUsers,
    getAllUsers?.data,
    isDeleteSuccess,
    isDeleteError,
    deleteErrMessage,
    isUpdateUserSuccess,
    isUpdateUserError,
    updateUserError,
  ]);

  return (
    <div>
      <Table
        tableTitle={`All Users (${
          getAllUsers?.meta?.total ? getAllUsers?.meta?.total : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={allUsers}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th className="sm:px-3 pt-0 pb-3 hidden md:table-cell">Image</th>,
          <th className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">Name</th>,
          <th className="sm:px-3 pt-0 pb-3">Email</th>,
          <th className="sm:px-3 pt-0 pb-3">isAdmin</th>,
          <th className="sm:px-3 pt-0 pb-3">isPremium</th>,
          <th className="sm:px-3 pt-0 pb-3">Delete</th>,
          <th className="sm:px-3 pt-0 pb-3">Update</th>,
        ]}
        tableBodyData={allUsers?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="sm:p-3 py-2 hidden md:table-cell">
              <Image
                src="https://i.ibb.co/D70zkJV/avatar-girl-full.jpg"
                alt="profile"
                className="w-7 h-7 mr-2.5 border border-gray-800 rounded-full"
                width={50}
                height={50}
              />
            </td>
            <td className="sm:p-3 py-2 hidden sm:table-cell">{data.name}</td>
            <td className="sm:p-3 py-2">{data.email}</td>
            <td className="sm:p-3 py-2">
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-primary"
                checked={
                  data?.role === "admin" || data?.role === "super_admin"
                    ? true
                    : false
                }
                onClick={(e) => handleSetRole({ user: data, e })}
                disabled={
                  (data?.email === getMyProfile?.data?.email ? true : false) ||
                  (data?.role === "super_admin" ? true : false)
                }
              />
            </td>
            <td className="sm:p-3 py-2">
              {data?.isPremium ? (
                <span
                  onClick={() => handlePremium(data, false)}
                  className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100 cursor-pointer"
                >
                  Yes
                </span>
              ) : (
                <span
                  onClick={() => handlePremium(data, true)}
                  className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700 cursor-pointer"
                >
                  No
                </span>
              )}
            </td>
            <td className="sm:p-3 py-2">
              <button
                disabled={
                  (data?.email === getMyProfile?.data?.email ? true : false) ||
                  (data?.role === "super_admin" ? true : false)
                }
                className={`${
                  data?.email === getMyProfile?.data?.email ||
                  data?.role === "super_admin"
                    ? "cursor-not-allowed text-red-400"
                    : "cursor-pointer text-red-600"
                }`}
              >
                <MdDeleteOutline
                  onClick={() => handleDeleteUser(data)}
                  className={`w-5 h-5`}
                />
              </button>
            </td>
            <td className="sm:p-3 py-2 ">
              <Link
                href={
                  data?.email === getMyProfile?.data?.email ||
                  data?.role === "super_admin"
                    ? ""
                    : `/dashboard/users/update/${data?.id}`
                }
                disabled={
                  (data?.email === getMyProfile?.data?.email ? true : false) ||
                  (data?.role === "super_admin" ? true : false)
                }
                className={`${
                  data?.email === getMyProfile?.data?.email ||
                  data?.role === "super_admin"
                    ? "cursor-not-allowed text-green-400"
                    : "cursor-pointer text-green-600"
                }`}
              >
                <FaRegEdit className="w-4 h-4" />
              </Link>
            </td>
          </tr>
        ))}
      />
    </div>
  );
};

export default Users;

Users.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
