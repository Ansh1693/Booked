import React from "react";
import { set, useForm } from "react-hook-form";
import Card from "../../common/Cards/Card";
import PrimaryButton from "../../common/Buttons/PrimaryButton";

const UserLogin = ({ setVerify }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submit, setSubmit] = React.useState(false);

  const onSubmit = async (data) => {
    setSubmit(true);
    try {
      const response = await fetch(`http://localhost:5001/api/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });
      const data1 = await response.json();
      console.log(data1);
      if (data1.success === true) {
        localStorage.setItem("token", data1.data.token);
        localStorage.setItem("userData", JSON.stringify({ email: data.email }));
        setVerify(true);
      } else {
        alert("Internal Server Error");
      }
    } catch (error) {
      alert("Internal Server Error");
    }
    setSubmit(false);
  };
  return (
    // <div className="w-full h-full flex  flex-col gap-16 pt-40 items-center">
    //   <div className="text-4xl font-bold text-primary">Login</div>
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="flex flex-col gap-2 items-center"
    //   >
    //     <label className="text-gray-700 text-xl font-normal">
    //       Enter Your email{" "}
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="abc@example.com"
    //       {...register("email", { required: true })}
    //       className="w-72 md:w-96 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary"
    //     />
    //     <button
    //       type="submit"
    //       className="w-72 md:w-96 h-12 mt-4 mb-4 rounded-lg bg-primary text-white font-normal"
    //       disabled={submit}
    //     >
    //       Submit
    //     </button>
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
            disabled={submit}
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

export default UserLogin;
