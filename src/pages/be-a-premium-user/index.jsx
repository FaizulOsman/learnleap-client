import CheckoutForm from "@/components/UI/CheckoutForm";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import React from "react";

const jwt = require("jsonwebtoken");
const stripePromise = loadStripe(
  "pk_test_51M6PliGqeF8wbH6b9klANesQWSF3gOocjioEziSGv0r5IPabVNxVsGDTxKHz4IbkxUJOP5IrzFa8kLBFb4RtVENH00PX0Y5qa9"
);

const BeAPremiumUser = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 min-h-[50vh]">
        <div className="md:border-r-2">
          <Image
            src="https://i.ibb.co/P1hNm8g/bkash-logo-FBB258-B90-F-seeklogo-com.png"
            width={250}
            height={250}
            alt="Bkash logo"
            className="w-28 mx-auto"
          />
          <h4 className="text-center font-semibold pt-4">
            Personal No. : <span className="text-blue-500">+8801405314523</span>
          </h4>
          <h4 className="text-center font-semibold pt-2">
            Reference : Your Email
          </h4>
          <h4 className="text-center font-semibold pt-2">
            Payment: <span className="text-green-500">$12</span>
          </h4>
        </div>
        <div>
          <div className="border rounded-lg p-4 md:p-8 lg:p-10 max-w-xl mx-auto shadow-lg hover:shadow-xl">
            <h3 className="text-xl md:text-3xl font-semibold text-primary">
              Payment for premium access
            </h3>
            <p className="text-sm sm:text-md pt-2">
              Please pay <span className="font-bold text-green-500">$12</span>{" "}
              to be a{" "}
              <span className="font-bold text-green-500">premium user</span>
            </p>
            <div className="w-full mt-8 md:mt-12">
              <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeAPremiumUser;

BeAPremiumUser.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
