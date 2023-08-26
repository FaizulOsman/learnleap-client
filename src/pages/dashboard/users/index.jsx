import AdminLayout from "@/layouts/AdminLayout";
import Image from "next/image";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Users = () => {
  return (
    <div>
      <div class="bg-gray-100 dark:text-white  h-screen flex overflow-hidden text-sm">
        <div class="flex-grow overflow-hidden h-full flex flex-col">
          <div class="flex-grow flex overflow-x-hidden">
            <div class="flex-grow bg-[#080925] overflow-y-auto">
              <div class="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-800  sticky top-0">
                <div class="flex w-full items-center">
                  <div class="flex items-center text-lg sm:text-2xl  dark:text-white mb-5 border-l-4 pl-3">
                    All Users
                  </div>
                </div>
              </div>
              <div class="sm:p-7 p-4">
                <div class="flex w-full items-center mb-7">
                  <button class="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow   dark:border-gray-800 border border-gray-200 leading-none py-0">
                    <svg
                      viewBox="0 0 24 24"
                      class="w-4 mr-2  "
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      class="w-4 ml-1.5  "
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <button class="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow   dark:border-gray-800 border border-gray-200 leading-none py-0">
                    Filter by
                    <svg
                      viewBox="0 0 24 24"
                      class="w-4 ml-1.5  "
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div class="ml-auto  text-xs sm:inline-flex hidden items-center">
                    <span class="mr-3">Page 2 of 4</span>
                    <button class="inline-flex mr-2 items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none py-0">
                      <svg
                        class="w-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button class="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none py-0">
                      <svg
                        class="w-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
                <table class="w-full text-left">
                  <thead>
                    <tr class="">
                      <th class="font-normal sm:px-3 pt-0 pb-3 border-b border-gray-800">
                        Image
                      </th>
                      <th class="font-normal sm:px-3 pt-0 pb-3 border-b border-gray-800">
                        Name
                      </th>
                      <th class="font-normal sm:px-3 pt-0 pb-3 border-b border-gray-800 hidden sm:table-cell">
                        Email
                      </th>
                      <th class="font-normal sm:px-3 pt-0 pb-3 border-b border-gray-800">
                        Delete
                      </th>
                      <th class="font-normal sm:px-3 pt-0 pb-3 border-b border-gray-800 sm: text-white">
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody class="">
                    <tr>
                      <td class="sm:p-3 py-2 px-1 border-b border-gray-800">
                        <div class="flex items-center">
                          <Image
                            class="w-7 h-7 mr-2.5 border border-gray-800 rounded-full"
                            src="https://i.ibb.co/D70zkJV/avatar-girl-full.jpg"
                            alt="profile"
                            width={300}
                            height={300}
                          />
                        </div>
                      </td>
                      <td class="sm:p-3 py-2 border-b border-gray-800">
                        <div class="flex items-center">PayPal</div>
                      </td>
                      <td class="sm:p-3 py-2 border-b border-gray-800 sm:table-cell hidden">
                        a@gmail.com
                      </td>
                      <td class="sm:p-3 py-2 border-b text-red-500 border-gray-800">
                        <MdDeleteOutline className="w-5 h-5 cursor-pointer" />
                      </td>
                      <td class="sm:p-3 py-2 border-b text-green-500 border-gray-800">
                        <FaRegEdit className="w-5 h-5 cursor-pointer" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="flex w-full mt-5 space-x-2 justify-end">
                  <button class="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none">
                    <svg
                      class="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button class="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none">
                    1
                  </button>
                  <button class="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 bg-gray-800  leading-none">
                    2
                  </button>
                  <button class="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none">
                    3
                  </button>
                  <button class="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none">
                    4
                  </button>
                  <button class="inline-flex items-center h-8 w-8 justify-center  rounded-md shadow border border-gray-800 leading-none">
                    <svg
                      class="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
