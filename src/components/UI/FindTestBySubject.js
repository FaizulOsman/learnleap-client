import Link from "next/link";
import React from "react";

const FindTestBySubject = ({ test }) => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
      <div>
        <h4 className="text-md font-semibold">
          {test?.subject} {test?.serial}
        </h4>
        <p>Question: {test?.questions?.length}</p>
        <p>Time: {test?.timeLimit} min</p>
      </div>
      <>
        <Link href={`/test/${test?.subject}/${test?.id}`}>
          <button className="btn btn-sm btn-primary">Start Test</button>
        </Link>
      </>
    </div>
  );
};

export default FindTestBySubject;
