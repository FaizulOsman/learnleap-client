import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { MdDeleteOutline } from "react-icons/md";
import {
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} from "../../../redux/faq/faqApi";
import toast from "react-hot-toast";
import Modal from "@/components/UI/Modal/Modal";
import Table from "@/components/UI/Table/Table";

const AllFaq = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  // Data Query
  const { data: allFaq } = useGetAllFaqQuery({
    limit,
    page,
    sortOrder,
  });
  const [deleteFaq, { isSuccess, isError, error }] = useDeleteFaqMutation();
  console.log(allFaq);

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

  useEffect(() => {
    setMeta(allFaq?.meta);
  }, [allFaq?.meta]);

  return (
    <div>
      <div>
        <Table
          tableTitle={`All FAQ (${
            allFaq?.meta?.total ? allFaq?.meta?.total : 0
          })`}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          meta={meta}
          allData={allFaq?.data}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          tableHeadData={[
            <th key="question" className="sm:px-3 pt-0 pb-3">
              Question
            </th>,
            <th key="delete" className="sm:px-3 pt-0 pb-3">
              Delete
            </th>,
          ]}
          tableBodyData={allFaq?.data?.map((data, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="sm:p-3 py-2">
                {data?.question?.length > 100
                  ? data?.question.slice(0, 100)
                  : data?.question}
                {data?.question?.length > 100 && "..."}
              </td>
              <td className="sm:p-3 py-2">
                <div className={`cursor-pointer text-red-600`}>
                  <Modal
                    Button={
                      <MdDeleteOutline
                        className={`text-2xl border-none  text-red-500 hover:text-red-60`}
                      />
                    }
                    // styles="justify-end"
                    data={data}
                    modalBody={
                      <>
                        <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                          Do you want to delete:{" "}
                          <span className="text-error font-bold">
                            {'"'}
                            {data?.question.slice(0, 25)}
                            {'..."'}
                          </span>
                          ?
                        </h3>
                        <div className="py-4 text-center flex justify-around">
                          <button
                            onClick={() => {
                              handleDeleteFaq(data);
                              const modal = document.getElementById(data?.id);
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
                              const modal = document.getElementById(data?.id);
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
              </td>
            </tr>
          ))}
        />
      </div>
    </div>
  );
};

export default AllFaq;

AllFaq.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
