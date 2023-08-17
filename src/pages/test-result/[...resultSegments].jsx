import TestAnswerSingleQues from "@/components/UI/TestAnswerSingleQues";
import RootLayout from "@/components/layouts/RootLayout";
import { useGetSingleTestQuery } from "@/redux/test/testApi";
import { useGetSingleTestResultQuery } from "@/redux/testResult/testResultApi";
import { getFromLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleTest = () => {
  const router = useRouter();
  const { resultSegments } = router.query;
  const { data: getSingleTest } = useGetSingleTestQuery(resultSegments?.[1]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [eyeShow, setEyeShow] = useState(false);

  const accessToken = getFromLocalStorage("access-token");

  const headers = {
    authorization: accessToken,
  };

  const { data: getSingleTestResult } = useGetSingleTestResultQuery({
    id: resultSegments?.[1],
    headers,
  });

  if (router && getSingleTest?.data?.timeLimit > 0) {
    if (isRunning === false) {
      setIsRunning(true);
    }
  }

  const [ques, setQues] = useState([]);

  useEffect(() => {
    if (getSingleTestResult?.data) {
      setEyeShow(true);
    }
  }, [getSingleTestResult]);

  return (
    <div>
      <>
        <div className="w-11/12 md:w-8/12 mx-auto my-14">
          <h2 className="text-3xl font-semibold text-center mb-5">
            {resultSegments?.[0]} Test {getSingleTest?.data?.serial}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 font-semibold">
            <div className="text-center sm:text-start">
              <p>Total Question: {getSingleTest?.data?.questions?.length}</p>
              <p>
                Total Attempted: {getSingleTestResult?.data?.totalAttempted}
              </p>
              <p className="text-green-500">
                Total Marks: {getSingleTestResult?.data?.totalMarks}
              </p>
            </div>
            <div className="text-center sm:text-end">
              <p>Correct Answer: {getSingleTestResult?.data?.correctAnswer}</p>
              <p>Wrong Answer: {getSingleTestResult?.data?.wrongAnswer}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {getSingleTest?.data?.questions?.map((test, index) => (
              <TestAnswerSingleQues
                key={index}
                test={test}
                index={index}
                count={count}
                setCount={setCount}
                ques={ques}
                setQues={setQues}
                eyeShow={eyeShow}
                result={getSingleTestResult}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/" className="btn btn-primary modal-button">
              Return Home
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default SingleTest;

SingleTest.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
