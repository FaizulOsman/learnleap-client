import Loader from "@/components/UI/Loader";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetSingleExamQuery } from "@/redux/exam/examApi";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ExamResult = () => {
  const router = useRouter();
  const { examId } = router.query;
  const { data: getSingleExam } = useGetSingleExamQuery(examId);

  const allResults = getSingleExam?.data?.results;
  let results = [];
  if (allResults) {
    results = [...allResults].sort((a, b) => b.marks - a.marks);
  }
  return (
    <div>
      <div className="bg-gray-100 dark:text-white flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="flex-grow flex overflow-x-hidden">
            <div className="flex-grow bg-[#080925] overflow-y-auto">
              <div className="z-50 bg-[#080925] sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-800  sticky top-0">
                <div className="flex w-full items-center">
                  <div className="flex items-center gap-2 text-lg sm:text-2xl  dark:text-white mb-5 border-l-4 pl-3">
                    <span>Result</span>
                    <span className="text-blue-500">
                      ({getSingleExam?.data?.subject}{" "}
                      {getSingleExam?.data?.serial})
                    </span>
                  </div>
                </div>
              </div>
              <div className="sm:p-7 p-4">
                {results ? (
                  <>
                    {results?.length > 0 ? (
                      <table className="w-full text-left">
                        <thead>
                          <tr className="font-normal border-b border-gray-800">
                            <th className="sm:px-3 pt-0 pb-3">Ranking</th>
                            <th className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
                              Name
                            </th>
                            <th className="sm:px-3 pt-0 pb-3">Email</th>
                            <th className="sm:px-3 pt-0 pb-3">T. Ques.</th>
                            <th className="sm:px-3 pt-0 pb-3">Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results?.map((result, index) => (
                            <tr
                              key={index}
                              className={`border-b border-gray-800`}
                            >
                              <td className="sm:p-3 py-2 hidden sm:table-cell">
                                {index + 1}
                              </td>
                              <td className="sm:p-3 py-2 hidden sm:table-cell">
                                {result?.name}
                              </td>
                              <td className="sm:p-3 py-2 hidden sm:table-cell">
                                {result?.email}
                              </td>
                              <td className="sm:p-3 py-2 hidden sm:table-cell">
                                {getSingleExam?.data?.questions?.length}
                              </td>
                              <td className="sm:p-3 py-2 hidden sm:table-cell">
                                {result?.marks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="min-h-[30vh] flex items-center justify-center">
                        <h2 className="text-md sm:text-xl md:text-2xl text-red-500">
                          No data found
                        </h2>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="min-h-[30vh] flex items-center justify-center">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;

ExamResult.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
