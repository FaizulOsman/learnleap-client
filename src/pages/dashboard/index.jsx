import AdminLayout from "@/layouts/AdminLayout";
import { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from "@/redux/user/userApi";
import { useGetAllTestQuery } from "@/redux/test/testApi";
import { useGetAllExamQuery } from "@/redux/exam/examApi";
import { useGetAllExamResultQuery } from "@/redux/examResult/examResultApi";
import MyResults from "./results";
import AllTest from "./test/all-test";
import AllExam from "./exam/all-exam";
import Users from "./users";

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState("");

  const headers = {
    authorization: accessToken,
  };

  const { data: getAllUser } = useGetAllUsersQuery({ headers });
  const { data: getAllTest } = useGetAllTestQuery({});
  const { data: getAllExam } = useGetAllExamQuery({});
  const { data: getAllExamResult } = useGetAllExamResultQuery({});
  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);
  }, []);

  return (
    <div className="title">
      <div x-data="setup()">
        <div className="min-h-screen  flex flex-col flex-auto flex-shrink-0 antialiased">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            {getMyProfile?.data && getMyProfile?.data?.role === "admin" && (
              <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <svg
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-2xl">{getAllUser?.data?.length}</p>
                  <p>Users</p>
                </div>
              </div>
            )}
            {getMyProfile?.data && (
              <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
                <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                  <svg
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-2xl">0</p>
                  <p>My Submitted Exam</p>
                </div>
              </div>
            )}
            <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">{getAllTest?.data?.length}</p>
                <p>Total Test</p>
              </div>
            </div>
            <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">{getAllExam?.data?.length}</p>
                <p>Total Exam</p>
              </div>
            </div>
            <div className="bg-[#1d1836] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-900 font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-blue-900 rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-white transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">{getAllExamResult?.data?.length}</p>
                <p>Exam Participate</p>
              </div>
            </div>
          </div>
          {getMyProfile?.data && getMyProfile?.data?.role === "admin" && (
            <div className="m-4 border-2 border-blue-900 rounded-sm">
              <Users />
            </div>
          )}
          {getMyProfile?.data && (
            <div className="m-4 border-2 border-blue-900 rounded-sm">
              <MyResults />
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            {getMyProfile?.data && getMyProfile?.data?.role === "admin" && (
              <div className="border-2 border-blue-900 rounded-sm">
                <AllTest />
              </div>
            )}
            {getMyProfile?.data && getMyProfile?.data?.role === "admin" && (
              <div className="border-2 border-blue-900 rounded-sm">
                <AllExam />
              </div>
            )}
            <div className="my-4 lg:my-0">
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-[#1d1836]">
                        <th className="px-4 py-3">Client</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-[#1d1836] divide-y dark:divide-gray-700">
                      <tr className="bg-[#1d1836] hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold">Hans Burger</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                10x Developer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">$855.85</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            {" "}
                            Approved{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">15-01-2021</td>
                      </tr>
                      <tr className="bg-[#1d1836] hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;facepad=3&amp;fit=facearea&amp;s=707b9c33066bf8808c934c8ab394dff6"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold">Jolina Angelie</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Unemployed
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">$369.75</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                            {" "}
                            Pending{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">23-03-2021</td>
                      </tr>
                      <tr className="bg-[#1d1836] hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=b8377ca9f985d80264279f277f3a67f5"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold">Dave Li</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Influencer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">$775.45</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                            {" "}
                            Expired{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">09-02-2021</td>
                      </tr>
                      <tr className="bg-[#1d1836] hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold">Rulia Joberts</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Actress
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">$1276.75</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            {" "}
                            Approved{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">17-04-2021</td>
                      </tr>
                      <tr className="bg-[#1d1836] hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold">Hitney Wouston</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Singer
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">$863.45</td>
                        <td className="px-4 py-3 text-xs">
                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                            {" "}
                            Denied{" "}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">11-01-2021</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                  <span className="flex items-center col-span-3">
                    {" "}
                    Showing 21-30 of 100{" "}
                  </span>
                  <span className="col-span-2"></span>
                  <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                    <nav aria-label="Table navigation">
                      <ul className="inline-flex items-center">
                        <li>
                          <button
                            className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                            aria-label="Previous"
                          >
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            1
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            2
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                            3
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            4
                          </button>
                        </li>
                        <li>
                          <span className="px-3 py-1">...</span>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            8
                          </button>
                        </li>
                        <li>
                          <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                            9
                          </button>
                        </li>
                        <li>
                          <button
                            className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                            aria-label="Next"
                          >
                            <svg
                              className="w-4 h-4 fill-current"
                              aria-hidden="true"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
