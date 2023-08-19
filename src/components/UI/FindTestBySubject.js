import { useGetSingleTestResultQuery } from "@/redux/testResult/testResultApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const FindTestBySubject = ({ test }) => {
  const [getSingleTestResult, setGetSingleTestResult] = useState({});
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
  } = useGetSingleTestResultQuery({ id: test?.id, headers });

  useEffect(() => {
    setGetSingleTestResult(aaa);

    if (isError) {
      setGetSingleTestResult({});
    }
  }, [aaa, isLoading, isSuccess, isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
      <div>
        <h4 className="text-md font-semibold">
          {test?.subject} {test?.serial}
          {isSuccess &&
            getSingleTestResult?.data &&
            " (You already have submitted)"}
        </h4>
        <p>Question: {test?.questions?.length}</p>
        <p>Time: {test?.timeLimit} min</p>
        {isSuccess && getSingleTestResult?.data && (
          <p>Mark: {getSingleTestResult?.data?.totalMarks}</p>
        )}
      </div>
      <>
        {isSuccess && getSingleTestResult?.data ? (
          <div className="flex flex-col gap-2">
            <Link href={`/test/${test?.subject}/${test?.id}`}>
              <button className="btn btn-sm btn-primary">
                Start Test Again
              </button>
            </Link>
            <Link
              href={`/test-result/${test?.subject}/${test?.id}`}
              className="flex justify-end"
            >
              <button className="btn btn-sm btn-primary">See Result</button>
            </Link>
          </div>
        ) : (
          <Link href={`/test/${test?.subject}/${test?.id}`}>
            <button className="btn btn-sm btn-primary">Start Test</button>
          </Link>
        )}
      </>
    </div>
  );
};

export default FindTestBySubject;
