import React from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/AllContexts";
import Card from "../../common/Cards/Card";
import PrimaryButton from "../../common/Buttons/PrimaryButton";
import OTPLogin from "./OtpLogin";

const VerifyLogin = ({ setVerify }) => {
  const [otp, setOtp] = React.useState(["", "", "", ""]);
  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    const inputChar = e.target.value;
    if (inputChar === "" || (regex.test(inputChar) && inputChar.length <= 1)) {
      // if (regex.test(inputChar) && inputChar.length <= 1) {
      const index = parseInt(e.target.id.slice(-1)) - 1;
      const newOtp = otp.slice();
      newOtp[index] = e.target.value;
      setOtp(newOtp);

      if (inputChar !== "" && index < 3) {
        const nextInput = e.target.nextSibling;
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (inputChar === "" && index > 0) {
        const prevInput = e.target.previousSibling;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };
  const { setUserData, setAccessToken } = React.useContext(UserContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submit, setSubmit] = React.useState(false);
  let token = localStorage.getItem("token");
  let user;
  user = JSON.parse(localStorage.getItem("userData"));

  const email = user?.email;

  if (!token && !email) {
    setVerify(false);
  }

  const onSubmit = async (data) => {
    setSubmit(true);
    const finalOtp = Number(otp.join(""));
    const response = await fetch(
      `http://localhost:5001/api/v1/admin/verifyOtp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: finalOtp,
          email: user.email,
          token: token,
        }),
      }
    );
    const data1 = await response.json();
    console.log(data1);

    if (data1.success === true && data1.data.jwt) {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.setItem("accessToken", data1.data.jwt);
      localStorage.setItem("role", data1.data.role);
      setAccessToken(data1.data.jwt);

      const response = await fetch(
        `http://localhost:5001/api/v1/${data1.data.role.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": data1.data.jwt,
          },
        }
      );

      const data2 = await response.json();
      console.log(data2);
      if (data2.success === true && data2.data) {
        setUserData(data2.data);
        navigate("/");
      }
    } else {
      reset({
        otp: "",
      });
      alert("Invalid OTP");
    }

    setSubmit(false);
  };

  return (
    <div
      className={`grid justify-center content-center w-full sm:max-w-[1280px]  mx-auto min-h-[calc(100vh-58px)]`}
    >
      <Card>
        <form
          className="w-[340px] flex flex-col gap-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-[24px] font-[700] block text-left w-[340px]">
            Enter OTP
          </p>
          {/* <ProgressBar width="45" step={1} /> */}
          <div>
            <OTPLogin otp={otp} handleChange={handleChange} />
          </div>

          <PrimaryButton
            type="submit"
            classes="!w-full !max-w-[340px]"
            text="Verify OTP"
          />
          <div
            className="flex w-full items-center justify-center gap-2 text-[12px] font-[500] text-primary text-left cursor-pointer"
            onClick={() => setVerify(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-4 h-4 stroke-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
            Go Back
          </div>

          {/* <p className="text-[12px] font-[500] text-gray-500 text-left w-full">
            Didn’t receive OTP?{" "}
            <span
              className={`
              text-[#2596be] cursor-pointer
            `}
              onClick={() => resendOtp()}
            >
              Resend OTP
            </span>{" "}
          </p> */}

          <div className="border-[1px] border-gray-300 w-full"></div>
          <p
            className="text-[12px] font-[500] text-gray-500 text-left w-full cursor-pointer	"
            onClick={() => setVerify(false)}
          >
            Not your email?{" "}
            <span onClick={() => setVerify(false)} className="text-primary">
              Change email address
            </span>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default VerifyLogin;
