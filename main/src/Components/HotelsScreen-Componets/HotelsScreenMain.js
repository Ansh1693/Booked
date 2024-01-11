import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { HotelContext } from "../../context/hotelsContext.js";
import { configData } from "../../Config/config.js";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";
import SingleHotel from "./SingleHotel.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotelsScreenMain = () => {
  const history = useHistory();
  const { allSearchedHotels, setAllSearchedHotels } = useContext(HotelContext);
  // const [allHotels, setAllHotels] = useState({success: false});

  const search = useLocation().search;
  const city = new URLSearchParams(search).get("city");
  const checkIn = new URLSearchParams(search).get("checkIn");
  const checkOut = new URLSearchParams(search).get("checkOut");
  const roomConfig = new URLSearchParams(search).get("roomConfig");
  const [loading, setLoading] = useState(false);

  async function getAllHotels() {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,
      // `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setAllSearchedHotels(data);
    setLoading(false);
  }

  useEffect(() => {
    getAllHotels();
    window.scrollTo(0, 0);
  }, [city]);

  if (loading || !allSearchedHotels?.data?.city?.name) {
    return (
      <>
        <div className="h-screen w-screen relative">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="w-full min-h-[354px] p-5 bg-secondary">
          <Skeleton count={1} />

          {/* array.map Hotels in City */}
          <div className="flex flex-col w-full p-8 items-center justify-center gap-12 ">
            <SingleHotel key="12" />
            <SingleHotel key="23" />
            <SingleHotel key="34" />
            <SingleHotel key="35" />
          </div>
        </div>
      </>
    );
  } else if (allSearchedHotels?.data?.hotels?.length <= 0) {
    return (
      <div className="coming_soon-box">
        {" "}
        <h1>Coming Soon ...</h1>{" "}
      </div>
    );
  } else {
    return (
      <>
        <div className="h-[calc(100vh-64px)] w-screen relative">
          {allSearchedHotels?.data?.city?.image ? (
            <img
              src={allSearchedHotels.data.city.image}
              alt=""
              className="brightness-75 h-full w-full object-cover"
            />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>

        <h1 className="absolute text-6xl -translate-x-1/2 translate-y-1/2 font-bold top-1/2 left-1/2 text-white">
          {allSearchedHotels.data.city.name.toUpperCase()}
        </h1>

        <div className="w-full min-h-[354px] p-5 bg-secondary">
          {allSearchedHotels?.data?.city?.name ? (
            <h1 className="text-center text-3xl text-primary capitalize font-semibold mt-6">
              Stays At {allSearchedHotels.data.city.name}
            </h1>
          ) : (
            <Skeleton count={1} />
          )}

          {/* array.map Hotels in City */}
          <div className="flex flex-col w-full p-8 items-center justify-center gap-12 ">
            {!allSearchedHotels?.data?.hotels && <SingleHotel />}
            {allSearchedHotels.data.hotels.map((ele, index) => {
              return (
                <SingleHotel
                  ele={ele}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  roomConfig={roomConfig}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default HotelsScreenMain;
