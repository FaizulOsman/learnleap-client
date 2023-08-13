import RootLayout from "@/components/layouts/RootLayout";
import { useGetAllTestQuery } from "@/redux/testSlice/testApi";
import Link from "next/link";
import { useState } from "react";

const HomePage = () => {
  const { data: allTest } = useGetAllTestQuery();
  const [category, setCategory] = useState("English");

  const uniqueSubjects = [];
  allTest?.data?.map((test) => {
    if (uniqueSubjects?.length > 0) {
      const isSubjectExist = uniqueSubjects?.find(
        (item) => item?.subject === test?.subject
      );

      if (!isSubjectExist) {
        uniqueSubjects.push(test);
      }
    } else {
      uniqueSubjects.push(test);
    }
  });

  const filterBySubject = allTest?.data?.filter((test) => {
    return test?.subject === category;
  });

  console.log(filterBySubject);
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-8">Categories</h1>
      <div className="w-10/12 md:w-8/12 mx-auto flex justify-between">
        {uniqueSubjects?.map((test, index) => (
          <div
            key={index}
            onClick={() => setCategory(test?.subject)}
            className="bg-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-white font-semibold"
          >
            {test?.subject}
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {filterBySubject?.map((test, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-200 p-2 rounded-md"
          >
            <div>
              <h4 className="text-md font-semibold">
                {test?.subject} {test?.serial}
              </h4>
              <p>Question: {test?.questions?.length}</p>
              <p>Time: {test?.timeLimit} min</p>
            </div>
            <Link href={`/test/${test?.subject}/${test?.id}`}>
              <button className="btn btn-sm btn-primary">Start Test</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
