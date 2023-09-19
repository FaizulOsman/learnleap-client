import DashboardLayout from "@/layouts/DashboardLayout";
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
import useProtectedRoute from "@/hooks/useProtectedRoute";

const jwt = require("jsonwebtoken");

const Dashboard = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getAllUser } = useGetAllUsersQuery({ headers });
  const { data: getAllTest } = useGetAllTestQuery({});
  const { data: getAllExam } = useGetAllExamQuery({});
  const { data: getAllExamResult } = useGetAllExamResultQuery({});
  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
