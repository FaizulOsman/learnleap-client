import ExamAnswerSingleQues from "@/components/UI/ExamAnswerSingleQues";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import { useGetSingleExamQuery } from "@/redux/exam/examApi";
import { useGetSingleExamResultQuery } from "@/redux/examResult/examResultApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const jwt = require("jsonwebtoken");

const SingleExam = () => {
  const router = useRouter();
  const { resultSegments } = router.query;
  const { data: getSingleExam } = useGetSingleExamQuery(resultSegments?.[1]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [eyeShow, setEyeShow] = useState(false);
  const [ques, setQues] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getSingleExamResult } = useGetSingleExamResultQuery({
    id: resultSegments?.[1],
    headers,
  });

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  if (router && getSingleExam?.data?.timeLimit > 0) {
    if (isRunning === false) {
      setIsRunning(true);
    }
  }

  const allResults = getSingleExam?.data?.results;
  let results = [];
  if (allResults) {
    results = [...allResults].sort((a, b) => b.marks - a.marks);
  }

  useEffect(() => {
    if (getSingleExamResult?.data) {
      setEyeShow(true);
    }
  }, [getSingleExamResult]);

  return (
    <div>
      <>
        <div className="w-11/12 md:w-8/12 mx-auto my-14">
          <h2 className="text-3xl font-semibold text-center mb-5">
            {resultSegments?.[0]} Exam {getSingleExam?.data?.serial}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 font-semibold">
            <div className="text-center sm:text-start">
              <p>Total Question: {getSingleExam?.data?.questions?.length}</p>
              <p>
                Total Attempted: {getSingleExamResult?.data?.totalAttempted}
              </p>
              <p className="text-green-500">
                Total Marks: {getSingleExamResult?.data?.totalMarks}
              </p>
            </div>
            <div className="text-center sm:text-end">
              <p>Correct Answer: {getSingleExamResult?.data?.correctAnswer}</p>
              <p>Wrong Answer: {getSingleExamResult?.data?.wrongAnswer}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {getSingleExam?.data?.questions?.map((exam, index) => (
              <ExamAnswerSingleQues
                key={index}
                exam={exam}
                index={index}
                count={count}
                setCount={setCount}
                ques={ques}
                setQues={setQues}
                eyeShow={eyeShow}
                result={getSingleExamResult}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/" className="btn btn-primary modal-button">
              Return Home
            </Link>
          </div>
          <div className="mt-16">
            <h3 className="text-xl font-bold text-center mb-4">All Results</h3>
            <div className="flex flex-col gap-4 ">
              {results?.map((result, index) => (
                <div
                  key={index}
                  className={` border rounded-md p-2 shadow-md ${
                    getMyProfile?.data?.email === result.email && "bg-gray-100"
                  }`}
                >
                  <h4
                    className={`text-lg font-semibold ${
                      index < 3 ? "text-green-500" : ""
                    }`}
                  >
                    Name: {result.name}
                  </h4>
                  <h4
                    className={`text-lg ${index < 3 ? "text-green-500" : ""}`}
                  >
                    Marks: {result.marks}
                  </h4>
                  <h4
                    className={`text-lg ${index < 3 ? "text-green-500" : ""}`}
                  >
                    Ranking: {index + 1}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SingleExam;

SingleExam.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
