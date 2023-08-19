import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";

const ExamSingleQues = ({
  index,
  exam,
  count,
  setCount,
  ques,
  setQues,
  eyeShow,
}) => {
  const [disable, setDisable] = useState(false);
  const showCorrectAnswer = (correctAnswer) => {
    toast.success(`Correct Answer: ${correctAnswer}`);
  };

  const handleSelectedAnswer = (option) => {
    if (option === exam?.answer) {
      toast.success("Answer is correct!", { autoClose: 700 });
      setCount(count + 1);
    } else {
      toast.error("Ans is Wrong!", { autoClose: 700 });
    }
    setDisable(true);
    setQues([
      ...ques,
      {
        question: exam?.question,
        option1: exam?.option1,
        option2: exam?.option2,
        option3: exam?.option3,
        option4: exam?.option4,
        option5: exam?.option5,
        subject: exam?.subject,
        selectedOption: option,
        answer: exam?.answer,
      },
    ]);
  };

  return (
    <div>
      <div className="bg-base-100 border shadow-sm p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="">
            <span className="text-lg font-bold">{index + 1}:</span>{" "}
            {exam?.question}
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
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(exam?.option1)}
                type="radio"
                name={`radio-${exam?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <p className="label-text flex-1">{exam?.option1}</p>
            </label>
          </div>
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(exam?.option2)}
                type="radio"
                name={`radio-${exam?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <span className="label-text flex-1">{exam?.option2}</span>
            </label>
          </div>
          {exam?.option3 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(exam?.option3)}
                  type="radio"
                  name={`radio-${exam?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={disable && true}
                />
                <span className="label-text flex-1">{exam?.option3}</span>
              </label>
            </div>
          )}
          {exam?.option4 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(exam?.option4)}
                  type="radio"
                  name={`radio-${exam?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={disable && true}
                />
                <span className="label-text flex-1">{exam?.option4}</span>
              </label>
            </div>
          )}
          {exam?.option5 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(exam?.option5)}
                  type="radio"
                  name={`radio-${exam?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={disable && true}
                />
                <span className="label-text flex-1">{exam?.option5}</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSingleQues;
