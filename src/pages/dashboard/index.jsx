import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} from "@/redux/user/userApi";
import { useGetAllTestQuery } from "@/redux/test/testApi";
import { useGetAllExamQuery } from "@/redux/exam/examApi";
import {
  useGetAllExamResultQuery,
  useGetMySubmittedResultsQuery,
} from "@/redux/examResult/examResultApi";
import MyResults from "./results";
import AllTest from "./test/all-test";
import AllExam from "./exam/all-exam";
import Users from "./users";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardHomepageCard from "@/components/Dashboard/DashboardHomepageCard";
import { AiOutlineBarChart } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLineChart } from "react-icons/bi";

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
  const { data: getMySubmittedResults } = useGetMySubmittedResultsQuery({
    headers,
  });

  return (
    <div className="title">
      <div x-data="setup()">
        <div className="min-h-screen  flex flex-col flex-auto flex-shrink-0 antialiased">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            {getMyProfile?.data && getMyProfile?.data?.role === "admin" && (
              <DashboardHomepageCard
                icon={<HiOutlineUserGroup className="w-7 h-7" />}
                title="Total Users"
                count={getAllUser?.meta?.total}
              />
            )}
            {getMyProfile?.data && (
              <DashboardHomepageCard
                icon={<BsBarChartLine className="w-7 h-7" />}
                title="My Submitted Exam"
                count={getMySubmittedResults?.meta?.total}
              />
            )}
            <DashboardHomepageCard
              icon={<AiOutlineBarChart className="w-7 h-7" />}
              title="Total Test"
              count={getAllTest?.meta?.total}
            />
            <DashboardHomepageCard
              icon={<AiOutlineBarChart className="w-7 h-7" />}
              title="Total Exam"
              count={getAllExam?.meta?.total}
            />
            <DashboardHomepageCard
              icon={<BiLineChart className="w-7 h-7" />}
              title="Exam Participate"
              count={getAllExamResult?.meta?.total}
            />
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
