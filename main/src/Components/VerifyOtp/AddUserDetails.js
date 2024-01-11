import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../Common/inputs/TextInput.js";
import { useHistory } from "react-router-dom";

const AddUserDetails = ({ setUserData }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/user`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          user: {
            firstName: data.firstName,
            lastName: data.lastName,
            mobile: data.mobile,
          },
        }),
      }
    );

    const res = await response.json();
    if (res.success && res.code === 200) {
      setUserData(res.message.user);
      history.push("/");
      setIsSubmitting(false);
    } else {
      alert("Error updating user");
    }

    setIsSubmitting(false);
  };

  const handleNotNow = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/getUser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );

    const data2 = await response.json();
    console.log(data2);
    if (data2.success === true && data2.message.user) {
      setUserData(data2.message.user);
      history.push("/");
    }
  };

  return (
    // <div
    //   className={`max-w-[1440px] w-full mx-auto min-h-[calc(100vh_-_60px)] md:w-[375px] mt-[40px]`}
    // >
    //   <div className="w-full -mt-[10px]">
    //     <div className="w-full md:w-full p-5 pt-2">
    //       <div className="flex flex-col gap-y-5">
    //         <div>
    //           <p className="font-[600] text-[23px]">Add User Details</p>
    //         </div>
    //         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[6px]">
    //           {/* <FileInput
    //                 profilePicture={profilePicture}
    //                 setProfilePicture={setProfilePicture}
    //                 label="Profile picture (Recommended size - 500 X 500 pixels)"
    //                 mb="5"
    //               /> */}
    //           <TextInput
    //             register={register}
    //             type="text"
    //             id={"firstName"}
    //             label="First Name"
    //           />
    //           <TextInput
    //             register={register}
    //             type="text"
    //             id={"lastName"}
    //             label="Last Name"
    //           />
    //           <TextInput
    //             register={register}
    //             type="tel"
    //             id={"mobile"}
    //             label="Phone Number"
    //             minLength={10}
    //             maxLength={10}
    //           />
    //           <div className="-mt-[10px] w-full bg-primary p-2 flex items-center justify-center rounded-lg">
    //             <button
    //               value={isSubmitting ? "Loading..." : "Save Changes"}
    //               type="submit"
    //               className=" text-white"
    //               disabled={isSubmitting}
    //             >
    //               Save Changes
    //             </button>
    //           </div>

    //           <div
    //             className="mt-[12px] w-full flex items-center gap-2 cursor-pointer text-primary justify-center"
    //             onClick={() => handleNotNow()}
    //             disabled={isSubmitting}
    //           >
    //             Not Now
    //           </div>
    //           {/* <div className="spacer mb-[35px]"></div> */}
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <section>
      <div className="relative flex justify-center max-h-full overflow-hidden lg:px-0 md:px-12">
        <div className="relative z-10 flex flex-col flex-1 px-4 py-10 bg-white shadow-2xl lg:py-24 md:flex-none md:px-28 sm:justify-center">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black">Let's get started!</h2>
                <p className="mt-4 text-sm text-gray-500">
                  Complete the details below so we can create your account at
                  Booked
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 space-y-6">
                <div>
                  <label
                    className="block mb-3 text-sm font-medium text-gray-600"
                    name="name"
                  >
                    First name
                  </label>
                  <input
                    className="input input-bordered w-full  font-semibold"
                    placeholder="First Name"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                  />
                </div>
                <div>
                  <label
                    className="block mb-3 text-sm font-medium text-gray-600"
                    name="name"
                  >
                    Last name
                  </label>
                  <input
                    className="input input-bordered w-full  font-semibold"
                    placeholder="First Name"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />
                </div>

                <div className="col-span-full">
                  <label
                    className="block mb-3 text-sm font-medium text-gray-600"
                    name="email"
                  >
                    How shall we contact you?
                  </label>
                  <input
                    className="input input-bordered w-full  font-semibold"
                    placeholder="Mobile Number"
                    type="text"
                    min={10}
                    max={10}
                    {...register("mobile", { required: "Mobile is required" })}
                  />
                </div>

                <div className="col-span-full">
                  <button
                    className="btn  w-full bg-primary text-white hover:bg-white hover:text-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading..." : "Save Changes"}
                  </button>
                </div>
                <div
                  className="mt-[12px] w-full flex items-center text-sm gap-2 cursor-pointer text-primary justify-center"
                  onClick={() => handleNotNow()}
                  disabled={isSubmitting}
                >
                  Not Now
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden bg-white lg:block lg:flex-1 lg:relative sm:contents">
          <div
            className="absolute inset-0 object-cover w-full h-full bg-white"
            alt=""
            height="1866"
            width="1664"
          >
            {/* <img className="object-center w-full h-auto bg-gray-200" src="../images/placeholders/rectangle2.svg" alt="" width="1310" height="873" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUserDetails;
