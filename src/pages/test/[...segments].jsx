import Loader from "@/components/UI/Loader";
import Stopwatch from "@/components/UI/Stopwatch";
import TestSingleQues from "@/components/UI/TestSingleQues";
import RootLayout from "@/layouts/RootLayout";
import { useGetSingleTestQuery } from "@/redux/test/testApi";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const SingleTest = () => {
  const router = useRouter();
  const { segments } = router.query;
  const { data: getSingleTest } = useGetSingleTestQuery(segments?.[1]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [eyeShow, setEyeShow] = useState(true);
  const [timeOver, setTimeOver] = useState(false);
  const [submittedByTimeOver, setSubmittedByTimeOver] = useState(false);
  const submitButtonRef = useRef(null);

  if (router && getSingleTest?.data?.timeLimit > 0) {
    if (isRunning === false) {
      setIsRunning(true);
    }
  }

  const [ques, setQues] = useState([]);
  const wrong = ques?.length - count;

  const mark = count - wrong * 0.25;
  const totalMark = mark > 0 ? mark : 0;

  useEffect(() => {
    if (timeOver && !submittedByTimeOver) {
      submitButtonRef.current.click();
      setSubmittedByTimeOver(true);
      toast.error("Time over");
    }
  }, [timeOver, submittedByTimeOver]);

  return (
    <div>
      <>
        <div className="w-11/12 md:w-8/12 mx-auto mb-14">
          <h2 className="text-3xl font-semibold text-center">
            {segments?.[0]} Test {getSingleTest?.data?.serial}
          </h2>
          {getSingleTest?.data.questions &&
          getSingleTest?.data.questions.length > 0 ? (
            <>
              <div className="my-5">
                <Stopwatch
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  timeLimit={getSingleTest?.data?.timeLimit}
                  setTimeOver={setTimeOver}
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
                    eyeShow={eyeShow}
                    subject={getSingleTest?.data?.subject}
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <label
                  htmlFor="my-modal-4"
                  className="btn btn-primary modal-button"
                  ref={submitButtonRef}
                >
                  Result
                </label>
                <>
                  <input
                    type="checkbox"
                    id="my-modal-4"
                    className="modal-toggle"
                  />
                  <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative py-10" htmlFor="">
                      <h3 className="text-lg font-bold text-green-500">
                        Total Correct Answer: {count}
                      </h3>
                      <h3 className="text-lg font-bold text-red-500">
                        Total Wrong Answer: {wrong}
                      </h3>
                      <h3 className="text-xl font-bold text-green-500 pt-2">
                        You Got: {totalMark}
                      </h3>
                      <p className="pt-3">Keep going...!!!</p>
                    </label>
                  </label>
                </>
              </div>
            </>
          ) : (
            <div className="min-h-[50vh] flex items-center">
              <Loader />
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default SingleTest;

SingleTest.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
