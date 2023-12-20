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
import Heading from "./Heading";

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
          <Heading
            text="Recharts of My Results"
            styles="text-white text-center"
          />

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
