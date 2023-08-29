import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetSingleBookmarkQuery,
} from "@/redux/bookmark/bookmarkApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmarkPlus, BsFillBookmarkDashFill } from "react-icons/bs";

const ExamSingleQues = ({
  index,
  exam,
  count,
  setCount,
  ques,
  setQues,
  eyeShow,
  getMyProfile,
  subject,
}) => {
  const [disable, setDisable] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const showCorrectAnswer = (correctAnswer) => {
    toast.success(`Correct Answer: ${correctAnswer}`);
  };

  const handleSelectedAnswer = (option) => {
    if (option === exam?.answer) {
      setCount(count + 1);
    } else {
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

  const headers = {
    authorization: accessToken,
  };

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
      questionId: exam?.id,
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

  const { data: getSingleBookmark } = useGetSingleBookmarkQuery({
    questionId: exam?.id,
    headers,
  });

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
            {exam?.question}
          </h2>
          <div className="flex gap-1">
            {getSingleBookmark?.data?.question === exam?.question ? (
              <button
                onClick={() => handleDeleteFromBookmark(exam)}
                className="btn-sm border-none"
                title="See correct answer"
              >
                <BsFillBookmarkDashFill className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleAddToBookmark(exam)}
                className="btn-sm border-none"
                title="See correct answer"
              >
                <BsBookmarkPlus className="w-4 h-4" />
              </button>
            )}
            {eyeShow && (
              <button
                onClick={() => showCorrectAnswer(exam?.answer)}
                className="btn bg-base-100 btn-sm border-none"
                title="See correct answer"
                disabled={!eyeShow && true}
              >
                <AiOutlineEye />
              </button>
            )}
          </div>
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
