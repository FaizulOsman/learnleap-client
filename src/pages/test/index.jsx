import FindTestBySubject from "@/components/UI/FindTestBySubject";
import Heading from "@/components/UI/Heading";
import Loader from "@/components/UI/Loader";
import RootLayout from "@/layouts/RootLayout";
import { useGetAllTestQuery } from "@/redux/test/testApi";
import React, { useState } from "react";

const AllTests = () => {
  const [testCategory, setTestCategory] = useState("English");
  const { data: allTest } = useGetAllTestQuery();

  const testUniqueSubjects = [];
  allTest?.data?.map((test) => {
    if (testUniqueSubjects?.length > 0) {
      const isSubjectExist = testUniqueSubjects?.find(
        (item) => item?.subject === test?.subject
      );

      if (!isSubjectExist) {
        testUniqueSubjects.push(test);
      }
    } else {
      testUniqueSubjects.push(test);
    }
  });

  const filterByTestSubject = allTest?.data?.filter((exam) => {
    return exam?.subject === testCategory;
  });

  return (
    <div className="my-20">
      <Heading text="Tests" styles="text-blue-600 text-center" />
      {testUniqueSubjects && testUniqueSubjects.length > 0 ? (
        <div className="w-10/12 md:w-8/12 mx-auto flex flex-wrap justify-around gap-3">
          {testUniqueSubjects?.map((test, index) => (
            <div
              key={index}
              onClick={() => setTestCategory(test?.subject)}
              className={`relative mb-2 min-w-[96px] text-center hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer hover:text-white font-semibold ${
                testCategory === test?.subject
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {testCategory === test?.subject && (
                <div className="absolute top-full left-[45%] triangle_down border-l-[7px] border-r-[7px] border-t-[10px] border-t-blue-500 border-transparent"></div>
              )}
              {test?.subject}
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
      <div className="mt-10 flex flex-col gap-5">
        {filterByTestSubject?.map((test, index) => (
          <FindTestBySubject key={index} test={test} />
        ))}
      </div>
    </div>
  );
};

export default AllTests;

AllTests.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
