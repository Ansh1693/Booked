import React from "react";
import Verify from "../Components/VerifyOtp/Verify.js";
import Navbar from "../Components/Navbar/Navbar";

const VerifyOtp = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Verify />
    </div>
  );
};

export default VerifyOtp;
