import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ getMySubmittedResults }) => {
  const data = getMySubmittedResults?.data?.map((result) => {
    return {
      name: `${result?.subject} ${result?.serial}`,
      percentage: (result?.totalMarks / result?.totalQues) * 100,
    };
  });

  return (
    <>
      {data?.length > 0 && (
        <div className="my-20">
          <h2 className="text-lg sm:text-2xl font-semibold text-center mb-8">
            Recharts of My Results
          </h2>
          <ResponsiveContainer width="90%" className="mx-auto" height={300}>
            <LineChart LineChart data={data}>
              <Line dataKey="percentage" type="monotone" stroke="red" />
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="lightgray" strokeDasharray="5 5" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;
