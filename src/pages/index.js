import FindExamBySubject from "@/components/UI/FindExamBySubject";
import FindTestBySubject from "@/components/UI/FindTestBySubject";
import Loader from "@/components/UI/Loader";
import RootLayout from "@/components/layouts/RootLayout";
import { useGetAllExamQuery } from "@/redux/exam/examApi";
import { useGetAllTestQuery } from "@/redux/test/testApi";
import { useState } from "react";
import AllExams from "./exam";
import AllTests from "./test";

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
      <AllExams />
      <AllTests />
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
