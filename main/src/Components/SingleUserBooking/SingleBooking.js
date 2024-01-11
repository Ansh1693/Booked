import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Map from "./Map";
import Policies from "./Policies";

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

const SingleBookingCompo = () => {
  const history = useHistory();
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [booking, setBooking] = React.useState();
  React.useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/bookings/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": accessToken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message.booking);
        setBooking(data.message.booking);
      });
  }, []);

  return (
    <div className="bg-[#d7f3ff] w-full min-h-[calc(100vh-64px)] font-inter flex justify-center relative pb-12">
      <div className=" absolute w-full ">
        <svg
          viewBox="0 0 1440 208"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M1475 0C1475 128.13 1136.3 207.5 718.5 207.5C300.697 207.5 -38 128.13 -38 0C81 0 300.697 0 718.5 0C1136.3 0 1228.5 0 1475 0Z"
            fill="#A0A0A0"
          />
        </svg>
      </div>
      {/* {booking && (
        <div>
          <p> Room Number : {booking?.roomNumber}</p>
          <p> Room Id : {booking?.roomId}</p>
          <p> Hotel Name : {booking?.hotelId?.hotelName}</p>
          <p>Check In : {new Date(booking?.checkIn).toDateString()}</p>
          <p>Check Out : {new Date(booking?.checkOut).toDateString()}</p>
          <p>Amount: {booking?.totalRoomAmount?.amount}</p>
          <p>Payment Status: {booking?.status}</p>
        </div>
      )} */}
      <div className="max-xl:max-w-[1140px] w-[90%] xl:w-[1140px] flex flex-col gap-6 z-10">
        <div className="w-full p-8  pl-[13.8%] flex  gap-[18.52%]  text-white">
          <div className="text-[20px] font-semibold z-10 ">
            <p>
              Booking {booking?.status === "FAILED" ? "failed" : "completed"}
            </p>
            <span className="text-xs">
              {booking?.status === "FAILED"
                ? "You have failed to complete the booking"
                : "You have completed your trip, we hope you had a pleasant stay"}
            </span>
          </div>
          <div className="text-xs font-semibold">
            Booking ID - {booking?._id}
          </div>
        </div>
        <div className="w-full flex gap-14">
          <div className="w-[68.75%] flex flex-col gap-8">
            <div className="w-full relative rounded-[5px] overflow-hidden bg-white">
              <div className="w-full flex px-8 py-4 items-center justify-between h-32  border-b-[2px] border-[#E1E1E1] border-dashed">
                <div className="flex flex-col">
                  <div className="text-[19px] font-semibold">
                    {booking?.hotelId?.hotelName}
                  </div>
                  <div className="text-xs font-medium text-[#878787] flex  gap-1 max-w-[392px]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.77227 8.42712C3.05316 8.71422 3.35019 8.98832 3.6622 9.24837H1.625C1.50253 9.24837 1.38307 9.29158 1.29334 9.37147C1.20323 9.4517 1.15 9.56318 1.15 9.68224C1.15 9.80131 1.20323 9.91278 1.29334 9.99301C1.38307 10.0729 1.50253 10.1161 1.625 10.1161H8.375C8.49747 10.1161 8.61693 10.0729 8.70666 9.99301C8.79677 9.91278 8.85 9.80131 8.85 9.68224C8.85 9.56318 8.79677 9.4517 8.70666 9.37147C8.61693 9.29158 8.49747 9.24837 8.375 9.24837H6.3378C6.64981 8.98832 6.94684 8.71422 7.22773 8.42712L7.22779 8.42706C8.52522 7.09856 9.225 5.68596 9.225 4.34031C9.225 3.33576 8.77669 2.37507 7.98331 1.66871C7.19032 0.96269 6.11703 0.567725 5 0.567725C3.88297 0.567725 2.80968 0.96269 2.01669 1.66871C1.22331 2.37507 0.775 3.33576 0.775 4.34031C0.775 5.68591 1.47286 7.09852 2.77226 8.42711L2.77227 8.42712ZM1.725 4.34031C1.725 3.57389 2.06686 2.83615 2.68001 2.29025C3.29354 1.74401 4.12791 1.43547 5 1.43547C5.87209 1.43547 6.70646 1.74401 7.31999 2.29025C7.93314 2.83615 8.275 3.57389 8.275 4.34031C8.275 5.499 7.64327 6.57163 6.90239 7.42945C6.19803 8.24498 5.40557 8.85413 5 9.14251C4.59443 8.85413 3.80197 8.24498 3.09761 7.42945C2.35673 6.57163 1.725 5.499 1.725 4.34031ZM6.975 4.34031C6.975 3.98759 6.85746 3.64394 6.63899 3.35284C6.42065 3.06191 6.1116 2.83676 5.75213 2.7042C5.39269 2.57164 4.99772 2.53709 4.61677 2.60456C4.23581 2.67203 3.88447 2.83877 3.60768 3.08521C3.33077 3.33174 3.14062 3.64733 3.06343 3.99283C2.98621 4.33848 3.02599 4.69661 3.17706 5.02132C3.32803 5.34582 3.58277 5.62127 3.90718 5.81427C4.23152 6.00722 4.6118 6.10966 5 6.10966C5.52029 6.10966 6.02128 5.92575 6.39232 5.59541C6.76374 5.26472 6.975 4.81356 6.975 4.34031ZM3.975 4.34031C3.975 4.16475 4.0334 3.992 4.14458 3.84386C4.25589 3.69555 4.41537 3.57835 4.60408 3.50876C4.79282 3.43916 5.00105 3.42081 5.20204 3.45641C5.40302 3.492 5.58623 3.57964 5.729 3.70675C5.87165 3.83375 5.96722 3.99409 6.00579 4.1667C6.04432 4.33917 6.02469 4.51808 5.9487 4.68142C5.8726 4.84498 5.74282 4.98668 5.57389 5.08717C5.40489 5.18771 5.20514 5.24192 5 5.24192C4.72464 5.24192 4.46257 5.14443 4.271 4.97387C4.07981 4.80364 3.975 4.57543 3.975 4.34031Z"
                        fill="#8A8A8A"
                        stroke="#8A8A8A"
                        stroke-width="0.2"
                      />
                    </svg>
                    {booking?.hotelId?.address}
                  </div>
                  <div className="text-xs font-medium text-[#878787] mt-1">
                    Contact : 02228592142:(reception), 9004680820
                  </div>
                </div>
                {booking?.hotelId?.location ? (
                  <Map
                    lang={booking?.hotelId?.location?.lang}
                    lat={booking?.hotelId?.location?.lat}
                  />
                ) : (
                  <Map />
                )}
              </div>
              <div className="absolute top-32 left-0 h-6 w-6 rounded-full bg-[#d7f3ff] -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-32 right-0 h-6 w-6 rounded-full bg-[#d7f3ff] translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-full flex px-8 py-8 items-center justify-between ">
                <div className="flex gap-x-20 gap-y-4 flex-wrap  max-w-[392px]">
                  <div className="flex flex-col ">
                    <div className="text-[#878787] font-semibold text-xs">
                      CHECK IN
                    </div>
                    <div className="text-[19px] font-semibold">
                      {dateParser(booking?.checkIn)}
                    </div>
                    <div className="text-[#878787] font-medium text-xs">
                      Check in from 12:00pm
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-[#878787] font-semibold text-xs">
                      CHECK OUT
                    </div>
                    <div className="text-[19px] font-semibold">
                      {dateParser(booking?.checkOut)}
                    </div>
                    <div className="text-[#878787] font-medium text-xs">
                      Check Out from 12:00pm
                    </div>
                  </div>
                  <div className="text-[17px] font-semibold">
                    1 room, {getNights(booking?.checkIn, booking?.checkOut)}{" "}
                    nights{" "}
                  </div>
                </div>
                <img
                  src={
                    booking?.hotelId?.images[0]
                      ? booking?.hotelId?.images[0]
                      : "https://img.cdn.zostel.com/zostel/gallery/images/bqpi1JSFRm-HurkJPhgsVw/bangalore-20201112104621.jpg?w=1280"
                  }
                  alt="hotel image"
                  className="w-[218px] h-[112px] rounded-[5px]"
                />
              </div>
            </div>
            <Policies
              propertyPolicies={booking?.hotelId?.policies?.property.split(",")}
              cancellationPolicy={booking?.hotelId?.policies?.cancellation.split(
                ","
              )}
            />
          </div>
          <div className="w-[31.25%] flex flex-col gap-8">
            <div className="flex flex-col gap-4 py-4  bg-white rounded-[5px]">
              <div className="text-lg px-6 font-semibold">Pricing Breakup</div>
              <div className="text-xs px-6 font-medium mt-2 text-[#9A9A9A] flex justify-between items-center">
                <span>Hotel Reservation Charges</span>
                <span>
                  ₹ {(booking?.totalRoomAmount?.amount * 0.82).toFixed(2)}
                </span>
              </div>
              <div className="text-xs px-6 font-medium pb-4 border-b-[2px] border-[#E1E1E1] border-dashed text-[#9A9A9A] flex justify-between items-center">
                <span>Taxes</span>
                <span>
                  ₹ {(booking?.totalRoomAmount?.amount * 0.18).toFixed(2)}
                </span>
              </div>
              <div className="text-xs px-6 font-medium  text-[#9A9A9A]  flex justify-between items-center">
                <span>Total Price</span>
                <span>₹ {booking?.totalRoomAmount?.amount}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 px-6 bg-white rounded-[5px]">
              <div className="text-lg  font-semibold">Paid</div>
              <div className="text-xs font-semibold text-[#9A9A9A]">
                Card/UPI
              </div>
            </div>
            <div className="flex items-center  gap-2 p-4 px-6 bg-white rounded-[5px] cursor-pointer">
              <div className="text-sm text-[#16B9FF] font-semibold">
                Download Invoice
              </div>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2109 6.61716L11.2109 6.61714C11.2858 6.54224 11.3747 6.48282 11.4726 6.44229C11.5704 6.40175 11.6753 6.38089 11.7812 6.38089C11.8872 6.38089 11.9921 6.40175 12.0899 6.44229C12.1878 6.48282 12.2767 6.54224 12.3516 6.61714C12.4265 6.69204 12.4859 6.78096 12.5265 6.87882C12.567 6.97668 12.5879 7.08157 12.5879 7.1875C12.5879 7.29343 12.567 7.39832 12.5265 7.49618C12.4859 7.59404 12.4265 7.68296 12.3516 7.75786L9.07042 11.0391L9.07036 11.0391L8.9643 10.933C8.90335 10.9941 8.83097 11.0425 8.7513 11.0755C8.67164 11.1085 8.58624 11.1255 8.5 11.1255C8.41376 11.1255 8.32836 11.1085 8.2487 11.0755C8.16903 11.0425 8.09665 10.9941 8.0357 10.933L11.2109 6.61716ZM11.2109 6.61716L9.30625 8.5225V1.28125C9.30625 1.06742 9.22131 0.862347 9.07011 0.711145C8.9189 0.559944 8.71383 0.475 8.5 0.475C8.28617 0.475 8.0811 0.559944 7.9299 0.711145C7.77869 0.862346 7.69375 1.06742 7.69375 1.28125V8.5225L5.78913 6.61716L5.78911 6.61714C5.63784 6.46587 5.43268 6.38089 5.21875 6.38089C5.00482 6.38089 4.79966 6.46587 4.64839 6.61714C4.49712 6.76841 4.41214 6.97357 4.41214 7.1875C4.41214 7.40143 4.49712 7.60659 4.64839 7.75786L7.92958 11.0391L11.2109 6.61716ZM16.525 15.0625V10.4688C16.525 10.2549 16.4401 10.0498 16.2889 9.89864C16.1377 9.74744 15.9326 9.6625 15.7188 9.6625C15.5049 9.6625 15.2998 9.74744 15.1486 9.89864C14.9974 10.0498 14.9125 10.2549 14.9125 10.4688V14.9125H2.0875V10.4688C2.0875 10.2549 2.00256 10.0498 1.85135 9.89864C1.70015 9.74744 1.49508 9.6625 1.28125 9.6625C1.06742 9.6625 0.862347 9.74744 0.711145 9.89864C0.559944 10.0498 0.475 10.2549 0.475 10.4688V15.0625C0.475 15.4504 0.629084 15.8224 0.903356 16.0966C1.17763 16.3709 1.54962 16.525 1.9375 16.525H15.0625C15.4504 16.525 15.8224 16.3709 16.0966 16.0966C16.3709 15.8224 16.525 15.4504 16.525 15.0625Z"
                  fill="#16B9FF"
                  stroke="#16B9FF"
                  stroke-width="0.3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookingCompo;
