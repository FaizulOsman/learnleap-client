import React, { useEffect } from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { useCreateFaqMutation } from "../../../../redux/faq/faqApi";
import toast from "react-hot-toast";

const CreateFaq = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const headers = {
    authorization: accessToken,
  };

  const [createFaq, { isSuccess, isError, error }] = useCreateFaqMutation();

  const handleCreateFaq = (e) => {
    e.preventDefault();
    const data = {
      question: e.target.question.value,
      answer: e.target.answer.value,
    };
    createFaq({ data, headers });

    e.target.question.value = "";
    e.target.answer.value = "";
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully created");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  return (
    <div>
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-5">
          Create FAQ
        </h3>

        <form
          onSubmit={(e) => handleCreateFaq(e)}
          className="grid grid-cols-1 justify-between gap-6 mt-4"
        >
          <input
            type="text"
            name="question"
            placeholder="Question"
            className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
            required
          />
          <textarea
            className="textarea first-letter:input input-bordered input-primary input-sm w-full h-[150px] bg-[#1d1836]"
            name="answer"
            placeholder="Answer"
            required
          ></textarea>
          <button type="submit" className="btn btn-sm btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFaq;

CreateFaq.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
