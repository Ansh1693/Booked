import React from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../common/Buttons/PrimaryButton";
import Card from "../../common/cards/Card";
import { useNavigate } from "react-router-dom";
// import {UserContext} from '../../App'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("password");
  const onSubmit = async (data) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/partner/reception/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );
    const data1 = await response.json();
    console.log(data1);
    if (data1.success === true) {
      localStorage.setItem("accessToken", data1.data.token);
      navigate("/");
    }
    setLoading(false);
  };

  return (
    // </div>
    <div
      className={`grid justify-center content-center w-full sm:max-w-[1280px] mx-auto h-[calc(100vh-58px)]`}
    >
      <Card>
        <form
          className="w-[340px] flex flex-col gap-[20px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-[22px] font-[700] block text-left mb-[10px]">
            Login to Booked!!
          </p>
          <div>
            <input
              type="text"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="input input-bordered w-full max-w-[340px] text-[12px] font-semibold"
            />
          </div>
          <div className="relative">
            <input
              type={password}
              placeholder="Password"
              {...register("password", { required: true })}
              className="input input-bordered w-full max-w-[340px] text-[12px] font-semibold"
            />
            <div
              className="absolute top-1/2  -translate-y-1/2 cursor-pointer right-4"
              onMouseEnter={() => {
                setPassword("text");
              }}
              onMouseLeave={() => {
                setPassword("password");
              }}
            >
              {password !== "password" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  className="w-6 h-6 stroke-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  className="w-6 h-6  stroke-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>

          <PrimaryButton
            type="submit"
            classes="!w-full"
            disabled={loading}
            text="Login"
          />

          {/* <p className="text-[13px] font-[500]">
          By continuing you agree to the{" "}
          <span className="text-primary">Term of Service</span> and{" "}
          <span className="text-primary">Privacy Policy</span>
        </p> */}
        </form>
      </Card>
      {/* <ScanIcon /> */}
    </div>
  );
};

export default Login;
