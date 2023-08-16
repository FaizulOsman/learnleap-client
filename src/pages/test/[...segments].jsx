import Stopwatch from "@/components/UI/Stopwatch";
import TestSingleQues from "@/components/UI/TestSingleQues";
import RootLayout from "@/components/layouts/RootLayout";
import { useGetSingleTestQuery } from "@/redux/test/testApi";
import { useCreateTestResultMutation } from "@/redux/testResult/testResultApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import { getFromLocalStorage } from "@/utils/localstorage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const SingleTest = () => {
  const router = useRouter();
  const { segments } = router.query;
  const { data: getSingleTest } = useGetSingleTestQuery(segments?.[1]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [
    createTestResult,
    { data, isError, isLoading, isSuccess, error, status },
  ] = useCreateTestResultMutation();

  const accessToken = getFromLocalStorage("access-token");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  if (router && getSingleTest?.data?.timeLimit > 0) {
    if (isRunning === false) {
      setIsRunning(true);
    }
  }

  const [ques, setQues] = useState([]);
  const handleSubmitTest = () => {
    const data = {
      questions: ques,
      totalQues: getSingleTest?.data?.questions?.length,
      totalAttempted: ques?.length,
      totalMarks: count,
      correctAnswer: count,
      wrongAnswer: ques?.length - count,
      email: getMyProfile?.data?.email,
      name: getMyProfile?.data?.name,
      testId: getSingleTest?.data?.id,
    };
    createTestResult({ data, headers });
  };

  if (isSuccess) {
    toast.success("Successfully submitted the task!");
  }
  if (isError || error) {
    toast.error(error?.data?.message);
  }

  return (
    <div>
      <>
        <div className="w-11/12 md:w-8/12 mx-auto my-14">
          <h2 className="text-3xl font-semibold text-center">
            {segments?.[0]} Test {getSingleTest?.data?.serial}
          </h2>
          <div className="my-5">
            <Stopwatch
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              timeLimit={getSingleTest?.data?.timeLimit}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {getSingleTest?.data?.questions?.map((test, index) => (
              <TestSingleQues
                key={index}
                test={test}
                index={index}
                count={count}
                setCount={setCount}
                ques={ques}
                setQues={setQues}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <label
              htmlFor="my-modal-4"
              className="btn btn-primary modal-button"
              onClick={() => handleSubmitTest()}
            >
              Submit Test
            </label>
            {isError && (
              <>
                <input
                  type="checkbox"
                  id="my-modal-4"
                  className="modal-toggle"
                />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                  <label className="modal-box relative py-10" htmlFor="">
                    <h3 className="text-lg font-bold">
                      Total Correct Answer: {count}
                    </h3>
                    <p className="py-4">Keep going!!!</p>
                  </label>
                </label>
              </>
            )}
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