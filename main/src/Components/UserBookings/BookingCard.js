import React from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const BookingCard = ({ booking, index, hotel, history }) => {
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  const dateParser = (date) => {
    const d = new Date(date);
    const day = days[d.getUTCDay()];
    const currDate = d.getUTCDate();
    const month = months[d.getUTCMonth()];

    const formattedDate = `${day ? day : "Fri"} ${
      currDate ? currDate : 5
    }${getDaySuffix(currDate ? currDate : 5)} ${month ? month : "Jun"}`;

    return formattedDate;
  };

  const getNights = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays ? diffDays : 1;
  };
  return (
    <div
      key={index}
      className="w-[780px] flex  items-center justify-center flex-col bg-white relative font-inter rounded-[1px]"
    >
      <div className="w-full flex px-8 py-4 items-center justify-between h-20 bg-white border-b-[2px] border-[#E1E1E1] border-dashed">
        <div className="flex flex-col ">
          <div className="text-[19px] font-semibold">{hotel.hotelName}</div>
          <div className="text-xs text-[#878787] font-medium">
            Property in{" "}
            {hotel.city.charAt(0).toUpperCase() + hotel.city.slice(1)}-Booking
            ID: {booking._id.toUpperCase()}
          </div>
        </div>
        <div
          className="btn btn-sm bg-[#D7F3FF] text-[#009EE2] text-[14px] capitalize px-4 font-semibold hover:bg-[#d7f3ff]"
          onClick={() => history.push(`/bookings/${booking._id}`)}
        >
          View & Manage Booking
        </div>
      </div>
      <div className="absolute top-20 left-0 h-6 w-6 rounded-full bg-[#EEF4FD] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-20 right-0 h-6 w-6 rounded-full bg-[#EEF4FD] translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-full flex px-8 py-8 items-center justify-between  bg-white">
        <div className="flex flex-col ">
          <div className="text-[#878787] font-semibold text-xs">CHECK IN</div>
          <div className="text-[19px] font-semibold">
            {dateParser(booking.checkIn)}
          </div>
          <div className="text-[#878787] font-medium text-xs">
            Check in from 12:00pm
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="text-[#878787] font-semibold text-xs">CHECK OUT</div>
          <div className="text-[19px] font-semibold">
            {dateParser(booking.checkOut)}
          </div>
          <div className="text-[#878787] font-medium text-xs">
            Check Out from 12:00pm
          </div>
        </div>
        <div className="text-[17px] font-semibold">
          1 room, {getNights(booking.checkIn, booking.checkOut)} nights{" "}
        </div>
        <div>
          <svg
            width="45"
            height="40"
            viewBox="0 0 45 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.0625 36.1875H40.125V15.625C40.125 14.8459 39.8155 14.0988 39.2646 13.5479C38.7137 12.997 37.9666 12.6875 37.1875 12.6875H25.4375V3.87502C25.4378 3.34308 25.2937 2.82103 25.0206 2.36459C24.7474 1.90815 24.3554 1.53446 23.8865 1.28339C23.4175 1.03232 22.8892 0.913309 22.3578 0.93905C21.8265 0.964792 21.3122 1.13432 20.8697 1.42955L6.18219 11.2188C5.77927 11.4876 5.44908 11.8519 5.22101 12.2792C4.99295 12.7065 4.87408 13.1835 4.875 13.6679V36.1875H1.9375C1.54796 36.1875 1.17438 36.3423 0.898937 36.6177C0.623493 36.8932 0.46875 37.2667 0.46875 37.6563C0.46875 38.0458 0.623493 38.4194 0.898937 38.6948C1.17438 38.9703 1.54796 39.125 1.9375 39.125H43.0625C43.452 39.125 43.8256 38.9703 44.1011 38.6948C44.3765 38.4194 44.5312 38.0458 44.5312 37.6563C44.5312 37.2667 44.3765 36.8932 44.1011 36.6177C43.8256 36.3423 43.452 36.1875 43.0625 36.1875ZM37.1875 15.625V36.1875H25.4375V15.625H37.1875ZM7.8125 13.6679L22.5 3.87502V36.1875H7.8125V13.6679ZM19.5625 18.5625V21.5C19.5625 21.8896 19.4078 22.2631 19.1323 22.5386C18.8569 22.814 18.4833 22.9688 18.0938 22.9688C17.7042 22.9688 17.3306 22.814 17.0552 22.5386C16.7797 22.2631 16.625 21.8896 16.625 21.5V18.5625C16.625 18.173 16.7797 17.7994 17.0552 17.524C17.3306 17.2485 17.7042 17.0938 18.0938 17.0938C18.4833 17.0938 18.8569 17.2485 19.1323 17.524C19.4078 17.7994 19.5625 18.173 19.5625 18.5625ZM13.6875 18.5625V21.5C13.6875 21.8896 13.5328 22.2631 13.2573 22.5386C12.9819 22.814 12.6083 22.9688 12.2188 22.9688C11.8292 22.9688 11.4556 22.814 11.1802 22.5386C10.9047 22.2631 10.75 21.8896 10.75 21.5V18.5625C10.75 18.173 10.9047 17.7994 11.1802 17.524C11.4556 17.2485 11.8292 17.0938 12.2188 17.0938C12.6083 17.0938 12.9819 17.2485 13.2573 17.524C13.5328 17.7994 13.6875 18.173 13.6875 18.5625ZM13.6875 28.8438V31.7813C13.6875 32.1708 13.5328 32.5444 13.2573 32.8198C12.9819 33.0953 12.6083 33.25 12.2188 33.25C11.8292 33.25 11.4556 33.0953 11.1802 32.8198C10.9047 32.5444 10.75 32.1708 10.75 31.7813V28.8438C10.75 28.4542 10.9047 28.0807 11.1802 27.8052C11.4556 27.5298 11.8292 27.375 12.2188 27.375C12.6083 27.375 12.9819 27.5298 13.2573 27.8052C13.5328 28.0807 13.6875 28.4542 13.6875 28.8438ZM19.5625 28.8438V31.7813C19.5625 32.1708 19.4078 32.5444 19.1323 32.8198C18.8569 33.0953 18.4833 33.25 18.0938 33.25C17.7042 33.25 17.3306 33.0953 17.0552 32.8198C16.7797 32.5444 16.625 32.1708 16.625 31.7813V28.8438C16.625 28.4542 16.7797 28.0807 17.0552 27.8052C17.3306 27.5298 17.7042 27.375 18.0938 27.375C18.4833 27.375 18.8569 27.5298 19.1323 27.8052C19.4078 28.0807 19.5625 28.4542 19.5625 28.8438Z"
              fill="#8C8C8C"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
