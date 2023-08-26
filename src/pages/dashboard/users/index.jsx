import Loader from "@/components/UI/Loader";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetAllUsersQuery } from "@/redux/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [meta, setMeta] = useState({});
  console.log(meta);
  const headers = {
    authorization: accessToken,
  };

  const { data: getAssUsers } = useGetAllUsersQuery({ limit, page, headers });

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);
    setAllUsers(getAssUsers?.data);
    setMeta(getAssUsers?.meta);
  }, [getAssUsers, getAssUsers?.data]);

  return (
    <div>
      <div className="bg-gray-100 dark:text-white  h-screen flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="flex-grow flex overflow-x-hidden">
            <div className="flex-grow bg-[#080925] overflow-y-auto">
              <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-800  sticky top-0">
                <div className="flex w-full items-center">
                  <div className="flex items-center text-lg sm:text-2xl  dark:text-white mb-5 border-l-4 pl-3">
                    All Users
                  </div>
                </div>
              </div>
              <div className="sm:p-7 p-4">
                <div className="flex w-full items-center mb-7">
                  <button className="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow   dark:border-gray-800 border border-gray-200 leading-none py-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 mr-2  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Last 30 days
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 ml-1.5  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow   dark:border-gray-800 border border-gray-200 leading-none py-0">
                    Filter by
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 ml-1.5  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div className="ml-auto  text-xs sm:inline-flex hidden items-center">
                    <span className="mr-3">Page 2 of 4</span>
                    <button className="inline-flex mr-2 items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none py-0">
                      <svg
                        className="w-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button className="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none py-0">
                      <svg
                        className="w-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
                {allUsers?.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="font-normal border-b border-gray-800">
                        <th className="sm:px-3 pt-0 pb-3">Image</th>
                        <th className="sm:px-3 pt-0 pb-3">Name</th>
                        <th className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
                          Email
                        </th>
                        <th className="sm:px-3 pt-0 pb-3">Delete</th>
                        <th className="sm:px-3 pt-0 pb-3">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers?.map((user, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="sm:p-3 py-2">
                            <Image
                              src="https://i.ibb.co/D70zkJV/avatar-girl-full.jpg"
                              alt="profile"
                              className="w-7 h-7 mr-2.5 border border-gray-800 rounded-full"
                              width={50}
                              height={50}
                            />
                          </td>
                          <td className="sm:p-3 py-2">{user.name}</td>
                          <td className="sm:p-3 py-2 hidden sm:table-cell">
                            {user.email}
                          </td>
                          <td className="sm:p-3 py-2 text-red-500">
                            <MdDeleteOutline className="w-5 h-5 cursor-pointer" />
                          </td>
                          <td className="sm:p-3 py-2 text-green-500">
                            <FaRegEdit className="w-4 h-4 cursor-pointer" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="min-h-[30vh] flex items-center">
                    <Loader />
                  </div>
                )}
                <div className="flex w-full mt-5 space-x-2 justify-end">
                  <button className="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none">
                    <svg
                      className="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() => setPage(1)}
                    className="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none"
                  >
                    1
                  </button>
                  <button
                    onClick={() => setPage(2)}
                    className="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 bg-gray-800  leading-none"
                  >
                    2
                  </button>
                  <button
                    onClick={() => setPage(3)}
                    className="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none"
                  >
                    3
                  </button>
                  <button
                    onClick={() => setPage(4)}
                    className="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none"
                  >
                    4
                  </button>
                  <button className="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none">
                    <svg
                      className="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

Users.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
