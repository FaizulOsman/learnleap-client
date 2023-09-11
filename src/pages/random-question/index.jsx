import TestSingleQues from "@/components/UI/TestSingleQues";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import {
  useGetAllTestQuery,
  useGetTestBySubjectQuery,
} from "@/redux/test/testApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const jwt = require("jsonwebtoken");

const RandomQuestions = () => {
  const [quesLimit, setQuesLimit] = useState(0);
  const [includes, setIncludes] = useState("");
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [eyeShow, setEyeShow] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const [ques, setQues] = useState([]);
  const wrong = ques?.length - count;
  const mark = count - wrong * 0.25;
  const totalMark = mark > 0 ? mark : 0;

  const { data: getTestBySubject } = useGetTestBySubjectQuery(includes);
  const { data: getAllTest } = useGetAllTestQuery();

  const alTestSubjects = getAllTest?.data?.map((test) => test?.subject);
  const uniqueSubjects = [...new Set(alTestSubjects)];

  const handleFilter = (e) => {
    e.preventDefault();
    setIncludes(e.target.subject.value);
    setQuesLimit(parseInt(e.target.limit.value));
  };

  useEffect(() => {
    if (getTestBySubject?.data) {
      const uniqueQuestions = [];
      while (uniqueQuestions.length < quesLimit) {
        const randomTest = Math.floor(
          Math.random() * getTestBySubject?.data?.length
        );
        const randomTestQues = Math.floor(
          Math.random() * getTestBySubject?.data[randomTest]?.questions.length
        );
        const question =
          getTestBySubject?.data[randomTest]?.questions[randomTestQues];
        if (!uniqueQuestions.includes(question)) {
          uniqueQuestions.push(question);
        }
      }
      setQuestions(uniqueQuestions);
    }

    if (getTestBySubject?.meta?.total < quesLimit) {
      toast.error(`Question limit ${getTestBySubject?.meta?.total}`);
    }
  }, [getTestBySubject, quesLimit]);

  return (
    <div className="w-11/12 md:w-8/12 mx-auto">
      <div>
        <form
          onSubmit={(e) => handleFilter(e)}
          className="flex gap-3 w-10/12 mx-auto"
        >
          <select
            onChange={(e) => setIncludes(e.target.value)}
            name="subject"
            className="select select-bordered max-w-xs w-[40%] border-gray-500"
          >
            <option value="all" selected>
              Subject (All)
            </option>
            {uniqueSubjects?.map((subject, index) => (
              <option key={index}>{subject}</option>
            ))}
          </select>
          <input
            type="number"
            name="limit"
            onChange={(e) => {
              const enteredValue = parseInt(e.target.value);
              const maxValue = getTestBySubject?.meta?.total || 0; // Default to 0 if total is undefined
              const newValue = Math.min(enteredValue, maxValue);
              setQuesLimit(newValue);
            }}
            placeholder={`Limit ${
              getTestBySubject?.meta?.total
                ? `(Max ${getTestBySubject?.meta?.total})`
                : ""
            }`}
            className="border px-3 py-1 border-gray-500 rounded-md w-[40%]"
            max={getTestBySubject?.meta?.total}
          />

          <button
            type="submit"
            className="px-3 py-2 w-[20%] font-bold text-white bg-green-500 rounded-md"
          >
            Filter
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-10">
        {questions?.map((test, index) => (
          <TestSingleQues
            key={index}
            index={index}
            test={test}
            count={count}
            setCount={setCount}
            ques={ques}
            setQues={setQues}
            eyeShow={eyeShow}
            subject={test?.subject}
            showResult={showResult}
          />
        ))}
      </div>
      {questions && questions?.length > 0 && (
        <div className="text-center mt-4">
          <label
            onClick={() => setShowResult(true)}
            htmlFor="my-modal-4"
            className="btn btn-primary modal-button"
          >
            Result
          </label>
          <>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
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
      )}
    </div>
  );
};

export default RandomQuestions;

RandomQuestions.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
