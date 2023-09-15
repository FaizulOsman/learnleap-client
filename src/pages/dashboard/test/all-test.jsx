import Loader from "@/components/UI/Loader";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteTestMutation,
  useGetAllTestQuery,
} from "@/redux/test/testApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const jwt = require("jsonwebtoken");

const AllTest = () => {
  const [testCategory, setTestCategory] = useState("English");
  const { data: allTest } = useGetAllTestQuery();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const testUniqueSubjects = [];
  allTest?.data?.map((test) => {
    if (testUniqueSubjects?.length > 0) {
      const isSubjectExist = testUniqueSubjects?.find(
        (item) => item?.subject === test?.subject
      );

      if (!isSubjectExist) {
        testUniqueSubjects.push(test);
      }
    } else {
      testUniqueSubjects.push(test);
    }
  });

  const filterByTestSubject = allTest?.data?.filter((exam) => {
    return exam?.subject === testCategory;
  });

  const [deleteTest, { isError, isLoading, isSuccess, error }] =
    useDeleteTestMutation();

  const handleDeleteTest = (test) => {
    const isConfirm = window.confirm(
      `Do you want to delete: ${test?.subject} ${test?.serial}`
    );
    if (isConfirm) {
      deleteTest({ id: test?.id, headers });
    }
  };

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Tests</h1>
        {testUniqueSubjects && testUniqueSubjects.length > 0 ? (
          <div className="w-10/12 md:w-8/12 mx-auto flex flex-wrap justify-around gap-3">
            {testUniqueSubjects?.map((test, index) => (
              <div
                key={index}
                onClick={() => setTestCategory(test?.subject)}
                className={`relative mb-2 min-w-[96px] text-center hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer hover:text-white font-semibold ${
                  testCategory === test?.subject
                    ? "bg-blue-500"
                    : "bg-[#1d1836]"
                }`}
              >
                {testCategory === test?.subject && (
                  <div className="absolute top-full left-[45%] triangle_down border-l-[7px] border-r-[7px] border-t-[10px] border-t-blue-500 border-transparent"></div>
                )}
                {test?.subject}
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
        <div className="mt-10 flex flex-col gap-5">
          {filterByTestSubject?.map((test, index) => (
            <div
              key={index}
              className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
            >
              <div>
                <h4 className="text-md font-semibold">
                  {test?.subject} {test?.serial}
                </h4>
                <p>Question: {test?.questions?.length}</p>
                <p>Time: {test?.timeLimit} min</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-4">
                <Link href={`/dashboard/test/update/${test?.id}`}>
                  <button className="text-lg border-none text-primary hover:text-blue-600">
                    <FaRegEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteTest(test)}
                  className="text-2xl border-none  text-red-500 hover:text-red-600"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTest;

AllTest.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
