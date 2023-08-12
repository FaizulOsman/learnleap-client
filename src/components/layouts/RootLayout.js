import React from "react";

const RootLayout = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="w-11/12 max-w-[1200px] mx-auto">{children}</div>
    </>
  );
};

export default RootLayout;
