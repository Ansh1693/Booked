import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import cities from "./citiesData.js";
import { HotelContext } from "../../context/hotelsContext.js";
import { useHistory } from "react-router-dom";
import "../SearchBar/DatePicker.css";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import AdultBar from "./AdultBar.js";

const Hero = ({ dates, setDates, destination, setDestination }) => {
  const history = useHistory();
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [roomAdults, setRoomAdults] = useState([1]);
  let yesterday = new Date(Date.now());
  let today = new Date(yesterday.getTime() + 24 * 60 * 60 * 1000);
  var tomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);
  const [wordEntered, setWordEntered] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);
  useEffect(() => {
    const selectElement = document.querySelectorAll(
      ".react-daterange-picker__inputGroup__month"
    );
    // console.log(selectElement);
    for (let i = 0; i < selectElement.length; i++) {
      selectElement[i].disabled = true;
    }
  }, []);

  const hotels = useContext(HotelContext);

  const [tooltip, setTooltip] = useState("none");
  // const [destination, setDestination] = useState("bangalore");
  // const [destination, setDestination] = useState("");
  // const [checkIn, setCheckIn] = useState(JSON.stringify(new Date()));
  // const [checkIn, setCheckIn] = useState(currentDateValue);
  // const [checkOut, setCheckOut] = useState(nextDateValue);

  useEffect(() => {
    if (!dates) {
      setDates([today, tomorrow]);
    }
  }, []);

  return (
    <div className="hero-image w-[96%] max-w-[1150px] md:rounded-3xl  mx-auto h-screen md:h-max md:py-24 lg:py-32 md:bg-cover flex flex-col items-center px-6 justify-center text-white">
      {/* {hotels.state.name} */}

      <h2 className="font-bold text-3xl text-center text-shadow p-4 ">
        Ready to explore with Booked?
      </h2>
      <div className="w-full h-4/6 md:h-max xl:w-max bg-white rounded-xl flex  flex-col md:flex-wrap gap-6 md:gap-12 md:flex-row justify-center  p-8 text-black text-md items-center">
        <div className="flex flex-col items-center justify-between  gap-2 relative">
          <label
            htmlFor="destination"
            className="text-md font-semibold  md:text-lg"
          >
            Destination
          </label>
          <SearchBar
            data={cities}
            placeholder="Search Destination"
            setDestination={setDestination}
            wordEntered={wordEntered}
            setWordEntered={setWordEntered}
            error={error}
          />
          {error && (
            <p className="absolute left-1 text-sm top-[68px] text-red-600">
              *Please select destination{" "}
            </p>
          )}
        </div>

        <div className="flex flex-col gap ">
          <div className="flex  gap-9 justify-evenly font-semibold items-center text-lg  outline-none">
            <div className="font-montserrat ">Check in</div>
            <div className="font-montserrat ">Check Out</div>
          </div>
          <div className="flex items-center justify-center border-b-2 border-gray-400">
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

        <div className="flex flex-col items-center justify-between  gap-2 relative">
          <label
            htmlFor="destination"
            className="text-md font-semibold  md:text-lg"
          >
            Guests & Rooms
          </label>
          <div className="flex items-center justify-center border-b-2 pb-2 border-gray-400">
            <AdultBar
              adults={adults}
              setAdults={setAdults}
              rooms={rooms}
              setRooms={setRooms}
              roomAdults={roomAdults}
              setRoomAdults={setRoomAdults}
            />
          </div>
        </div>

        <div className="book-container">
          <PrimaryButton
            text="Book Now"
            onClick={() => {
              if (!destination || !dates) {
                setError(true);
              } else {
                const checkInDate = new Date(
                  new Date(dates[0]).getTime() + 5.5 * 60 * 60 * 1000
                )
                  .toISOString()
                  .substring(0, 10);
                const checkOutDate = new Date(new Date(dates[1]).getTime())
                  .toISOString()
                  .substring(0, 10);
                localStorage.setItem("destination", destination);
                localStorage.setItem("checkIn", JSON.stringify(checkInDate));
                localStorage.setItem("checkOut", JSON.stringify(checkOutDate));
                localStorage.setItem("roomConfig", JSON.stringify(roomAdults));

                history.push(
                  `/hotels?city=${destination}&checkIn=${JSON.stringify(
                    checkInDate
                  )}&checkOut=${JSON.stringify(
                    checkOutDate
                  )}&roomConfig= ${JSON.stringify(roomAdults)}`
                );
              }
            }}
          />
          {/* <div className="tooltip" style={{ display: tooltip }}>
                {" "}
                Please fill all the details
              </div> */}
        </div>
      </div>
      {/* empty div to adjust center positioning */}
    </div>
  );
};

export default Hero;
