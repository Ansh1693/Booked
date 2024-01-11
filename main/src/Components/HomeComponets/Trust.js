import React from "react";
import PrimaryButton from "../../Common/buttons/PrimaryButton";

const Trust = () => {
  return (
    <div className="w-screen mt-10 md:mt-0 flex items-center justify-center">
      <div className="flex gap-8 flex-wrap w-[90%] max-w-7xl justify-center px-8 md:px-4">
        <div className="bg-[#a7ffcc] py-7 px-16 rounded-2xl flex flex-col gap-4 lg:w-3/5 lg:flex-shrink-0">
          <h3 className="text-2xl font-bold">Why trust Booked</h3>

          <div className="text-md">
            <div className="flex gap-4 items-center">
              <lord-icon
                src="https://cdn.lordicon.com/nxaaasqe.json"
                colors="primary:#121331,secondary:#000000"
                trigger="loop"
                stroke="75"
                delay="2000"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
              <span>80,000+ rooms served till today</span>
            </div>
            <div className="flex gap-4 items-center">
              <lord-icon
                src="https://cdn.lordicon.com/wlpxtupd.json"
                colors="primary:#121331,secondary:#000000"
                trigger="loop"
                stroke="75"
                delay="2300"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
              <span>40+ Partnered Hotels</span>
            </div>
            <div className="flex gap-4 items-center">
              <lord-icon
                src="https://cdn.lordicon.com/gqzfzudq.json"
                colors="primary:#121331,secondary:#000000"
                trigger="loop"
                stroke="75"
                delay="2500"
                style={{ width: "50px", height: "50px" }}
              ></lord-icon>
              <span>3+ Cities</span>
            </div>
          </div>
        </div>

        <div className="bg-[#8ffbff] b2 py-8 px-9 overflow-hidden rounded-2xl relative flex flex-shrink-0 min-w-[400px]">
          <div className="w-6/12 flex-shrink-0"></div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-2xl font-bold text-center p-5">
              Sign-Up to our <br></br> newsletter
            </span>

            <div className="flex flex-col gap-2 items-center">
              <input
                type="text"
                name="email"
                id="email"
                className="input w-full max-w-xs"
                placeholder="Enter email"
              />
              <div className="btn hover:text-primary hover:bg-white text-sm cursor-pointer w-max rounded-md text-white font-semibold bg-primary p-2 px-8">
                Sign Up
              </div>
            </div>
          </div>

          <img
            src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/hiking_zro9gna99.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656655885340"
            alt=""
            className="absolute -bottom-0 -left-8 w-3/5 h-56"
          />
        </div>
      </div>
    </div>
  );
};

export default Trust;
