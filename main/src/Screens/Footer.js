import React from "react";

const Footer = () => {
  return (
    <div className="w-screen bg-[#3b4a5b] text-white px-20 font-semibold">
      <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-20 items-center justify-center py-12 px-4 text-[18px] md:text-sm lg:text-base xl:text-[18px]">
        <div className="text-3xl  text-primary  font-bold logo-shadow cursor-pointer  lg:text-4xl md:hidden lg:block">
          Booked
        </div>

        <div className="flex flex-col gap-4 justify-center items-left">
          <div className="text-3xl  text-primary  font-bold logo-shadow cursor-pointer  lg:text-4xl hidden md:block lg:hidden">
            Booked
          </div>
          <div className="text-[14px]">
            Explore with Booked - We provide ultra Luxurious Hotel Rooms for
            long accommodations, at Best Price, We are couple friendly, Great
            interiors and mesmerizing location in Jaipur, Gurugram, Indore and
            Banglore
          </div>
          <div className="text-[14px]">
            We are a chain of 30+ hotels offering hotel rooms, longstays, pg's
            and corporate bookings
          </div>
          <a
            href="mailto:infoBooked@gmail.com"
            className="text-left text-[14px]"
          >
            Mail us - infoBooked@gmail.com
          </a>
        </div>

        <div className="flex flex-col gap-2 text-base text-[14px]">
          <p className="text-[14px]"> Contact Us - </p>

          <p className="text-[14px]">
            Jaipur office - Ground Floor,Akshyam, Ganesh Nagar, Ramnagar,
            Jaipur, Rajasthan 302019
          </p>
          <p className="text-[14px]">
            Gurugram office- Ground Floor,Aashiyana Paradise, sector 49, opp to
            Spaze itech park, Gurugram, Haryana 122018
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center text-base">
          {/* <p className="head-address"> Follow Us on - </p> */}
          <p className="text-[14px]">Customer Support - +91 8237170617</p>
          <a className="text-[14px]" href="mailto:infoBooked@gmail.com">
            Email - infoBooked@gmail.com
          </a>
          <div className="flex gap-4 items-center justify-center">
            <a
              href="https://www.instagram.com/Bookedrooms/"
              className="home_social-icon"
              target="_blank"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="https://www.facebook.com/Bookedhotels/"
              className="home_social-icon"
              target="_blank"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
