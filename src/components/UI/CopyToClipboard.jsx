import React from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

const CopyToClipboard = ({ text, styles }) => {
  const copyToClipboard = () => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Copied to clipboard!");
  };

  return <FaRegCopy onClick={() => copyToClipboard()} className={styles} />;
};

export default CopyToClipboard;
