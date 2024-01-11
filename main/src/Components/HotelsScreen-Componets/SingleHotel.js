import React from "react";
import { useHistory } from "react-router-dom";
import PrimaryButton from "../../Common/buttons/PrimaryButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleHotel = ({
  ele = {},
  checkIn = "",
  checkOut = "",
  key = "123",
  roomConfig = [1],
}) => {
  const history = useHistory();
  return (
    <div
      className=" flex flex-col md:flex-row gap-6 w-full md:w-4/6 mx-auto"
      key={key}
    >
      <div className="bg-cover rounded-xl h-[270px] lg:h-96  w-full md:w-1/2 lg:w-3/4 md:max-w-[672px]">
        {ele?.images ? (
          <img
            src={ele.images[0]}
            alt=""
            className="rounded-xl h-full w-full object-cover"
          />
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </div>

      <div className="md:w-1/2 my-auto">
        {/* <p className="text-lg mb-4 font-bold text-[#6d6d6d]">
          Booked Townhouse
        </p> */}
        {ele?.hotelName ? (
          <h2 className="mb-4 text-xl font-bold">{ele.hotelName}</h2>
        ) : (
          <Skeleton count={1} />
        )}

        {ele?.description ? (
          <p className="text-base mb-4 font-semibold text-[#6d6d6d]">
            {ele.description.slice(0, 120)}...
          </p>
        ) : (
          <Skeleton count={3} />
        )}
        {ele?.hotelId ? (
          <PrimaryButton
            text="Book Now"
            onClick={() =>
              history.push(
                `/hotel/${ele.hotelId}?checkIn=${checkIn}&checkOut=${checkOut}&roomConfig=${roomConfig}`
              )
            }
          />
        ) : (
          <Skeleton count={1} />
        )}
      </div>
    </div>
  );
};

export default SingleHotel;
