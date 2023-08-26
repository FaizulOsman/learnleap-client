import Loader from "@/components/UI/Loader";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetMySubmittedResultsQuery } from "@/redux/examResult/examResultApi";
import React, { useEffect, useState } from "react";

const MyResults = () => {
  const [accessToken, setAccessToken] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [meta, setMeta] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [myResults, setMyResults] = useState([]);

  const headers = {
    authorization: accessToken,
  };

  const { data: getMySubmittedResults } = useGetMySubmittedResultsQuery({
    headers,
    page,
    limit,
    sortOrder,
  });
  console.log(getMySubmittedResults);
  const totalPage = Math.ceil(parseInt(meta?.total) / parseInt(meta?.limit));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);
    setMyResults(getMySubmittedResults?.data);
    setMeta(getMySubmittedResults?.meta);
  }, [getMySubmittedResults, getMySubmittedResults?.data]);

  return (
    <div>
      <div className="bg-gray-100 dark:text-white flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="flex-grow flex overflow-x-hidden">
            <div className="flex-grow bg-[#080925] overflow-y-auto">
              <div className="z-50 bg-[#080925] sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-800  sticky top-0">
                <div className="flex w-full items-center">
                  <div className="flex items-center text-lg sm:text-2xl  dark:text-white mb-5 border-l-4 pl-3">
                    My Results
                  </div>
                </div>
              </div>
              <div className="sm:p-7 p-4">
                <div className="flex w-full items-center mb-7">
                  <button className="hidden sm:inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow   dark:border-gray-800 border border-gray-200 leading-none py-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 mr-2  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Last 30 days
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 ml-1.5  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow dark:border-gray-800 border border-gray-200 leading-none py-0"
                  >
                    {sortOrder === "asc" ? "desc" : "asc"}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 ml-1.5  "
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div className="ml-auto text-xs inline-flex items-center">
                    <span className="mr-3">Limit {limit}</span>
                    <button
                      onClick={() => setLimit(limit - 1)}
                      className={`mr-3 inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                        limit === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "border-gray-800"
                      } leading-none`}
                      disabled={limit === 1}
                    >
                      <svg
                        className="w-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button
                      onClick={() => setLimit(limit + 1)}
                      className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                        page === totalPage
                          ? "opacity-50 cursor-not-allowed"
                          : "border-gray-800"
                      } leading-none`}
                      disabled={limit === parseInt(meta?.total)}
                    >
                      <svg
                        className="w-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
                {myResults?.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="font-normal border-b border-gray-800">
                        <th className="sm:px-3 pt-0 pb-3 hidden sm:table-cell">
                          Subject
                        </th>
                        <th className="sm:px-3 pt-0 pb-3">Total Q.</th>
                        <th className="sm:px-3 pt-0 pb-3">T. Attempt.</th>
                        <th className="sm:px-3 pt-0 pb-3">C. Ans</th>
                        <th className="sm:px-3 pt-0 pb-3">W. Ans</th>
                        <th className="sm:px-3 pt-0 pb-3">T. Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myResults?.map((result, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="sm:p-3 py-2 hidden sm:table-cell">
                            {result?.subject} {result?.serial}
                          </td>
                          <td className="sm:p-3 py-2 hidden sm:table-cell">
                            {result?.totalQues}
                          </td>
                          <td className="sm:p-3 py-2 hidden sm:table-cell">
                            {result?.totalAttempted}
                          </td>
                          <td className="sm:p-3 py-2 hidden sm:table-cell">
                            {result?.correctAnswer}
                          </td>
                          <td className="sm:p-3 py-2 hidden sm:table-cell">
                            {result?.wrongAnswer}
                          </td>
                          <td className="sm:p-3 py-2 hidden sm:table-cell">
                            {result?.totalMarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="min-h-[30vh] flex items-center">
                    <Loader />
                  </div>
                )}
                <div className="flex w-full mt-5 space-x-2 justify-end">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                      page === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "border-gray-800"
                    } leading-none`}
                    disabled={page === 1}
                  >
                    <svg
                      className="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  {Array.from({ length: totalPage }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                        page === index + 1
                          ? "bg-gray-800 border-gray-800"
                          : "border-gray-800"
                      } leading-none`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className={`inline-flex items-center h-8 w-8 justify-center rounded-md shadow border ${
                      page === totalPage
                        ? "opacity-50 cursor-not-allowed"
                        : "border-gray-800"
                    } leading-none`}
                    disabled={page === totalPage}
                  >
                    <svg
                      className="w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResults;

MyResults.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
