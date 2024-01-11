import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { SelectedRoomsContext } from "../../context/hotelsContext.js";
import RoomCard from "../RoomCard/RoomCard";
import Slider from "../ReactSlider/Slider";
import Modal from "../Modal/Modal";
import { configData } from "../../Config/config.js";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";
import Map from "./Map.js";
import Policies from "./Policies.js";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import AmenitiesIcons from "../../Common/Icons/AmenitiesIcons.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleHotel = () => {
  const history = useHistory();
  let { id } = useParams();
  const [rooms, setRooms] = useState([]);

  const [dates, setDates] = useState();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [singleHotel, setSingleHotel] = useState({ success: false });
  const [sliderShow, setSliderShow] = useState("none");

  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);

  let imgClasses = [
    "col-span-3 row-span-3 bg-cover rounded-xl h-full",
    "col-start-4 bg-cover rounded-xl hidden md:block",
    "col-start-4 bg-cover rounded-xl hidden md:block",
    "col-start-4 bg-cover rounded-xl hidden md:block",
  ];

  const search = useLocation().search;
  const checkIn = new URLSearchParams(search).get("checkIn");
  const checkOut = new URLSearchParams(search).get("checkOut");
  const roomConfig = new URLSearchParams(search).get("roomConfig");
  //Calculating differecebetween Days/nights
  const date1 = new Date(localStorage.getItem("checkIn"));
  const date2 = new Date(localStorage.getItem("checkOut"));
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");

  async function getSingleHotel(id, rooms) {
    const response = await fetch(
      // `${process.env.REACT_APP_SERVER_URL}/anonymous/api/v1/hotels?checkIn=2022-04-16T00:00:00.000z&checkOut=2022-04-17T00:00:00.000z&hotelId=${id}`,
      // `http://15.206.116.126:5001/api/v1/anonymous/hotels?checkIn=${JSON.stringify(new Date(checkIn))}&checkOut=${JSON.stringify(new Date(checkOut))}&hotelId=${id}`,
      `${
        process.env.REACT_APP_SERVER_URL
      }/api/v1/anonymous/hotels?checkIn=${new Date(
        checkIn
      ).toISOString()}&checkOut=${new Date(
        checkOut
      ).toISOString()}&hotelId=${id}&rooms=${rooms}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data);
    setSingleHotel(data);
  }

  useEffect(() => {
    let room;
    if (roomConfig && roomConfig !== "null") {
      console.log(roomConfig, "ansh");
      room = JSON.parse(roomConfig);
      if (room.length === 0) {
        room.push(1);
      }
    } else {
      room = [1];
    }
    setRooms(room);
    getSingleHotel(id, room);
    console.log("date", new Date(checkIn).getDate());
    // console.log("month", new Date(checkIn).getMonth());
    console.log("month", monthNames[new Date(checkIn).getMonth()]);
    // empty the selected rooms array on this page
    setSelectedRooms([]);
    window.scrollTo(0, 0);
    setDates([new Date(checkIn), new Date(checkOut)]);
  }, []);

  useEffect(() => {
    if (dates) {
      // window.scrollTo(0, 0);
      if (dates[0] !== new Date(checkIn) || dates[1] !== new Date(checkOut)) {
        const checkInDate = new Date(
          new Date(dates[0]).getTime() + 5.5 * 60 * 60 * 1000
        )
          .toISOString()
          .substring(0, 10);
        const checkOutDate = new Date(
          new Date(dates[1]).getTime() + 5.5 * 60 * 60 * 1000
        )
          .toISOString()
          .substring(0, 10);

        localStorage.setItem("checkIn", JSON.stringify(checkInDate));
        localStorage.setItem("checkOut", JSON.stringify(checkOutDate));

        history.push(
          `/hotel/${id}?checkIn=${JSON.stringify(
            checkInDate
          )}&checkOut=${JSON.stringify(checkOutDate)}&roomConfig=${
            !roomConfig || roomConfig === "null"
              ? JSON.stringify([1])
              : roomConfig
          }`
        );
      }
    }
  }, [dates]);
  useEffect(() => {
    const selectElement = document.querySelectorAll(
      ".react-daterange-picker__inputGroup__month"
    );
    for (let i = 0; i < selectElement.length; i++) {
      selectElement[i].disabled = true;
    }
  }, []);

  if (singleHotel.success === false) {
    return (
      <>
        <div className="w-[96%] md:w-[96%] h-96 md:h-[600px] xl:w-[1280px] md:gap-2 mx-auto py-5 ">
          <Skeleton className="h-full w-full " />

          {/* <div className="a1">
        <img src={singleHotel.data.images[0]} alt="" />
      </div>
      <div className="b1"></div>
      <div className="c1"></div>
      <div className="d1"></div> */}
        </div>

        <div className="w-[96%] xl:w-[1280px] mx-auto flex flex-col lg:flex-row gap-6 py-6 px-4">
          <div className="flex flex-col gap-6 lg:w-7/12">
            <Skeleton count={1} />

            <p className="font-semibold text-base text-[#6d6d6d]">
              <Skeleton count={3} />
            </p>
          </div>
          <div className=" flex flex-col gap-2 lg:w-5/12">
            <Skeleton count={1} />

            <div className=" gap-3 text-sm font-medium">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>

        <div className="w-full bg-secondary">
          <div className=" py-12 px-5 flex flex-col lg:flex-row gap-12 mx-auto rounded-xl  max-w-[1280px]">
            {/* date grid */}

            <div className="flex flex-col ">
              <div className="flex md:flex-row flex-col gap-4 md:items-center md:justify-between py-4">
                <div className="flex flex-col gap-4">
                  <Skeleton count={1} />
                  <Skeleton count={1} />
                </div>
                <div className="grid place-items-center md:-mt-8">
                  <div className="flex gap-4 items-center justify-center  h-20 w-[400px] lg:w-[800px]">
                    {/* <input type="date" value={checkIn} /> */}
                    <Skeleton
                      // count={1}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </div>

              {/* end of date grid */}

              {/* hotel rooms mapping */}
              <div className=" w-[400px] lg:w-[800px] h-full rounded-xl gap-6 flex-col flex">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            </div>

            <div className="md:flex max-lg:w-full max-lg:items-center justify-center">
              <Skeleton className="h-screen w-screen" />
            </div>
          </div>
        </div>
        {/* <Map location={"https://goo.gl/maps/oL9zpixkZFiGPfUB8"} /> */}
      </>
    );
  } else {
    return (
      <>
        <Slider
          sliderShow={sliderShow}
          setSliderShow={setSliderShow}
          sliderImages={singleHotel.data.hotels[0].images}
        />
        <div className="w-[96%] md:w-[96%] h-96 md:h-[600px] xl:w-[1280px] md:gap-2 mx-auto py-5 pb-2 grid grid-rows-[33%_33%_33%] grid-cols-3 md:grid-cols-4">
          {singleHotel.data.hotels[0].images.map((ele, index) => {
            return (
              <div
                className={imgClasses[index]}
                style={{ backgroundImage: `url(${ele})`, cursor: "pointer" }}
                onClick={() =>
                  sliderShow === "none"
                    ? setSliderShow("grid")
                    : setSliderShow("none")
                }
              >
                {/* <img src={ele} alt="more" /> */}
              </div>
            );
          })}
        </div>

        <div className="w-[96%] xl:w-[1280px] mx-auto flex flex-col lg:flex-row gap-6 py-6 px-4">
          <div className="flex flex-col gap-2 lg:w-7/12">
            <p className="text-2xl font-bold text-primary">
              {singleHotel.data.hotels[0].hotelName}
            </p>

            <p className="font-semibold text-base text-[#6d6d6d]">
              {singleHotel.data.hotels[0].description}
            </p>
          </div>
          <div className=" flex flex-col gap-2 lg:w-5/12">
            <p className="text-xl font-bold">Amenities</p>

            <div className="grid grid-cols-2 grid-rows-4 gap-3 text-sm font-medium grid-flow-row md:grid-cols-3">
              {singleHotel.data.hotels[0].amenities.map((ele, index) => {
                const str = ele.toLowerCase();
                return (
                  <div className="flex gap-2 items-center">
                    <AmenitiesIcons type={str} />
                    <div className="">{ele}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full bg-secondary">
          <div className=" py-12 px-5 flex flex-col lg:flex-row gap-12 mx-auto rounded-xl  max-w-[1280px]">
            {/* date grid */}

            <div className="flex flex-col ">
              <div className="flex md:flex-row flex-col gap-4 md:items-center md:justify-between py-4">
                <div className="flex flex-col gap-4">
                  <p className="font-bold text-3xl">Book Your Stay</p>
                  <p className="font-semi-bold text-[#808080] text-md">
                    Select from a range of beautiful rooms
                  </p>
                </div>
                <div className="grid place-items-center md:-mt-8">
                  <div className="flex gap-4 items-center justify-center p-2 rounded-xl bg-white shadow-xs w-max">
                    {/* <input type="date" value={checkIn} /> */}
                    <DateRangePicker
                      format="dMMMy"
                      onChange={setDates}
                      value={dates}
                      rangeDivider={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      }
                      className="text-[#808080]"
                      minDate={new Date(Date.now())}
                    />
                  </div>
                </div>
              </div>

              {/* end of date grid */}

              {/* hotel rooms mapping */}
              <div className="w-full rounded-xl gap-6 flex-col flex">
                {singleHotel.data.hotels[0].rooms.map((ele, index) => {
                  return <RoomCard ele={ele} number={rooms.length} />;
                })}
              </div>

              <Policies />
            </div>

            <div className="hidden md:flex max-lg:w-full max-lg:items-center justify-center">
              {selectedRooms.length === 0 ? (
                <div className="h-full lg:w-max w-96 flex flex-col items-center gap-4 justify-start">
                  <p className="text-2xl font-bold text-left w-full">Summary</p>

                  <p className="text-[#808080] text-left w-full font-semibold">
                    Starting from {new Date(checkIn).getDate()}th{" "}
                    {monthNames[new Date(checkIn).getMonth()]} for {diffDays}{" "}
                    days
                    {/* {checkIn} */}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 512 512"
                    className="h-64 w-64"
                  >
                    <title>GreyScale_Zobu</title>
                    <polygon
                      id="L_Hand"
                      data-name="L Hand"
                      points="194.65 405.67 130.35 552.03 110.69 561.47 86.64 555.77 85.91 568.67 110.14 569.85 110.89 585.3 98.04 618.16 105.06 624.33 117.94 596.7 117.58 628.9 128.62 630.92 136.95 597.89 138.82 619.75 146.79 618.93 146.37 600.45 158.2 570.82 148.87 554.12 201.86 421.15 194.65 405.67"
                      className=" fill-[#bfbfbf]"
                    />
                    <polygon
                      id="L_Hand-2"
                      data-name="L Hand"
                      points="315.2 405.67 381.36 552.03 401.01 561.47 425.07 555.77 425.8 568.67 401.57 569.85 400.81 585.3 413.67 618.16 406.65 624.33 393.77 596.7 394.12 628.9 383.09 630.92 374.76 597.89 372.89 619.75 364.92 618.93 365.34 600.45 353.51 570.82 362.83 554.12 309.85 421.15 315.2 405.67"
                      className="fill-[#bfbfbf]"
                    />
                    <polygon
                      id="Chest"
                      points="318.25 557.4 191.6 557.4 199.21 423.82 194.65 405.67 241.14 393.54 254.55 421.36 271.87 393.43 315.2 405.67 310.65 423.82 318.25 557.4"
                      className="fill-[#f26522]"
                    />
                    <path
                      id="Inner_top"
                      data-name="Inner top"
                      d="M318.25,557.4H191.6l7-123.44,12.55-32.61,19.6-5.11,16.9,29.18a9.25,9.25,0,0,0,15.3,1.06l22.76-29.14,19,5.37,6.92,38.49Z"
                      className="fill-[#d8d8d8]"
                    />
                    <polygon
                      id="Top"
                      points="327.47 398.84 298.66 395.58 271.86 393.43 254.57 421.93 241.13 393.53 215.32 395.58 185.74 401.5 152.23 462.84 183.16 490.49 197.94 446.07 194.88 476.78 182.42 562.28 190.84 563.52 272.02 570.52 319.64 560.42 326.09 559.05 315.33 473.55 312.03 443.43 326.06 487.84 358.69 460.32 327.47 398.84"
                      className="fill-[#a09f9f]"
                    />
                    <g id="Head">
                      <polygon
                        points="185.72 206.27 312.62 206.27 308.32 259.51 326.06 250.37 326.06 309.52 304.56 301.45 299.71 352.54 273.36 352.54 271.86 393.43 254.55 421.36 241.13 393.53 237.34 352.54 202.38 352.54 197.55 299.83 178.19 309.52 172.28 256.82 193.25 263.81 185.72 206.27"
                        className="fill-[#bfbfbf]"
                      />
                      <circle
                        cx="222.28"
                        cy="279.94"
                        r="18.82"
                        className="fill-[#fff]"
                      />
                      <path
                        d="M297.57,279.94a18.82,18.82,0,1,1-18.83-18.82A18.83,18.83,0,0,1,297.57,279.94Z"
                        className="fill-white"
                      />
                      <path
                        d="M227.93,285.32a5.65,5.65,0,1,1-5.65-5.38A5.52,5.52,0,0,1,227.93,285.32Z"
                        className="fill-[#231f20]"
                      />
                      <path
                        d="M284.39,285.32a5.65,5.65,0,1,1-5.65-5.38A5.52,5.52,0,0,1,284.39,285.32Z"
                        className="fill-[#231f20]"
                      />
                      <path
                        d="M215.72,307.26H284.3s.7,19.4-9,22.86S233,332.89,223,327.35,215.72,307.26,215.72,307.26Z"
                        style={{ fill: "#fff" }}
                        className="fill-white"
                      />
                      <line
                        x1="274.64"
                        y1="243.21"
                        x2="294.14"
                        y2="247.4"
                        strokeMiterlimit={10}
                        className="fill-none stroke-[#4a4846] stroke-miterlimit-10 stroke-[3px]"
                      />
                    </g>
                    <g id="Facial_Hair" data-name="Facial Hair">
                      <path
                        d="M215.6,307s-2.76,14.52,7.27,20.06,42.54,6.22,52.23,2.76,9-22.82,9-22.82Z"
                        className="fill-white"
                      />
                      <path
                        d="M312.74,206.24H188l5.73,58.29-1.27.17-13-62.22c-15.89,0-28.79-15-28.79-31v-.08a6.47,6.47,0,0,1,8.41-6c6.42,2,14.67,4.64,22.56,5.62a114.87,114.87,0,0,0,44.59-3.23,233.75,233.75,0,0,1,51.79-8.3l2.66-.08A40.39,40.39,0,0,1,321,199.8c0,.91-.07,1.79-.13,2.68h0l0,.11a40.16,40.16,0,0,1-2.62,11.82l-8,44.6-1.92,1.1Z"
                        className="fill-[#4a4846]"
                      />
                      <path
                        d="M275.19,330.55C265.5,334,233,333.32,223,327.78s-7.27-20.06-7.27-20.06h68.5S284.88,327.09,275.19,330.55Z"
                        className="fill-[#f26522]"
                      />
                      <path
                        d="M215.68,307.72s-2.77,14.53,7.27,20.06,42.55,6.23,52.24,2.77,9-22.83,9-22.83Z"
                        className="fill-white"
                      />
                      <path
                        d="M251,305.65s-39.4,28.21-53.75-5.55l5.12,52.25S219,393.8,250.67,394.53v0h.6v0c31.64-.73,48.33-42.18,48.33-42.18l4.5-50.64C289.74,335.47,251,305.65,251,305.65Z"
                        className="fill-[#4a4846]"
                      />
                      <path
                        d="M215.68,307.72s-2.77,14.53,7.27,20.06,42.55,6.23,52.24,2.77,9-22.83,9-22.83Z"
                        className="fill-white"
                      />
                      <path
                        d="M286.45,306.77c-7,0-13.49-3.73-21.37-6.31a41,41,0,0,0-27.59,0c-7.88,2.58-14.39,6.31-21.37,6.31-9.49,0-19.82-4.72-22-5.74l.1.84c15.12,33.76,57,4,57,4s41.89,29.77,57-4l.09-.84C306.27,302.05,295.94,306.77,286.45,306.77Z"
                        className="fill-[#3b3936]"
                      />
                    </g>
                  </svg>
                  <div className="font-semibold text-gray-400">
                    No rooms Selected
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex flex-col gap-4 lg:w-max w-96 ">
                  <p className="text-3xl font-bold ">Summary</p>

                  <p className="text-[#808080] font-semibold">
                    Starting from {new Date(checkIn).getDate()}th{" "}
                    {monthNames[new Date(checkIn).getMonth()]} for {diffDays}{" "}
                    days
                    {/* {checkIn} */}
                  </p>

                  <div className="text-[18px] flex-col flex gap-4 w-full">
                    {selectedRooms.length === 0 ? (
                      <p>No Rooms Selected</p>
                    ) : (
                      selectedRooms.map((ele, index) => {
                        return (
                          <div
                            className="flex justify-between items-center text-base"
                            key={index}
                          >
                            <p className="font-bold">
                              {" "}
                              {ele.roomName}{" "}
                              <span className="text-[#808080] text-md font-semibold">
                                {" "}
                                X {rooms.length}
                              </span>
                            </p>
                            <p className="font-bold">
                              {" "}
                              <i className="fas fa-rupee-sign"></i>{" "}
                              {ele.roomPrice * ele.qty * diffDays}
                            </p>
                          </div>
                        );
                      })
                    )}

                    <div className="bg-primary h-1 w-full">&nbsp;</div>
                    <div className="flex justify-between items-center font-bold text-base">
                      <p className="font-bold">Tax</p>{" "}
                      <p className="dynamic">
                        {" "}
                        <i className="fas fa-rupee-sign"></i>{" "}
                        {(selectedRooms.reduce(
                          (prev, curr) => prev + curr.qty * curr.roomPrice,
                          0
                        ) *
                          diffDays *
                          18) /
                          (100).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center font-bold text-base">
                      <p className="font-bold ">Total payable</p>{" "}
                      <p className="dynamic">
                        <i className="fas fa-rupee-sign"></i>{" "}
                        {+selectedRooms.reduce(
                          (prev, curr) => prev + curr.qty * curr.roomPrice,
                          0
                        ) *
                          diffDays.toFixed(2) +
                          +(
                            (selectedRooms.reduce(
                              (prev, curr) => prev + curr.qty * curr.roomPrice,
                              0
                            ) *
                              diffDays *
                              18) /
                            (100).toFixed(2)
                          )}{" "}
                      </p>
                    </div>

                    <div className="flex items-center justify-center">
                      <PrimaryButton
                        text="Book Now"
                        onClick={() => history.push("/booking")}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {selectedRooms.length > 0 && (
              <div className="md:hidden fixed bottom-0 border-t-[1px] border-[#808080/10] bg-white shadow-xl left-0 p-4 flex justify-between items-center w-full">
                <div className="flex flex-col gap-2">
                  <p className="text-md font-bold text-[#808080]">
                    Payable Now
                  </p>
                  <p className="text-md font-semibold">
                    <i className="fas fa-rupee-sign"></i>{" "}
                    {+selectedRooms.reduce(
                      (prev, curr) => prev + curr.qty * curr.roomPrice,
                      0
                    ) *
                      diffDays.toFixed(2) +
                      +(
                        (selectedRooms.reduce(
                          (prev, curr) => prev + curr.qty * curr.roomPrice,
                          0
                        ) *
                          diffDays *
                          18) /
                        (100).toFixed(2)
                      )}
                  </p>
                </div>
                <PrimaryButton
                  text="Book Now"
                  onClick={() => history.push("/booking")}
                />
              </div>
            )}
          </div>
        </div>
        {singleHotel?.data?.hotels[0]?.location ? (
          <Map
            lat={parseFloat(singleHotel.data.hotels[0].location.lat)}
            lang={parseFloat(singleHotel.data.hotels[0].location.lang)}
            address={singleHotel.data.hotels[0].address}
          />
        ) : (
          <Map />
        )}
      </>
    );
  }
};

export default SingleHotel;
