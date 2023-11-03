import React, { useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { MdDeleteOutline } from "react-icons/md";
import {
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} from "../../../redux/faq/faqApi";
import toast from "react-hot-toast";
import Loader from "../../../components/UI/Loader";

const AllFaq = () => {
  const { data: allFaq } = useGetAllFaqQuery();
  const [deleteFaq, { isSuccess, isError, error }] = useDeleteFaqMutation();

  const handleDeleteFaq = (faq) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this Faq?"
    );
    if (isConfirm) {
      deleteFaq({ id: faq?.id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Deleted");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isError, error]);

  return (
    <div>
      <div className="my-20 w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center my-8">
          Frequently Asked Questions
        </h1>
        {allFaq?.data?.length > 0 ? (
          <>
            {allFaq?.data?.length > 0 ? (
              <div className="mt-10 flex flex-col gap-5">
                {allFaq?.data?.map((faq, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center  bg-[#1d1836] p-2 rounded-md"
                  >
                    <div>
                      <p>Question: {faq?.question}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4">
                      <button
                        onClick={() => handleDeleteFaq(faq)}
                        className="text-2xl border-none  text-red-500 hover:text-red-600"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="text-2xl font-bold text-red-500 text-center py-10">
                No Data Found
              </h2>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AllFaq;

AllFaq.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
