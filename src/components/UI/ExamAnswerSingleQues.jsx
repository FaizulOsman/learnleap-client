import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";

const ExamAnswerSingleQues = ({ index, exam, eyeShow, result }) => {
  const showCorrectAnswer = (correctAnswer) => {
    toast.success(`Correct Answer: ${correctAnswer}`);
  };

  const sss = result?.data?.questions?.find(
    (q) => q?.question === exam?.question
  );

  return (
    <div>
      <div className="bg-base-100 border shadow-sm p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold text-lg">
            <span>{index + 1}:</span> {exam?.question}
          </h2>
          <button
            onClick={() => showCorrectAnswer(exam?.answer)}
            className="btn bg-base-100 btn-sm border-none"
            title="See correct answer"
            disabled={!eyeShow && true}
          >
            <AiOutlineEye />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex">
              <input
                type="radio"
                name={`radio-${exam?.id}${index}`}
                className="radio radio-primary radio-sm mr-4"
                checked={sss?.selectedOption === exam?.option1 ? true : false}
                disabled={sss?.selectedOption === exam?.option1 ? false : true}
                readOnly
              />
              <p className="label-text flex-1">{exam?.option1}</p>
            </label>
          </div>
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex">
              <input
                type="radio"
                name={`radio-${exam?.id}${index}`}
                className="radio radio-primary radio-sm mr-4"
                checked={sss?.selectedOption === exam?.option2 ? true : false}
                disabled={sss?.selectedOption === exam?.option2 ? false : true}
                readOnly
              />
              <span className="label-text flex-1">{exam?.option2}</span>
            </label>
          </div>
          {exam?.option3 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex">
                <input
                  type="radio"
                  name={`radio-${exam?.id}${index}`}
                  className="radio radio-primary radio-sm mr-4"
                  checked={sss?.selectedOption === exam?.option3 ? true : false}
                  disabled={
                    sss?.selectedOption === exam?.option3 ? false : true
                  }
                  readOnly
                />
                <span className="label-text flex-1">{exam?.option3}</span>
              </label>
            </div>
          )}
          {exam?.option4 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex">
                <input
                  type="radio"
                  name={`radio-${exam?.id}${index}`}
                  className="radio radio-primary radio-sm mr-4"
                  checked={sss?.selectedOption === exam?.option4 ? true : false}
                  disabled={
                    sss?.selectedOption === exam?.option4 ? false : true
                  }
                  readOnly
                />
                <span className="label-text flex-1">{exam?.option4}</span>
              </label>
            </div>
          )}
          {exam?.option5 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex">
                <input
                  type="radio"
                  name={`radio-${exam?.id}${index}`}
                  className="radio radio-primary radio-sm mr-4"
                  checked={sss?.selectedOption === exam?.option5 ? true : false}
                  disabled={
                    sss?.selectedOption === exam?.option5 ? false : true
                  }
                  readOnly
                />
                <span className="label-text flex-1">{exam?.option5}</span>
              </label>
            </div>
          )}
        </div>
        <div className="mt-2">
          <h2 className="text-lg font-semibold">
            {sss?.selectedOption === exam?.answer ? (
              <span className="text-green-500">Your answer is correct.</span>
            ) : (
              <>
                <span className="text-red-500">Your answer is wrong.</span>
                <br />
                <span className="text-green-500">
                  Correct Answer Is: {sss?.answer}
                </span>
              </>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ExamAnswerSingleQues;
