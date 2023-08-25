import ExamSingleQues from "@/components/UI/ExamSingleQues";
import Loader from "@/components/UI/Loader";
import Stopwatch from "@/components/UI/Stopwatch";
import RootLayout from "@/layouts/RootLayout";
import {
  useAddResultMutation,
  useGetSingleExamQuery,
} from "@/redux/exam/examApi";
import {
  useCreateExamResultMutation,
  useGetSingleExamResultQuery,
} from "@/redux/examResult/examResultApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const SingleExam = () => {
  const router = useRouter();
  const { segments } = router.query;
  const { data: getSingleExam } = useGetSingleExamQuery(segments?.[1]);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [eyeShow, setEyeShow] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [submittedByTimeOver, setSubmittedByTimeOver] = useState(false);
  const submitButtonRef = useRef(null);

  const [
    createExamResult,
    { data, isError, isLoading, isSuccess, error, status },
  ] = useCreateExamResultMutation();

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);
  }, []);

  const headers = {
    authorization: accessToken,
  };

  const [addResult, { isSuccess: isAddResultSuccess }] = useAddResultMutation();

  const { data: getSingleExamResult } = useGetSingleExamResultQuery({
    id: segments?.[1],
    headers,
  });

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  if (router && getSingleExam?.data?.timeLimit > 0) {
    if (isRunning === false) {
      setIsRunning(true);
    }
  }

  const [ques, setQues] = useState([]);
  const wrong = ques?.length - count;

  const mark = count - wrong * 0.25;
  const totalMark = mark > 0 ? mark : 0;

  const handleSubmitExam = () => {
    const data = {
      questions: ques,
      totalQues: getSingleExam?.data?.questions?.length,
      totalAttempted: ques?.length,
      totalMarks: totalMark,
      correctAnswer: count,
      wrongAnswer: wrong,
      email: getMyProfile?.data?.email,
      name: getMyProfile?.data?.name,
      examId: getSingleExam?.data?.id,
    };
    createExamResult({ data, headers });

    const options = {
      id: getSingleExam?.data?.id,
      data: {
        name: getMyProfile?.data?.name,
        email: getMyProfile?.data?.email,
        marks: totalMark,
      },
    };
    addResult({ options, headers });
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        `${error?.data?.message}` || "You have already submitted the exam!"
      );
    }

    if (isSuccess) {
      toast.success("Successfully submitted the task!");
    }

    if (getSingleExamResult?.data) {
      setEyeShow(true);
    }

    if (timeOver && !submittedByTimeOver) {
      submitButtonRef.current.click();
      setSubmittedByTimeOver(true);
    }
  }, [
    isLoading,
    isSuccess,
    isError,
    error,
    getSingleExamResult,
    timeOver,
    submittedByTimeOver,
  ]);

  return (
    <div>
      <>
        <div className="w-11/12 md:w-8/12 mx-auto mb-14">
          <h2 className="text-3xl font-semibold text-center">
            {segments?.[0]} Exam {getSingleExam?.data?.serial}
          </h2>
          {getSingleExam?.data?.questions &&
          getSingleExam?.data?.questions.length > 0 ? (
            <>
              <div className="my-5">
                <Stopwatch
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  timeLimit={getSingleExam?.data?.timeLimit}
                  setTimeOver={setTimeOver}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {getSingleExam?.data?.questions?.map((exam, index) => (
                  <ExamSingleQues
                    key={index}
                    exam={exam}
                    index={index}
                    count={count}
                    setCount={setCount}
                    ques={ques}
                    setQues={setQues}
                    eyeShow={eyeShow}
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <label
                  htmlFor="my-modal-4"
                  className="btn bg-green-500 text-white hover:bg-green-600 modal-button"
                  onClick={() => handleSubmitExam()}
                  ref={submitButtonRef}
                >
                  Submit Exam
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

export default SingleExam;

SingleExam.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
