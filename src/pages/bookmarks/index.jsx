import BookmarkSingleQues from "@/components/UI/BookmarkSingleQues";
import Heading from "@/components/UI/Heading";
import Loader from "@/components/UI/Loader";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import { useGetAllBookmarkQuery } from "@/redux/bookmark/bookmarkApi";
import React, { useEffect, useRef, useState } from "react";

const jwt = require("jsonwebtoken");

const Bookmarks = () => {
  const [testCategory, setTestCategory] = useState("English");
  const [count, setCount] = useState(0);
  const [ques, setQues] = useState([]);
  const submitButtonRef = useRef(null);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  const headers = {
    authorization: accessToken,
  };

  const wrong = ques?.length - count;
  const mark = count - wrong * 0.25;
  const totalMark = mark > 0 ? mark : 0;

  const { data: getAllBookmark } = useGetAllBookmarkQuery({ headers });
  const getAllBookmarkBySubject = getAllBookmark?.data?.filter((bookmark) => {
    return bookmark?.subject === testCategory;
  });

  const bookmarkSubjects = getAllBookmark?.data?.map(
    (bookmark) => bookmark?.subject
  );
  const uniqueSubjects = [...new Set(bookmarkSubjects)];

  useEffect(() => {
    submitButtonRef.current.click();
  }, []);

  return (
    <div className="w-11/12 md:w-8/12 mx-auto my-20">
      <Heading text="Bookmarks" styles="text-blue-600 text-center" />

      {uniqueSubjects && uniqueSubjects?.length > 0 ? (
        <>
          {uniqueSubjects?.length > 0 ? (
            <div className="w-10/12 md:w-8/12 mx-auto flex flex-wrap justify-around gap-3">
              {uniqueSubjects?.map((subject, index) => (
                <div
                  key={index}
                  onClick={() => setTestCategory(subject)}
                  className={`relative mb-2 min-w-[96px] text-center hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer hover:text-white font-semibold ${
                    testCategory === subject
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {testCategory === subject && (
                    <div className="absolute top-full left-[45%] triangle_down border-l-[7px] border-r-[7px] border-t-[10px] border-t-blue-500 border-transparent"></div>
                  )}
                  {subject}
                </div>
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <div className="min-h-[30vh] flex items-center justify-center">
          <h2 className="text-md sm:text-xl md:text-2xl text-red-500">
            No data found
          </h2>
        </div>
      )}
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-4">
          {getAllBookmarkBySubject?.map((bookmark, index) => (
            <BookmarkSingleQues
              key={index}
              bookmark={bookmark}
              index={index}
              count={count}
              setCount={setCount}
              ques={ques}
              setQues={setQues}
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <label
            htmlFor="my-modal-4"
            className="btn btn-primary modal-button"
            ref={submitButtonRef}
            disabled={uniqueSubjects?.length > 0 ? false : true}
          >
            Result
          </label>
          {uniqueSubjects && uniqueSubjects?.length > 0 && (
            <>
              <input type="checkbox" id="my-modal-4" className="modal-toggle" />
              <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative py-10" htmlFor="">
                  <h3 className="text-lg font-bold text-green-500">
                    Total Correct Answer: {count}
                  </h3>
                  <h3 className="text-lg font-bold text-red-500">
                    Total Wrong Answer: {wrong}
                  </h3>
                  <h3 className="text-xl font-bold text-green-500 pt-2">
                    You Got: {totalMark}
                  </h3>
                  <p className="pt-3">Keep going...!!!</p>
                </label>
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;

Bookmarks.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
