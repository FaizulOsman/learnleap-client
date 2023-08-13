import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";

const TestSingleQues = ({ index, test, count, setCount }) => {
  const [disable, setDisable] = useState(false);
  const showCorrectAnswer = (correctAnswer) => {
    toast.success(`Correct Answer: ${correctAnswer}`);
  };

  const handleSelectedAnswer = (option) => {
    if (option === test?.answer) {
      toast.success("Answer is correct!", { autoClose: 700 });
      setCount(count + 1);
    } else {
      toast.error("Ans is Wrong!", { autoClose: 700 });
    }
    setDisable(true);
  };

  console.log(disable);

  return (
    <div>
      <div className="bg-base-100 border shadow-sm p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="card-title text-center">
            Quiz {index + 1}: {test?.question}
          </h2>
          <button
            onClick={() => showCorrectAnswer(test?.answer)}
            className="btn bg-base-100 border-none"
            title="See correct answer"
          >
            <AiOutlineEye />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(test?.option1)}
                type="radio"
                name={`radio-${test?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <p className="label-text flex-1">{test?.option1}</p>
            </label>
          </div>
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(test?.option2)}
                type="radio"
                name={`radio-${test?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <span className="label-text flex-1">{test?.option2}</span>
            </label>
          </div>
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(test?.option3)}
                type="radio"
                name={`radio-${test?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <span className="label-text flex-1">{test?.option3}</span>
            </label>
          </div>
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(test?.option4)}
                type="radio"
                name={`radio-${test?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <span className="label-text flex-1">{test?.option4}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSingleQues;
