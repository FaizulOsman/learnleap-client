import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetSingleBookmarkQuery,
} from "@/redux/bookmark/bookmarkApi";
import { useGetMyProfileQuery } from "@/redux/user/userApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmarkPlus, BsFillBookmarkDashFill } from "react-icons/bs";

const TestSingleQues = ({
  index,
  test,
  count,
  setCount,
  ques,
  setQues,
  eyeShow,
  subject,
  showResult,
}) => {
  const [disable, setDisable] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [myAnswer, setMyAnswer] = useState("");

  const showCorrectAnswer = (correctAnswer) => {
    toast.success(`Correct Answer: ${correctAnswer}`);
  };

  const headers = {
    authorization: accessToken,
  };

  const { data: getMyProfile } = useGetMyProfileQuery({ headers });

  const { data: getSingleBookmark } = useGetSingleBookmarkQuery({
    questionId: test?.id,
    headers,
  });

  // Create
  const [
    createBookmark,
    {
      isSuccess: createBookmarkIsSuccess,
      isError: createBookmarkIsError,
      error: createBookmarkError,
    },
  ] = useCreateBookmarkMutation();

  const handleAddToBookmark = (q) => {
    const data = {
      question: q?.question,
      option1: q?.option1,
      option2: q?.option2,
      option3: q?.option3,
      option4: q?.option4,
      option5: q?.option5,
      answer: q?.answer,
      subject: subject,
      email: getMyProfile?.data?.email,
      questionId: test?.id,
    };
    createBookmark({ data, headers });
  };

  // Delete
  const [
    deleteBookmark,
    {
      isSuccess: deleteBookmarkIsSuccess,
      isError: deleteBookmarkIsError,
      error: deleteBookmarkError,
    },
  ] = useDeleteBookmarkMutation();

  const handleDeleteFromBookmark = (q) => {
    const data = {
      question: q?.question,
    };

    deleteBookmark({ data, headers });
  };

  const handleSelectedAnswer = (option) => {
    setMyAnswer(option);
    if (option === test?.answer) {
      // toast.success("Answer is correct!", { autoClose: 700 });
      setCount(count + 1);
    } else {
      // toast.error("Ans is Wrong!", { autoClose: 700 });
    }
    setDisable(true);
    setQues([
      ...ques,
      {
        question: test?.question,
        option1: test?.option1,
        option2: test?.option2,
        option3: test?.option3,
        option4: test?.option4,
        option5: test?.option5,
        subject: test?.subject,
        selectedOption: option,
        answer: test?.answer,
      },
    ]);
  };

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);

    if (createBookmarkIsSuccess) {
      toast.success("Question added to bookmark");
    }
    if (createBookmarkIsError) {
      toast.error(createBookmarkError?.data?.message || "Something went wrong");
    }

    if (deleteBookmarkIsSuccess) {
      toast.success("Question deleted from bookmark");
    }
    if (deleteBookmarkIsError) {
      toast.error(deleteBookmarkError?.data?.message || "Something went wrong");
    }
  }, [
    createBookmarkIsSuccess,
    createBookmarkIsError,
    createBookmarkError,
    deleteBookmarkIsSuccess,
    deleteBookmarkIsError,
    deleteBookmarkError,
  ]);

  return (
    <div>
      <div className="bg-base-100 border shadow-sm p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="">
            <span className="text-lg font-bold">{index + 1}:</span>{" "}
            {test?.question}
          </h2>
          <div className="">
            {getSingleBookmark?.data?.question === test?.question ? (
              <button
                onClick={() => handleDeleteFromBookmark(test)}
                className="btn-sm border-none"
                title="See correct answer"
              >
                <BsFillBookmarkDashFill className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleAddToBookmark(test)}
                className="btn-sm border-none"
                title="See correct answer"
              >
                <BsBookmarkPlus className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => showCorrectAnswer(test?.answer)}
              className="btn bg-base-100 btn-sm border-none"
              title="See correct answer"
              disabled={!eyeShow && true}
            >
              <AiOutlineEye />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(test?.option1)}
                type="radio"
                name={`radio-${test?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={(disable && true) || (showResult && true)}
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
                disabled={(disable && true) || (showResult && true)}
              />
              <span className="label-text flex-1">{test?.option2}</span>
            </label>
          </div>
          {test?.option3 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(test?.option3)}
                  type="radio"
                  name={`radio-${test?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={(disable && true) || (showResult && true)}
                />
                <span className="label-text flex-1">{test?.option3}</span>
              </label>
            </div>
          )}
          {test?.option4 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(test?.option4)}
                  type="radio"
                  name={`radio-${test?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={(disable && true) || (showResult && true)}
                />
                <span className="label-text flex-1">{test?.option4}</span>
              </label>
            </div>
          )}
          {test?.option5 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(test?.option5)}
                  type="radio"
                  name={`radio-${test?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={(disable && true) || (showResult && true)}
                />
                <span className="label-text flex-1">{test?.option5}</span>
              </label>
            </div>
          )}
        </div>
        {showResult && (
          <div className="mt-2">
            <h2 className="text-lg font-semibold">
              {myAnswer === test?.answer ? (
                <span className="text-green-500">Your answer is correct.</span>
              ) : (
                <>
                  {myAnswer ? (
                    <span className="text-red-500">Your answer is wrong!</span>
                  ) : (
                    <span className="text-yellow-500">
                      You did not attempted!
                    </span>
                  )}
                  <br />
                  <span className="text-green-500">
                    Correct Answer Is: {test?.answer}
                  </span>
                </>
              )}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSingleQues;
