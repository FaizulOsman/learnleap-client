import React from "react";
import RootLayout from "../../layouts/RootLayout";
import { useGetAllFaqQuery } from "../../redux/faq/faqApi";
import Loader from "../../components/UI/Loader";

const FAQPage = () => {
  const { data: allFaq } = useGetAllFaqQuery();

  return (
    <div className="mt-20">
      <h2 className="text-2xl md:text-3xl font-semibold text-center pb-10">
        Frequently Asked Questions
      </h2>
      {allFaq?.data?.length > 0 ? (
        <>
          {allFaq?.data?.length > 0 ? (
            <div className="join join-vertical w-full">
              {allFaq?.data?.map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium">
                    {faq?.question}
                  </div>
                  <div className="collapse-content">
                    <p>{faq?.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-xl sm:text-2xl py-20 text-center text-red-500">
              No data found
            </h1>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FAQPage;

FAQPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
