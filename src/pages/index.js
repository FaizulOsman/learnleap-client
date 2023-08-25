import FindExamBySubject from "@/components/UI/FindExamBySubject";
import FindTestBySubject from "@/components/UI/FindTestBySubject";
import Loader from "@/components/UI/Loader";
import RootLayout from "@/components/layouts/RootLayout";
import { useGetAllExamQuery } from "@/redux/exam/examApi";
import { useGetAllTestQuery } from "@/redux/test/testApi";
import { useState } from "react";

const HomePage = () => {
  const [examCategory, setExamCategory] = useState("English");
  const [testCategory, setTestCategory] = useState("English");
  const { data: allExam } = useGetAllExamQuery();
  const { data: allTest } = useGetAllTestQuery();

  const examUniqueSubjects = [];
  allExam?.data?.map((exam) => {
    if (examUniqueSubjects?.length > 0) {
      const isSubjectExist = examUniqueSubjects?.find(
        (item) => item?.subject === exam?.subject
      );

      if (!isSubjectExist) {
        examUniqueSubjects.push(exam);
      }
    } else {
      examUniqueSubjects.push(exam);
    }
  });

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

  const filterByExamSubject = allExam?.data?.filter((exam) => {
    return exam?.subject === examCategory;
  });

  const filterByTestSubject = allTest?.data?.filter((exam) => {
    return exam?.subject === testCategory;
  });

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
          Exams
        </h1>
        {examUniqueSubjects && examUniqueSubjects.length > 0 ? (
          <div className="w-10/12 md:w-8/12 mx-auto flex flex-wrap justify-around gap-3">
            {examUniqueSubjects?.map((exam, index) => (
              <div
                key={index}
                onClick={() => setExamCategory(exam?.subject)}
                className={`relative mb-2 min-w-[96px] text-center hover:bg-green-500 px-2 py-1 rounded-md cursor-pointer hover:text-white font-semibold ${
                  examCategory === exam?.subject
                    ? "bg-green-500 text-white"
                    : " bg-gray-200"
                }`}
              >
                {examCategory === exam?.subject && (
                  <div className="absolute top-full left-[45%] triangle_down border-l-[7px] border-r-[7px] border-t-[10px] border-t-green-500 border-transparent"></div>
                )}
                {exam?.subject}
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
        <div className="mt-10 flex flex-col gap-5">
          {filterByExamSubject?.map((exam, index) => (
            <FindExamBySubject key={index} exam={exam} />
          ))}
        </div>
      </div>
      <div className="my-20">
        <h1 className="text-3xl font-bold text-center my-8 text-blue-600">
          Tests
        </h1>
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
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
