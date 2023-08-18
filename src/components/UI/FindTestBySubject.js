import { getFromLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FindTestBySubject = ({ test }) => {
  const [getSingleTestResult, setGetSingleTestResult] = useState({});

  const accessToken = getFromLocalStorage("access-token");
  const headers = {
    authorization: accessToken,
  };

  useEffect(() => {
    const accessToken = getFromLocalStorage("access-token");
    const headers = {
      authorization: accessToken,
    };

    if (headers.authorization) {
      const url = `http://localhost:5000/api/v1/test-result/${test?.id}`;
      // const url = `https://test-yourself-server.vercel.app/api/v1/test-result/${test?.id}`;
      const options = {
        method: "GET",
        headers: headers,
      };

      async function fetchData() {
        try {
          const res = await fetch(url, options);
          const data = await res.json();
          setGetSingleTestResult(data?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [headers.authorization, test]);

  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
      <div>
        <h4 className="text-md font-semibold">
          {test?.subject} {test?.serial}
          {getSingleTestResult && " (You already have submitted)"}
        </h4>
        <p>Question: {test?.questions?.length}</p>
        <p>Time: {test?.timeLimit} min</p>
        {getSingleTestResult && <p>Mark: {getSingleTestResult?.totalMarks}</p>}
      </div>
      <>
        {getSingleTestResult ? (
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
