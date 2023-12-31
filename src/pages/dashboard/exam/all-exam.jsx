import Heading from "@/components/UI/Heading";
import Loader from "@/components/UI/Loader";
import Modal from "@/components/UI/Modal/Modal";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteExamMutation,
  useGetAllExamQuery,
  useUpdateExamMutation,
} from "@/redux/exam/examApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const jwt = require("jsonwebtoken");

const AllExam = () => {
  const [examCategory, setExamCategory] = useState("English");
  const { data: allExam } = useGetAllExamQuery();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

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

  const [
    deleteExam,
    {
      isError: deleteExamIsError,
      isSuccess: deleteExamIsSuccess,
      error: deleteExamError,
    },
  ] = useDeleteExamMutation();

  const handleDeleteExam = (exam) => {
    deleteExam({ id: exam?.id, headers });
  };

  const [
    updateExam,
    {
      success,
      isSuccess: updateExamIsSuccess,
      isError: updateExamIsError,
      error: updateExamError,
    },
  ] = useUpdateExamMutation();

  const handlePublish = (exam, value) => {
    const data = {
      isPublished: value,
    };
    updateExam({ id: exam?.id, data, headers });
  };

  useEffect(() => {
    if (updateExamIsError) {
      toast.error(error?.data?.message || "Exam Update Failed!");
    }

    if (updateExamIsSuccess) {
      toast.success(success?.message || "Exam Updated Successfully!");
    }
  }, [
    updateExamIsSuccess,
    updateExamIsError,
    updateExamError,
    success?.message,
  ]);

  useEffect(() => {
    if (deleteExamIsSuccess) {
      toast.success("Exam Deleted Successfully!");
    }

    if (deleteExamIsError) {
      toast.error(deleteExamError?.data?.message || "Something Went Wrong!");
    }
  }, [deleteExamIsSuccess, deleteExamIsError, deleteExamError]);

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <Heading text="Exams" styles="text-white text-center" />
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
                <div className="flex items-center justify-between gap-4">
                  <Modal
                    Button={
                      <MdDeleteOutline
                        className={`text-2xl border-none  text-red-500 hover:text-red-60`}
                      />
                    }
                    data={exam}
                    modalBody={
                      <>
                        <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                          Do you want to delete:{" "}
                          <span className="text-error font-bold">
                            {exam?.subject} - {exam?.serial}
                          </span>
                          ?
                        </h3>
                        <div className="py-4 text-center flex justify-around">
                          <button
                            onClick={() => {
                              handleDeleteExam(exam);
                              const modal = document.getElementById(exam?.id);
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
                              const modal = document.getElementById(exam?.id);
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
                  <Link
                    href={`/dashboard/exam/update/${exam?.id}`}
                    className="flex items-center"
                  >
                    <button className="text-lg border-none text-primary hover:text-blue-600">
                      <FaRegEdit />
                    </button>
                  </Link>
                </div>
                <Link
                  href={`/dashboard/exam-result/${exam?.id}`}
                  className="border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Results
                </Link>
                {exam?.isPublished ? (
                  <button
                    onClick={() => handlePublish(exam, false)}
                    className="btn-xs border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Remove Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(exam, true)}
                    className="btn-xs border-2 border-blue-500 rounded-md px-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Make Publish
                  </button>
                )}
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
  return <DashboardLayout>{page}</DashboardLayout>;
};
