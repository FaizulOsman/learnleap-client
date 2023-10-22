/* eslint-disable react/jsx-key */
import Chart from "@/components/UI/Chart";
import Loader from "@/components/UI/Loader";
import Table from "@/components/UI/Table/Table";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetMySubmittedResultsQuery } from "@/redux/examResult/examResultApi";
import React, { useEffect, useState } from "react";

const jwt = require("jsonwebtoken");

const MyResults = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [meta, setMeta] = useState({});
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [myResults, setMyResults] = useState([]);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const { data: getMySubmittedResults } = useGetMySubmittedResultsQuery({
    headers,
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const totalPage = Math.ceil(parseInt(meta?.total) / parseInt(meta?.limit));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    setMyResults(getMySubmittedResults?.data);
    setMeta(getMySubmittedResults?.meta);
  }, [getMySubmittedResults, getMySubmittedResults?.data]);

  return (
    <div>
      <Table
        tableTitle={`My Results (${
          getMySubmittedResults?.meta?.total
            ? getMySubmittedResults?.meta?.total
            : 0
        })`}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        meta={meta}
        allData={myResults}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tableHeadData={[
          <th className="sm:px-3 pt-0 pb-3">Subject</th>,
          <th className="sm:px-3 pt-0 pb-3">Total Q.</th>,
          <th className="sm:px-3 pt-0 pb-3">T. Attempt.</th>,
          <th className="sm:px-3 pt-0 pb-3">C. Ans</th>,
          <th className="sm:px-3 pt-0 pb-3">W. Ans</th>,
          <th className="sm:px-3 pt-0 pb-3"> T. Marks</th>,
        ]}
        tableBodyData={myResults?.map((result, index) => (
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
      />
      <Chart getMySubmittedResults={getMySubmittedResults} />
    </div>
  );
};

export default MyResults;

MyResults.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
