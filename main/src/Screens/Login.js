import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import LoginComponent from "../Components/login/Login";

const Login = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <LoginComponent />
    </div>
  );
};

export default Login;
