import AdminLayout from "@/components/layouts/AdminLayout";
import { useCreateExamMutation } from "@/redux/exam/examApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CreateExam = () => {
  const [ques, setQues] = useState([]);
  const [time, setTime] = useState(0);
  const [subject, setSubject] = useState("");
  const [serial, setSerial] = useState(0);
  const [createExam, { data, isError, isLoading, isSuccess, error, status }] =
    useCreateExamMutation();

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
      ...ques,
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
  }, []);

  const headers = {
    authorization: accessToken,
  };

  const handleCreateExam = () => {
    const data = {
      questions: ques,
      timeLimit: time,
      subject: subject,
      serial: serial,
    };

    if (ques.length > 0 && subject.length > 1 && serial > 0) {
      createExam({ data, headers });
      // Clear all data after creating the exam
      setQues([]);
      setTime(0);
      setSubject("");
      setSerial(0);
    } else {
      toast.error("Exam Creation Failed!");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(`${error?.data?.message}` || "Exam Creation Failed!");
    }

    if (isSuccess) {
      toast.success("Exam Created Successfully!");
    }
  }, [isLoading, isSuccess, isError, error]);

  return (
    <div className="my-5">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto border rounded-lg p-5">
        <div>
          {ques?.map((q, i) => (
            <div key={i} className="mb-5">
              <h4 className="text-xl font-semibold">
                Question {i + 1}. {q?.question}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <span>1. {q?.option1}</span>
                <span>2. {q?.option2}</span>
                {q?.option3 && <span>3. {q?.option3}</span>}
                {q?.option4 && <span>4. {q?.option4}</span>}
                {q?.option5 && <span>5. {q?.option5}</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <span className="font-semibold">Answer. {q?.answer}</span>
                <span className="font-semibold">Subject. {q?.subject}</span>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-center my-5">Add A Question</h3>
        <div>
          <form onSubmit={(e) => handleAddQuestion(e)}>
            <input
              type="text"
              name="question"
              placeholder="Type your question here"
              className="input input-bordered w-full"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 mt-4">
              <input
                type="text"
                name="option1"
                placeholder="Option 1"
                className="input input-bordered input-sm w-full"
                required
              />
              <input
                type="text"
                name="option2"
                placeholder="Option 2"
                className="input input-bordered input-sm w-full"
                required
              />
              <input
                type="text"
                name="option3"
                placeholder="Option 3"
                className="input input-bordered input-sm w-full"
                required
              />
              <input
                type="text"
                name="option4"
                placeholder="Option 4"
                className="input input-bordered input-sm w-full"
                required
              />
              <input
                type="text"
                name="option5"
                placeholder="Option 5 (Optional)"
                className="input input-bordered input-sm w-full"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                className="input input-bordered input-sm w-full"
              />
              <input
                type="text"
                name="answer"
                placeholder="Answer"
                className="input input-bordered input-primary input-sm w-full"
                required
              />
              <button type="submit" className="btn btn-sm w-full btn-primary">
                Add A Question
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto mt-5 border rounded-lg p-5">
        <div className="flex justify-between flex-wrap">
          {time > 0 && <h4 className="text-lg font-semibold">Time: {time}</h4>}
          {subject.length > 1 && (
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
          <input
            type="number"
            name="setTime"
            placeholder="Set Time In Minute"
            className="input input-bordered input-primary input-sm w-full"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject (Mandatory)"
            className="input input-bordered input-primary input-sm w-full"
            required
          />
          <input
            type="number"
            name="serial"
            placeholder="Serial"
            className="input input-bordered input-primary input-sm w-full"
            required
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Set
          </button>
        </form>
      </div>
      <div className="w-96 mx-auto">
        <button
          onClick={() => handleCreateExam()}
          className="btn btn-sm w-full btn-primary mt-5"
        >
          Create Exam
        </button>
      </div>
    </div>
  );
};

export default CreateExam;

CreateExam.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
