import FindExamBySubject from "@/components/UI/FindExamBySubject";
import FindTestBySubject from "@/components/UI/FindTestBySubject";
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

  const filterByTestSubject = allExam?.data?.filter((exam) => {
    return exam?.subject === testCategory;
  });

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold text-center my-8">Exams</h1>
        <div className="w-10/12 md:w-8/12 mx-auto flex justify-between">
          {examUniqueSubjects?.map((exam, index) => (
            <div
              key={index}
              onClick={() => setExamCategory(exam?.subject)}
              className="bg-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-white font-semibold"
            >
              {exam?.subject}
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {filterByExamSubject?.map((exam, index) => (
            <FindExamBySubject key={index} exam={exam} />
          ))}
        </div>
      </div>
      <div className="my-20">
        <h1 className="text-3xl font-semibold text-center my-8">Tests</h1>
        <div className="w-10/12 md:w-8/12 mx-auto flex justify-between">
          {testUniqueSubjects?.map((test, index) => (
            <div
              key={index}
              onClick={() => setTestCategory(test?.subject)}
              className="bg-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-white font-semibold"
            >
              {test?.subject}
            </div>
          ))}
        </div>
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
