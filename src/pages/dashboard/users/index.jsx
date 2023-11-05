/* eslint-disable react/jsx-key */
import Modal from "@/components/UI/Modal/Modal";
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
    deleteUser({ id: user?.id, headers });
  };

  const handleSetRole = ({ user, e }) => {
    if (e.target.checked) {
      const data = { role: "admin" };
      updateUser({ id: user?.id, data, headers });
    } else {
      const data = { role: "user" };
      updateUser({ id: user?.id, data, headers });
    }
  };

  const handlePremium = (user, value) => {
    const data = { isPremium: value };
    updateUser({ id: user?.id, data, headers });
  };

  useEffect(() => {
    setAllUsers(getAllUsers?.data);
    setMeta(getAllUsers?.meta);
  }, [getAllUsers?.data, getAllUsers?.meta]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Successfully deleted user.");
    }
    if (isDeleteError) {
      toast.error(deleteErrMessage?.message || "Something went wrong");
    }

    if (isUpdateUserSuccess) {
      toast.success("Successfully Updated User.");
    }
    if (isUpdateUserError) {
      toast.error(updateUserError?.message || "Something went wrong");
    }
  }, [
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
          <th key="image" className="sm:px-3 pt-0 pb-3 hidden md:table-cell">
            Image
          </th>,
          <th key="name" className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
            Name
          </th>,
          <th key="email" className="sm:px-3 pt-0 pb-3">
            Email
          </th>,
          <th key="isAdmin" className="sm:px-3 pt-0 pb-3">
            Admin
          </th>,
          <th
            key="isPremium"
            className="sm:px-3 pt-0 pb-3 hidden sm:table-cell"
          >
            Premium
          </th>,
          <th key="delete" className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
            Delete
          </th>,
          <th key="del." className="sm:px-3 pt-0 pb-3 sm:hidden table-cell">
            Del.
          </th>,
          <th key="update" className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
            Update
          </th>,
          <th key="up." className="sm:px-3 pt-0 pb-3 sm:hidden table-cell">
            Up.
          </th>,
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
            <td className="sm:p-3 py-2 hidden sm:table-cell">{data.email}</td>
            <td className="sm:p-3 py-2 sm:hidden table-cell">
              {data.email.slice(0, -7)}...
            </td>
            <td className="sm:p-3 py-2">
              <input
                type="checkbox"
                className="toggle toggle-xs sm:toggle-sm toggle-primary"
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
            <td className="sm:p-3 py-2 hidden sm:table-cell">
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
              <div
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
                <Modal
                  Button={<MdDeleteOutline className={`w-5 h-5`} />}
                  data={data}
                  modalBody={
                    <>
                      <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                        Are you sure you want to delete{" "}
                        <span className="text-error font-bold">
                          {data?.email}
                        </span>
                        ?
                      </h3>
                      <div className="py-4 text-center flex justify-around">
                        <button
                          onClick={() => {
                            handleDeleteUser(data);
                            const modal = document.getElementById(data?.id);
                            if (modal) {
                              modal.close();
                            }
                          }}
                          className="btn btn-error btn-xs sm:btn-sm text-white"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            const modal = document.getElementById(data?.id);
                            if (modal) {
                              modal.close();
                            }
                          }}
                          className="btn btn-primary btn-xs sm:btn-sm"
                        >
                          No
                        </button>
                      </div>
                    </>
                  }
                />
              </div>
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
