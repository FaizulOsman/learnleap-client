import React, { useEffect } from "react";
import toast from "react-hot-toast";
import RootLayout from "@/layouts/RootLayout";
import { useCreateFeedbackMutation } from "@/redux/feedback/feedbackApi";

const jwt = require("jsonwebtoken");

const FeedbackPage = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };
  const [createFeedback, { isSuccess, isError, error }] =
    useCreateFeedbackMutation();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: decodedToken?.email || e.target.email.value,
      message: e.target.message.value,
    };
    createFeedback({ data, headers });
    e.target.message.value = "";
    e.target.email.value = "";
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Feedback successfully sent!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  }, [isError, error]);

  return (
    <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8 hover:shadow-md">
      <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
        Feedback
      </h2>
      <p className="mb-5 leading-relaxed text-gray-600">
        Share Your Thoughts and Help Us Improve!
      </p>
      <form onSubmit={(e) => handleFeedbackSubmit(e)}>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm leading-7 text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="text-sm leading-7 text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;

FeedbackPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
