import MetaData from "@/components/SEO/MetaData";
import FindExamBySubject from "@/components/UI/FindExamBySubject";
import Heading from "@/components/UI/Heading";
import Loader from "@/components/UI/Loader";
import RootLayout from "@/layouts/RootLayout";
import { useGetAllExamQuery } from "@/redux/exam/examApi";
import React, { useState } from "react";

const AllExams = () => {
  const [examCategory, setExamCategory] = useState("English");
  const { data: allExam } = useGetAllExamQuery();

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

  const filterByExamSubject = allExam?.data?.filter((exam) => {
    return exam?.subject === examCategory;
  });
  console.log(filterByExamSubject);

  return (
    <div>
      <MetaData title="Learn Leap" />
      <Heading text="Exams" styles="text-green-600 text-center" />
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
          <div key={index}>
            {exam?.isPublished && <FindExamBySubject exam={exam} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllExams;

AllExams.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
