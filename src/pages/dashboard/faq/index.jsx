import React, { useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { MdDeleteOutline } from "react-icons/md";
import {
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} from "../../../redux/faq/faqApi";
import toast from "react-hot-toast";
import Loader from "../../../components/UI/Loader";
import Modal from "@/components/UI/Modal/Modal";

const AllFaq = () => {
  const { data: allFaq } = useGetAllFaqQuery();
  const [deleteFaq, { isSuccess, isError, error }] = useDeleteFaqMutation();

  const handleDeleteFaq = (faq) => {
    deleteFaq({ id: faq?.id });
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
        {allFaq?.data ? (
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
                      {/* <button
                        onClick={() => handleDeleteFaq(faq)}
                        className="text-2xl border-none  text-red-500 hover:text-red-600"
                      >
                        <MdDeleteOutline />
                      </button> */}
                      <Modal
                        Button={
                          <MdDeleteOutline
                            className={`text-2xl border-none  text-red-500 hover:text-red-60`}
                          />
                        }
                        data={faq}
                        modalBody={
                          <>
                            <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                              Do you want to delete:{" "}
                              <span className="text-error font-bold">
                                {'"'}
                                {faq?.question.slice(0, 25)}
                                {'..."'}
                              </span>
                              ?
                            </h3>
                            <div className="py-4 text-center flex justify-around">
                              <button
                                onClick={() => {
                                  handleDeleteFaq(faq);
                                  const modal = document.getElementById(
                                    faq?.id
                                  );
                                  if (modal) {
                                    modal.close();
                                  }
                                }}
                                className="btn btn-error btn-xs sm:btn-sm text-white"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => {
                                  const modal = document.getElementById(
                                    faq?.id
                                  );
                                  if (modal) {
                                    modal.close();
                                  }
                                }}
                                className="btn btn-primary btn-xs sm:btn-sm"
                              >
                                No
                              </button>
                            </div>
                          </>
                        }
                      />
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
