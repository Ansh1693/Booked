import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import PrimaryButton from "../../Common/buttons/PrimaryButton";
import Card from "../../Common/cards/Card";
// import {UserContext} from '../../App'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    console.log(process.env.REACT_APP_SERVER_URL);
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      }
    );
    const data1 = await response.json();
    console.log(data1);
    if (data1.success === true) {
      localStorage.setItem("token", data1.data.token);
      localStorage.setItem("userData", JSON.stringify({ email: data.email }));
      history.push("/verify");
    }
    setLoading(false);
  };

  return (
    // <div className="grid justify-center content-center w-full sm:max-w-[1280px] mx-auto h-[calc(100vh-64px)] space-y-8">
    //   <div className="text-2xl w-full text-center font-bold text-primary">Login to Booked!!</div>
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="flex flex-col gap-8 items-center"
    //   >

    //     <PrimaryButton
    //         text="Send Otp to Login"
    //         classes="!w-full"
    //         type="submit"
    //         />

    //   </form>
    // </div>
    <div
      className={`grid justify-center content-center w-full sm:max-w-[1280px] mx-auto h-[calc(100vh-58px)]`}
    >
      <Card>
        <form
          className="max-w-[340px] flex flex-col gap-[20px]"
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
          <PrimaryButton
            type="submit"
            classes="!w-full !max-w-[340px]"
            disabled={loading}
            text="Send Otp to Login"
          />

          <p className="text-[13px] font-[500]">
            By continuing you agree to the{" "}
            <span className="text-primary">Term of Service</span> and{" "}
            <span className="text-primary">Privacy Policy</span>
          </p>
        </form>
      </Card>
      {/* <ScanIcon /> */}
    </div>
  );
};

export default Login;
