import Loader from "@/components/UI/Loader";
import AdminLayout from "@/layouts/AdminLayout";
import {
  useDeleteExamMutation,
  useGetAllExamQuery,
} from "@/redux/exam/examApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const AllExam = () => {
  const [examCategory, setExamCategory] = useState("English");
  const { data: allExam } = useGetAllExamQuery();

  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);
  }, []);
  const headers = {
    authorization: accessToken,
  };

  const examUniqueSubjects = [];
  allExam?.data?.map((exam) => {
    if (examUniqueSubjects?.length > 0) {
      const isSubjectExist = examUniqueSubjects?.find(
        (item) => item?.subject === exam?.subject
      );

      if (!isSubjectExist) {
        examUniqueSubjects.push(exam);
      }
    } else {
      examUniqueSubjects.push(exam);
    }
  });

  const filterByExamSubject = allExam?.data?.filter((exam) => {
    return exam?.subject === examCategory;
  });

  const [deleteExam, { isError, isLoading, isSuccess, error }] =
    useDeleteExamMutation();

  const handleDeleteExam = (exam) => {
    const isConfirm = window.confirm(
      `Do you want to delete: ${exam?.subject} ${exam?.serial}`
    );
    if (isConfirm) {
      deleteExam({ id: exam?.id, headers });
    }
  };

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-8">Exams</h1>
        {examUniqueSubjects && examUniqueSubjects.length > 0 ? (
          <div className="w-10/12 md:w-8/12 mx-auto flex flex-wrap justify-around gap-3">
            {examUniqueSubjects?.map((exam, index) => (
              <div
                key={index}
                onClick={() => setExamCategory(exam?.subject)}
                className={`relative mb-2 min-w-[96px] text-center hover:bg-green-500 px-2 py-1 rounded-md cursor-pointer hover:text-white font-semibold ${
                  examCategory === exam?.subject
                    ? "bg-green-500"
                    : " bg-[#1d1836]"
                }`}
              >
                {examCategory === exam?.subject && (
                  <div className="absolute top-full left-[45%] triangle_down border-l-[7px] border-r-[7px] border-t-[10px] border-t-green-500 border-transparent"></div>
                )}
                {exam?.subject}
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
        <div className="mt-10 flex flex-col gap-5">
          {filterByExamSubject?.map((exam, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#1d1836] p-2 rounded-md"
            >
              <div>
                <h4 className="text-md font-semibold">
                  {exam?.subject} {exam?.serial}
                </h4>
                <p>Question: {exam?.questions?.length}</p>
                <p>Time: {exam?.timeLimit} min</p>
              </div>
              <div className="flex flex-col items-center justify-between gap-4">
                <Link href={`/dashboard/exam/update/${exam?.id}`}>
                  <button className="text-lg border-none text-primary hover:text-blue-600">
                    <FaRegEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteExam(exam)}
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

export default AllExam;

AllExam.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};