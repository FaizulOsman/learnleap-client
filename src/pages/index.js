import FindExamBySubject from "@/components/UI/FindExamBySubject";
import RootLayout from "@/components/layouts/RootLayout";
import { useGetAllExamQuery } from "@/redux/exam/examApi";
import { useState } from "react";

const HomePage = () => {
  const { data: allExam } = useGetAllExamQuery();
  const [category, setCategory] = useState("English");

  const uniqueSubjects = [];
  allExam?.data?.map((exam) => {
    if (uniqueSubjects?.length > 0) {
      const isSubjectExist = uniqueSubjects?.find(
        (item) => item?.subject === exam?.subject
      );

      if (!isSubjectExist) {
        uniqueSubjects.push(exam);
      }
    } else {
      uniqueSubjects.push(exam);
    }
  });

  const filterBySubject = allExam?.data?.filter((exam) => {
    return exam?.subject === category;
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-8">Exams</h1>
      <div className="w-10/12 md:w-8/12 mx-auto flex justify-between">
        {uniqueSubjects?.map((exam, index) => (
          <div
            key={index}
            onClick={() => setCategory(exam?.subject)}
            className="bg-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-300 hover:text-white font-semibold"
          >
            {exam?.subject}
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {filterBySubject?.map((exam, index) => (
          <FindExamBySubject key={index} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
