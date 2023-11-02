import Modal from "@/components/UI/Modal/Modal";
import Table from "@/components/UI/Table/Table";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useDeleteFeedbackMutation,
  useGetAllFeedbackQuery,
} from "@/redux/feedback/feedbackApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";

const jwt = require("jsonwebtoken");

const DashboardFeedbackPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  const headers = {
    authorization: accessToken,
  };

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  // Data Query
  const { data: getAllFeedbacks } = useGetAllFeedbackQuery({
    headers,
    limit,
    page,
    sortOrder,
  });

  const [deleteFeedback, { isSuccess, isError, error }] =
    useDeleteFeedbackMutation();

  const handleDeleteFeedback = (feedback) => {
    deleteFeedback({ id: feedback?.id, headers });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted user.");
    }
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isSuccess, isError, error]);

  useEffect(() => {
    setMeta(getAllFeedbacks?.meta);
  }, [getAllFeedbacks?.meta]);

  return (
    <div>
      <Table
        tableTitle={`All Feedbacks (${
          getAllFeedbacks?.meta?.total ? getAllFeedbacks?.meta?.total : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={getAllFeedbacks?.data}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th key="name" className="sm:px-3 pt-0 pb-3">
            Email
          </th>,
          <th key="message" className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
            Message
          </th>,
          <th key="msg." className="sm:px-3 pt-0 pb-3 sm:hidden table-cell">
            Msg.
          </th>,
          <th key="delete" className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
            Delete
          </th>,
          <th key="del." className="sm:px-3 pt-0 pb-3 sm:hidden table-cell">
            Del.
          </th>,
        ]}
        tableBodyData={getAllFeedbacks?.data?.map((data, index) => (
          <tr key={index} className="border-b border-gray-800">
            <td className="sm:p-3 py-2 hidden sm:table-cell">{data?.email}</td>
            <td className="sm:p-3 py-2 sm:hidden table-cell">
              {data.email.slice(0, -7)}...
            </td>
            <td className="sm:p-3 py-2">
              {data?.message?.length > 100
                ? data?.message.slice(0, 100)
                : data?.message}
              {data?.message?.length > 100 && "..."}
            </td>
            <td className="sm:p-3 py-2">
              <div className={`cursor-pointer text-red-600`}>
                <Modal
                  Button={<MdDeleteOutline className={`w-5 h-5`} />}
                  data={data}
                  modalBody={
                    <>
                      <h3 className="font-semibold text-md sm:text-lg text-white pb-5 text-center">
                        Are you sure you want to delete{" "}
                        <span className="text-error font-bold">
                          {data?.message?.length > 100
                            ? data?.message.slice(0, 100)
                            : data?.message}
                          {data?.message?.length > 100 && "..."}
                        </span>
                        ?
                      </h3>
                      <div className="py-4 text-center flex justify-around">
                        <button
                          onClick={() => {
                            handleDeleteFeedback(data);
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
  );
};

export default DashboardFeedbackPage;

DashboardFeedbackPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
