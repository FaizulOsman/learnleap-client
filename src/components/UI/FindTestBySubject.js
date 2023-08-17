import { useGetSingleTestResultQuery } from "@/redux/testResult/testResultApi";
import { getFromLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import React from "react";

const FindTestBySubject = ({ test }) => {
  const accessToken = getFromLocalStorage("access-token");
  const headers = {
    authorization: accessToken,
  };

  const { data: getSingleTestResult } = useGetSingleTestResultQuery({
    id: test?.id,
    headers,
  });
  console.log(getSingleTestResult?.data?.totalMarks);

  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
      <div>
        <h4 className="text-md font-semibold">
          {test?.subject} {test?.serial}
          {getSingleTestResult?.data && " (You already have submitted)"}
        </h4>
        <p>Question: {test?.questions?.length}</p>
        <p>Time: {test?.timeLimit} min</p>
        {getSingleTestResult && (
          <p>Mark: {getSingleTestResult?.data?.totalMarks}</p>
        )}
      </div>
      <Link href={`/test/${test?.subject}/${test?.id}`}>
        {getSingleTestResult ? (
          <button className="btn btn-sm btn-primary">Start Test Again</button>
        ) : (
          <button className="btn btn-sm btn-primary">Start Test</button>
        )}
      </Link>
    </div>
  );
};

export default FindTestBySubject;
