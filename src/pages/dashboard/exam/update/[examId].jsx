import AdminLayout from "@/layouts/AdminLayout";
import {
  useGetSingleExamQuery,
  useUpdateExamMutation,
} from "@/redux/exam/examApi";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

const UpdateExam = () => {
  const router = useRouter();
  const id = router.query.examId;
  const { data: getSingleExam } = useGetSingleExamQuery(id);

  const [ques, setQues] = useState([]);
  const [time, setTime] = useState(0);
  const [subject, setSubject] = useState("");
  const [serial, setSerial] = useState(0);
  const [newQuesId, setNewQuesId] = useState("");
  // State for every Question
  const [initialQuestion, setInitialQuestion] = useState("");
  const [initialOption1, setInitialOption1] = useState("");
  const [initialOption2, setInitialOption2] = useState("");
  const [initialOption3, setInitialOption3] = useState("");
  const [initialOption4, setInitialOption4] = useState("");
  const [initialOption5, setInitialOption5] = useState("");
  const [initialSubject, setInitialSubject] = useState("");
  const [initialAnswer, setInitialAnswer] = useState("");

  const filterQues = ques?.filter((q) => q.id !== newQuesId);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const option1 = e.target.option1.value;
    const option2 = e.target.option2.value;
    const option3 = e.target.option3.value;
    const option4 = e.target.option4.value;
    const option5 = e.target.option5.value;
    const subject = e.target.subject.value;
    const answer = e.target.answer.value;

    setQues([
      ...filterQues,
      {
        question,
        option1,
        option2,
        option3,
        option4,
        option5,
        subject,
        answer,
      },
    ]);

    e.target.question.value = "";
    e.target.option1.value = "";
    e.target.option2.value = "";
    e.target.option3.value = "";
    e.target.option4.value = "";
    e.target.option5.value = "";
    e.target.subject.value = "";
    e.target.answer.value = "";
  };

  const handleSet = (e) => {
    e.preventDefault();
    setTime(parseInt(e.target.setTime.value));
    setSubject(e.target.subject.value);
    setSerial(parseInt(e.target.serial.value));
    e.target.setTime.value = "";
    e.target.subject.value = "";
    e.target.serial.value = "";
  };

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const acc = localStorage.getItem("access-token");
    setAccessToken(acc);

    if (getSingleExam?.data?.questions) {
      setQues(getSingleExam?.data?.questions);
    }
  }, [getSingleExam?.data?.questions]);

  const headers = {
    authorization: accessToken,
  };

  const [updateExam, { isLoading, isSuccess, isError, error }] =
    useUpdateExamMutation();

  const handleUpdateExam = () => {
    const data = {
      questions: ques,
      timeLimit: time,
      subject: subject,
      serial: serial,
    };
    updateExam({ id, data, headers });
    console.log(data);
    // if (ques.length > 0 && subject.length > 1 && serial > 0) {
    //   createExam({ data, headers });
    //   // Clear all data after creating the exam
    //   setQues([]);
    //   setTime(0);
    //   setSubject("");
    //   setSerial(0);
    // } else {
    //   toast.error("Exam Creation Failed!");
    // }
  };

  const [questionForm, setQuestionForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    subject: "",
    answer: "",
  });
  const handleSetQues = (q, index) => {
    setQuestionForm({ ...q });
    setNewQuesId(q?.id);
    toast.success(`Selected Question: ${index + 1}`);
  };

  useEffect(() => {
    if (isError) {
      toast.error(`${error?.data?.message}` || "Exam Creation Failed!");
    }

    if (isSuccess) {
      toast.success("Exam Updated Successfully!");
    }

    setTime(getSingleExam?.data?.timeLimit);
    setSubject(getSingleExam?.data?.subject);
    setSerial(getSingleExam?.data?.serial);
    setInitialQuestion(questionForm?.question);
    setInitialOption1(questionForm?.option1);
    setInitialOption2(questionForm?.option2);
    setInitialOption3(questionForm?.option3);
    setInitialOption4(questionForm?.option4);
    setInitialOption5(questionForm?.option5);
    setInitialSubject(questionForm?.subject);
    setInitialAnswer(questionForm?.answer);
  }, [isLoading, isSuccess, isError, error, getSingleExam?.data, questionForm]);

  return (
    <div>
      <div className="w-11/12 md:w-8/12 mx-auto my-14">
        <h2 className="text-3xl font-semibold text-center">
          Update Exam {getSingleExam?.data?.serial}
        </h2>
      </div>
      <div className="my-5">
        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto border rounded-lg border-blue-500 p-5">
          <div>
            {ques?.map((q, i) => (
              <div key={i} className="mb-5">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold">
                    Question {i + 1}. {q?.question}
                  </h4>
                  <button
                    onClick={() => handleSetQues(q, i)}
                    className="text-lg border-none text-primary hover:text-blue-600"
                  >
                    <FaRegEdit />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <span>1. {q?.option1}</span>
                  <span>2. {q?.option2}</span>
                  {q?.option3 && <span>3. {q?.option3}</span>}
                  {q?.option4 && <span>4. {q?.option4}</span>}
                  {q?.option5 && <span>5. {q?.option5}</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <span className="font-semibold">Answer. {q?.answer}</span>
                  {q?.subject && (
                    <span className="font-semibold">Subject. {q?.subject}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-center mb-5 mt-10">
            Add or Update A Question
          </h3>
          <div>
            <form className="updateForm" onSubmit={(e) => handleAddQuestion(e)}>
              <input
                type="text"
                name="question"
                placeholder="Type your question here"
                className="input input-bordered w-full bg-[#1d1836]"
                value={initialQuestion}
                onChange={(e) => setInitialQuestion(e.target.value)}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 mt-4">
                <input
                  type="text"
                  name="option1"
                  placeholder="Option 1"
                  className="input input-bordered input-sm w-full bg-[#1d1836]"
                  value={initialOption1}
                  onChange={(e) => setInitialOption1(e.target.value)}
                  required
                />
                <input
                  type="text"
                  name="option2"
                  placeholder="Option 2"
                  className="input input-bordered input-sm w-full bg-[#1d1836]"
                  value={initialOption2}
                  onChange={(e) => setInitialOption2(e.target.value)}
                  required
                />
                <input
                  type="text"
                  name="option3"
                  placeholder="Option 3"
                  className="input input-bordered input-sm w-full bg-[#1d1836]"
                  value={initialOption3}
                  onChange={(e) => setInitialOption3(e.target.value)}
                />
                <input
                  type="text"
                  name="option4"
                  placeholder="Option 4"
                  className="input input-bordered input-sm w-full bg-[#1d1836]"
                  value={initialOption4}
                  onChange={(e) => setInitialOption4(e.target.value)}
                />
                <input
                  type="text"
                  name="option5"
                  placeholder="Option 5 (Optional)"
                  className="input input-bordered input-sm w-full bg-[#1d1836]"
                  value={initialOption5}
                  onChange={(e) => setInitialOption5(e.target.value)}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (Optional)"
                  className="input input-bordered input-sm w-full bg-[#1d1836]"
                  value={initialSubject}
                  onChange={(e) => setInitialSubject(e.target.value)}
                />
                <input
                  type="text"
                  name="answer"
                  placeholder="Answer"
                  className="input input-bordered input-primary input-sm w-full bg-[#1d1836]"
                  value={initialAnswer}
                  onChange={(e) => setInitialAnswer(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-sm w-full btn-primary">
                  Update Question
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg border-blue-500 p-5">
          <div className="flex justify-between flex-wrap">
            {time > 0 && (
              <h4 className="text-lg font-semibold">Time: {time}</h4>
            )}
            {subject?.length > 1 && (
              <h4 className="text-lg font-semibold">Subject: {subject}</h4>
            )}
            {serial > 0 && (
              <h4 className="text-lg font-semibold">Serial: {serial}</h4>
            )}
          </div>
          <form
            onSubmit={(e) => handleSet(e)}
            className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 mt-4"
          >
            <div className="relative">
              <input
                type="number"
                id="setTime"
                name="setTime"
                className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                autoComplete="off"
                defaultValue={getSingleExam?.data?.timeLimit}
                required
              />
              <label
                htmlFor="setTime"
                className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
              >
                Set Time (Minute)
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                autoComplete="off"
                defaultValue={getSingleExam?.data?.subject}
                required
              />
              <label
                htmlFor="subject"
                className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
              >
                Subject (Mandatory)
              </label>
            </div>
            <div className="relative">
              <input
                type="number"
                id="serial"
                name="serial"
                className="input-sm input-primary w-full py-3 px-4 border rounded-lg focus:outline-none focus:border-blue-500 bg-[#1d1836]"
                autoComplete="off"
                defaultValue={getSingleExam?.data?.serial}
                required
              />
              <label
                htmlFor="serial"
                className="absolute text-sm left-6 -top-3  bg-[#1d1836] rounded-lg px-2 text-primary transition-all duration-300"
              >
                Serial
              </label>
            </div>
            <button type="submit" className="btn btn-sm btn-primary">
              Set
            </button>
          </form>
        </div>
        <div className="w-96 mx-auto">
          <button
            onClick={() => handleUpdateExam()}
            className="btn btn-sm w-full btn-primary mt-5"
          >
            Update Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateExam;

UpdateExam.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
