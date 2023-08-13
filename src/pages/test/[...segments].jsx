import Stopwatch from "@/components/UI/Stopwatch";
import TestSingleQues from "@/components/UI/TestSingleQues";
import RootLayout from "@/components/layouts/RootLayout";
import { useGetSingleTestQuery } from "@/redux/testSlice/testApi";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SingleTest = () => {
  const router = useRouter();
  const { segments } = router.query;
  const { data: getSingleTest } = useGetSingleTestQuery(segments?.[1]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  if (router && getSingleTest?.data?.timeLimit > 0) {
    if (isRunning === false) {
      setIsRunning(true);
    }
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
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <label
              htmlFor="my-modal-4"
              className="btn btn-primary modal-button"
            >
              Show total marks
            </label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
              <label className="modal-box relative py-10" htmlFor="">
                <h3 className="text-lg font-bold">
                  Total Correct Answer: {count}
                </h3>
                <p className="py-4">Keep going!!!</p>
              </label>
            </label>
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
