import {
  useDeleteBookmarkMutation,
  useGetSingleBookmarkQuery,
} from "@/redux/bookmark/bookmarkApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmarkPlus, BsFillBookmarkDashFill } from "react-icons/bs";

const BookmarkSingleQues = ({
  index,
  bookmark,
  count,
  setCount,
  ques,
  setQues,
}) => {
  const [disable, setDisable] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const showCorrectAnswer = (correctAnswer) => {
    toast.success(`Correct Answer: ${correctAnswer}`);
  };

  const headers = {
    authorization: accessToken,
  };

  const { data: getSingleBookmark } = useGetSingleBookmarkQuery({
    questionId: bookmark?.questionId,
    headers,
  });

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
    if (option === bookmark?.answer) {
      setCount(count + 1);
    } else {
    }
    setDisable(true);
    setQues([
      ...ques,
      {
        question: bookmark?.question,
        option1: bookmark?.option1,
        option2: bookmark?.option2,
        option3: bookmark?.option3,
        option4: bookmark?.option4,
        option5: bookmark?.option5,
        subject: bookmark?.subject,
        selectedOption: option,
        answer: bookmark?.answer,
      },
    ]);
  };

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);

    if (deleteBookmarkIsSuccess) {
      toast.success("Question deleted from bookmark");
    }
    if (deleteBookmarkIsError) {
      toast.error(deleteBookmarkError?.data?.message || "Something went wrong");
    }
  }, [deleteBookmarkIsSuccess, deleteBookmarkIsError, deleteBookmarkError]);

  return (
    <div>
      <div className="bg-base-100 border shadow-sm p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="">
            <span className="text-lg font-bold">{index + 1}:</span>{" "}
            {bookmark?.question}
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => handleDeleteFromBookmark(bookmark)}
              className="btn-sm border-none"
              title="See correct answer"
            >
              <BsFillBookmarkDashFill className="w-4 h-4" />
            </button>
            <button
              onClick={() => showCorrectAnswer(bookmark?.answer)}
              className="btn bg-base-100 btn-sm border-none"
              title="See correct answer"
            >
              <AiOutlineEye />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(bookmark?.option1)}
                type="radio"
                name={`radio-${bookmark?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <p className="label-text flex-1">{bookmark?.option1}</p>
            </label>
          </div>
          <div className="flex items-center h-full">
            <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
              <input
                onClick={() => handleSelectedAnswer(bookmark?.option2)}
                type="radio"
                name={`radio-${bookmark?.id}`}
                className="radio radio-sm checked:bg-blue-500 mr-4"
                disabled={disable && true}
              />
              <span className="label-text flex-1">{bookmark?.option2}</span>
            </label>
          </div>
          {bookmark?.option3 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(bookmark?.option3)}
                  type="radio"
                  name={`radio-${bookmark?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={disable && true}
                />
                <span className="label-text flex-1">{bookmark?.option3}</span>
              </label>
            </div>
          )}
          {bookmark?.option4 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(bookmark?.option4)}
                  type="radio"
                  name={`radio-${bookmark?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={disable && true}
                />
                <span className="label-text flex-1">{bookmark?.option4}</span>
              </label>
            </div>
          )}
          {bookmark?.option5 && (
            <div className="flex items-center h-full">
              <label className="label cursor-pointer w-full flex hover:bg-gray-200 rounded-lg">
                <input
                  onClick={() => handleSelectedAnswer(bookmark?.option5)}
                  type="radio"
                  name={`radio-${bookmark?.id}`}
                  className="radio radio-sm checked:bg-blue-500 mr-4"
                  disabled={disable && true}
                />
                <span className="label-text flex-1">{bookmark?.option5}</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkSingleQues;
