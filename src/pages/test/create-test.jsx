import AdminLayout from "@/components/layouts/AdminLayout";
import { useCreateTestMutation } from "@/redux/testSlice/testApi";
import { useState } from "react";

const CreateTest = () => {
  const [ques, setQues] = useState([]);
  const [time, setTime] = useState(0);
  const [createTest, { data, isError, isLoading, isSuccess, error }] =
    useCreateTestMutation();

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
  };

  const handleSetTime = (e) => {
    e.preventDefault();
    setTime(parseInt(e.target.setTime.value));
  };

  const handleCreateTest = () => {
    const test = {
      questions: ques,
      timeLimit: time,
    };
    createTest(test);
  };

  return (
    <div className="my-5">
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto border rounded-lg p-5">
        <div>
          {ques?.map((q, i) => (
            <div key={i}>
              <h4 className="text-xl font-semibold">
                Question {i + 1}. {q?.question}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <span>1. {q?.option1}</span>
                <span>2. {q?.option2}</span>
                <span>3. {q?.option3}</span>
                <span>4. {q?.option4}</span>
                <span>5. {q?.option5}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <span>Answer. {q?.answer}</span>
                <span>Subject. {q?.subject}</span>
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
        <h4 className="text-lg font-semibold">Time: {time}</h4>
        <form
          onSubmit={(e) => handleSetTime(e)}
          className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 mt-4"
        >
          <input
            type="number"
            name="setTime"
            placeholder="Set Time In Minute"
            className="input input-bordered input-primary input-sm w-full"
            required
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Set Time
          </button>
        </form>
      </div>
      <div className="w-96 mx-auto">
        <button
          onClick={() => handleCreateTest()}
          className="btn btn-sm w-full btn-primary mt-5"
        >
          Create Test
        </button>
      </div>
    </div>
  );
};

export default CreateTest;

CreateTest.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
