import React from 'react'
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom'

const Signup = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const onSubmit = async (data) => {
        console.log(data);
        const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/register`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            mobile: data.mobile,
            }),
        }
        );
        const data1 = await response.json();
        console.log(data1);
        if (data1.success === true) {
            localStorage.setItem("userData", JSON.stringify(data));
            localStorage.setItem("token", data1.data.token);
            history.push("/verify");
        }

    };
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Enter Email" {...register("email", {required: true})} className="w-96 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary" />
            <input type="text" placeholder="Enter first name" {...register("firstName", {required: true})} className="w-96 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary" />
            <input type="text" placeholder="Enter last name" {...register("lastName", {required: true})} className="w-96 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary" />
            <input type="test" placeholder="Enter Mobile" {...register("mobile", {required: true})} className="w-96 h-12 px-3 rounded-lg border-2 border-gray-200 outline-none focus:border-primary" />
            <button type="submit" className="w-40 h-12 mt-4 mb-4 rounded-lg bg-primary text-white font-bold">Submit</button>
        </form>
    </div>
  )
}

export default Signup