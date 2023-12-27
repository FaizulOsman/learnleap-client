import CheckoutForm from "@/components/UI/CheckoutForm";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
      <div>
        <div className="border rounded-lg p-4 md:p-8 lg:p-10 max-w-xl mx-auto shadow-lg hover:shadow-xl">
          <h3 className="text-xl md:text-3xl font-semibold text-primary">
            Payment for premium access
          </h3>
          <p className="text-sm sm:text-md pt-2">
            Please pay <span className="font-bold text-green-500">$12</span> to
            be a <span className="font-bold text-green-500">premium user</span>
          </p>
          <div className="w-full mt-8 md:mt-12">
            <Elements stripe={stripePromise}>
              <CheckoutForm></CheckoutForm>
            </Elements>
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
