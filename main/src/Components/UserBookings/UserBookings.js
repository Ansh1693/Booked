import React from "react";
import { UserContext } from "../../context/hotelsContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import BookingCard from "./BookingCard";

const UserBookings = () => {
  const history = useHistory();
  const [bookings, setBookings] = useState(null);
  const [hotels, setHotels] = useState(null);

  const dateParser = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  React.useEffect(() => {
    if (!bookings) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        history.push("/login");
      } else {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/customer/bookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setBookings(data.message.user.roomBookings);
            setHotels(data.message.hotels);
          });
      }
    }
    // console.log(bookings, hotels);
  }, []);

  return (
    <div className="flex flex-col items-left gap-8 p-6 pl-12 w-full bg-[#EEF4FD] min-h-[calc(100vh-64px)]">
      <div className="text-2xl  text-black flex gap-4 items-center  font-semibold">
        Your Trips
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.3113 1.68876C23.1226 1.50025 22.8872 1.36544 22.6291 1.29821C22.3711 1.23098 22.0998 1.23376 21.8431 1.30626H21.8291L3.83469 6.76625C3.54178 6.85049 3.28147 7.02196 3.08844 7.25783C2.89541 7.49371 2.77881 7.78278 2.75418 8.08658C2.72954 8.39037 2.79803 8.69445 2.95053 8.95835C3.10303 9.22224 3.3323 9.43342 3.60782 9.56375L11.6347 13.3653L15.4363 21.3922C15.5563 21.6492 15.7473 21.8666 15.9869 22.0186C16.2264 22.1706 16.5044 22.2509 16.7881 22.25C16.8313 22.25 16.8744 22.2481 16.9175 22.2444C17.2202 22.2199 17.5082 22.1034 17.7428 21.9105C17.9774 21.7176 18.1474 21.4576 18.23 21.1653L23.6863 3.17094C23.6863 3.16626 23.6863 3.16157 23.6863 3.15688C23.7597 2.90091 23.7637 2.63 23.6978 2.37199C23.6319 2.11397 23.4985 1.87815 23.3113 1.68876ZM16.7966 20.7359L16.7919 20.7491L13.1019 12.9594L17.5306 8.52969C17.6653 8.3879 17.7393 8.19908 17.7368 8.00351C17.7343 7.80794 17.6555 7.62108 17.5172 7.48278C17.3789 7.34448 17.1921 7.26568 16.9965 7.26317C16.8009 7.26067 16.6121 7.33466 16.4703 7.46938L12.0406 11.8981L4.25001 8.20813H4.26313L22.25 2.75001L16.7966 20.7359Z"
            fill="black"
          />
        </svg>
      </div>
      {bookings &&
        hotels &&
        bookings.length > 0 &&
        bookings.map((booking, index) => {
          const hotel = hotels.find(
            (hotel) => hotel.hotelId === booking.hotelId
          );
          //   console.log(hotel);
          return (
            <BookingCard
              booking={booking}
              index={index}
              hotel={hotel}
              history={history}
            />
          );
        })}
    </div>
  );
};

export default UserBookings;
