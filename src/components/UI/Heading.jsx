import React from "react";

const Heading = ({ text, styles }) => {
  return <h2 className={`text-3xl font-semibold pb-10 ${styles}`}>{text}</h2>;
};

export default Heading;
