import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/hotelsContext";
import AddUserDetails from "./AddUserDetails";
import OTPLogin from "./OtpLogin";
import Card from "../../Common/cards/Card";
import PrimaryButton from "../../Common/buttons/PrimaryButton";

const Verify = () => {
  const { userData, setUserData } = React.useContext(UserContext);
  const search = useLocation().search;
  const [otp, setOtp] = React.useState(["", "", "", ""]);
  const [newUser, setNewUser] = React.useState(false);
  const params = new URLSearchParams(search).get("redirect");
  const history = useHistory();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let token = localStorage.getItem("token");
  let user;
  console.log(user, "22");
  user = JSON.parse(localStorage.getItem("userData"));
  if (!user) user = JSON.parse(localStorage.getItem("bookingUserData"));
  const email = user?.email;

  console.log(params);
  // if (!token && !newUser) {
  //   history.push("/login");
  // }

  const onSubmit = async (data) => {
    console.log(data);

    console.log(email, "email");
    const finalOtp = Number(otp.join(""));

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/verifyOtp`,
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
      localStorage.removeItem("bookingUserData");
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.setItem("accessToken", data1.data.jwt);
      if (data1.data.newUser) {
        setNewUser(data1.data.newUser);
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/getUser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": data1.data.jwt,
            },
          }
        );

        const data2 = await response.json();
        // console.log(data2);
        if (data2.success === true && data2.message.user) {
          setUserData(data2.message.user);
          if (params) {
            history.push(params);
          } else {
            history.push("/");
          }
        }
      }
    } else {
      reset({
        otp: "",
      });
      alert("Invalid OTP");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/sendOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(data.message.token);
      if (data.success === true) {
        alert("Otp Sent");
        token = data.message.token;
        localStorage.setItem("token", token);
        reset({
          otp: "",
        });
      }
    } catch (error) {}
  };

  return (
    <>
      {!newUser && (
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
                onClick={() => history.push("/login")}
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

              <p className="text-[12px] font-[500] text-gray-500 text-left w-full">
                Didn’t receive OTP?{" "}
                <span
                  className={`
                    text-[#2596be] cursor-pointer
                  `}
                  onClick={() => resendOtp()}
                >
                  Resend OTP
                </span>{" "}
              </p>

              <div className="border-[1px] border-gray-300 w-full"></div>
              <p
                className="text-[12px] font-[500] text-gray-500 text-left w-full cursor-pointer	"
                onClick={() => history.push("/login")}
              >
                Not your email?{" "}
                <span
                  onClick={() => history.push("/login")}
                  className="text-primary"
                >
                  Change email address
                </span>
              </p>
            </form>
          </Card>
        </div>
      )}
      {newUser && <AddUserDetails setUserData={setUserData} />}
    </>
  );
};

export default Verify;

// {...register('otp', { required:' otp is required' })}
