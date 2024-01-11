import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ ele }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer bg-white w-full md:w-[350px]"
      onClick={() => {
        navigate(`/hotels/${ele.hotelId}`);
      }}
    >
      <div className="relative">
        <img
          src={
            ele?.images
              ? ele?.images[0]
              : "https://img.cdn.zostel.com/zostel/gallery/images/bqpi1JSFRm-HurkJPhgsVw/bangalore-20201112104621.jpg?w=1280"
          }
          alt={ele.title}
          className="h-[184px] w-full md:h-[150px] rounded-t-[10px] md:mt-0 md:w-[350px] object-cover border-x-[1px] border-t-[1px] border-[#EDEDED]"
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
          }}
        />
      </div>

      <div
        className="h-[96px] w-full md:h-[110px] border-x-[1px] border-b-[1px] rounded-b-[10px] md:w-[350px] border-[#EDEDED]"
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="font-medium md:font-[500] text-[16px] md:text-[20px] pt-[8px] text-[#1C1C1E] ml-[10px] md:w-[330px] w-[95%]">
          <p className="overflow-hidden overflow-ellipsis  whitespace-nowrap">
            {ele.hotelName}
          </p>
        </div>
        <div className="flex text-[12px] md:text-[14px] text-[#727374] ml-[8px] font-[400] my-[8px] items-center">
          <img
            src="/svgs/calender.svg"
            alt="location"
            className="h-[16px] mr-[5px] md:h-[21px]"
          />
          <span>
            {ele?.address.slice(0, 35)}
            {"..."}
          </span>
        </div>

        <div className="flex text-[12px] md:text-[14px] text-[#727374] mx-[8px] font-[400] my-[8px] items-center w-[95%]">
          <img
            src="/svgs/Location.svg"
            alt="location"
            className="h-[16px] mr-[5px] md:h-[20px]"
          />

          <p className="overflow-hidden overflow-ellipsis  whitespace-nowrap">
            {ele?.city.charAt(0).toUpperCase() + ele?.city.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
