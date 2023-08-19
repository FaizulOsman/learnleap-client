import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useGetSingleExamResultQuery } from "@/redux/examResult/examResultApi";

const FindExamBySubject = ({ exam }) => {
  const [getSingleExamResult, setGetSingleExamResult] = useState({});
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);
  }, []);

  const headers = {
    authorization: accessToken,
  };

  const {
    data: aaa,
    isLoading,
    isSuccess,
    isError,
  } = useGetSingleExamResultQuery({ id: exam?.id, headers });

  useEffect(() => {
    setGetSingleExamResult(aaa);

    if (isError) {
      setGetSingleExamResult({});
    }
  }, [aaa, isLoading, isSuccess, isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
      <div>
        <h4 className="text-md font-semibold">
          {exam?.subject} {exam?.serial}
          {isSuccess &&
            getSingleExamResult?.data &&
            " (You already have submitted)"}
        </h4>
        <p>Question: {exam?.questions?.length}</p>
        <p>Time: {exam?.timeLimit} min</p>
        {isSuccess && getSingleExamResult?.data && (
          <p>Mark: {getSingleExamResult?.data?.totalMarks}</p>
        )}
      </div>
      <>
        {isSuccess && getSingleExamResult?.data ? (
          <div className="flex flex-col gap-2">
            <Link href={`/exam/${exam?.subject}/${exam?.id}`}>
              <button className="btn btn-sm btn-primary">
                Start Exam Again
              </button>
            </Link>
            <Link
              href={`/exam-result/${exam?.subject}/${exam?.id}`}
              className="flex justify-end"
            >
              <button className="btn btn-sm btn-primary">See Result</button>
            </Link>
          </div>
        ) : (
          <Link href={`/exam/${exam?.subject}/${exam?.id}`}>
            <button className="btn btn-sm btn-primary">Start Exam</button>
          </Link>
        )}
      </>
    </div>
  );
};

export default FindExamBySubject;