import React from "react";
import RootLayout from "../../layouts/RootLayout";
import { useGetAllFaqQuery } from "../../redux/faq/faqApi";
import Loader from "../../components/UI/Loader";
import Heading from "@/components/UI/Heading";

const FAQPage = () => {
  // Data Query
  const { data: allFaq } = useGetAllFaqQuery({
    limit: 10,
    page: 1,
    sortOrder: "asc",
  });

  return (
    <div className="mt-20">
      <Heading
        text="Frequently Asked Questions"
        styles="text-blue-600 text-center"
      />
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
                  <div className="collapse-title text-base md:text-xl font-medium">
                    {faq?.question}
                  </div>
                  <div className="collapse-content">
                    <p className="text-sm md:text-base">{faq?.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-xl sm:text-2xl py-20 text-center text-red-500">
              No data found
            </h2>
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
