import useProtectedRoute from "@/hooks/useProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import Image from "next/image";
import React from "react";

const jwt = require("jsonwebtoken");

const BeAPremiumUser = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;
  const decodedToken = jwt.decode(accessToken);

  // Protect Route
  useProtectedRoute(decodedToken?.role || "guest");

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 min-h-[50vh]">
        <div className="border-r-2">
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
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BeAPremiumUser;

BeAPremiumUser.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
