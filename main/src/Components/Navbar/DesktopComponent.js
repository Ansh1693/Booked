import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import Logo from "../../images/logo.png";

const DesktopComponent = ({ userData }) => {
  const history = useHistory();
  const [show, setShow] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/city`
      );
      const data2 = await response.json();
      setData(data2.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-screen h-16 flex px-8 py-4 items-center lg:justify-between">
      <div className="w-full p-2 flex justify-between items-center">
        <div
          className="text-primary text-4xl font-bold logo-shadow cursor-pointer"
          onClick={() => history.push("/")}
        >
          {/* <img
              // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/Booked-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
              src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/Booked-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
              alt="Booked"
              className="h-12 w-14 lg:h-14 lg:w-16 object-contain"
            /> */}
          {/* My<span>Stay</span>{" "} */}
          <img src={Logo} alt="" className="h-full w-40 object-contain" />
        </div>
      </div>
      <div
        className={`transition-all  duration-300   flex justify-evenly items-center gap-4 lg:gap-10  flex-shrink-0 text-base lg:text-md   text-black font-semibold `}
      >
        <div
          className="hover:text-primary cursor-pointer relative dropdown dropdown-hover"
          onClick={() => setShow(show === "none" ? "grid" : "none")}
        >
          {/* <a href="#location"> */}
          <label tabIndex={0} className="cursor-pointer m-1 hover:text-primary">
            {" "}
            {/* <i className="fas fa-home"></i> */}
            Search Destination <i className="fas fa-angle-down"></i>
          </label>
          {data.length !== 0 && (
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {data.slice(0, 15).map((ele, index) => {
                return (
                  <li
                    className="cursor-pointer"
                    onClick={() => {
                      let yesterday = new Date(Date.now());
                      let today = new Date(
                        yesterday.getTime() + 24 * 60 * 60 * 1000
                      );
                      var tomorrow = new Date(
                        today.getTime() + 48 * 60 * 60 * 1000
                      );
                      const checkInDate = new Date(
                        new Date(today).getTime() + 5.5 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .substring(0, 10);
                      const checkOutDate = new Date(
                        new Date(tomorrow).getTime()
                      )
                        .toISOString()
                        .substring(0, 10);
                      localStorage.setItem(
                        "destination",
                        ele.name.toLowerCase()
                      );
                      localStorage.setItem(
                        "checkIn",
                        JSON.stringify(checkInDate)
                      );
                      localStorage.setItem(
                        "checkOut",
                        JSON.stringify(checkOutDate)
                      );
                      localStorage.setItem("roomConfig", JSON.stringify([1]));
                      history.push(
                        `/hotels?city=${ele.name.toLowerCase()}&checkIn=${checkInDate}&checkOut=${checkOutDate}&roomConfig=${JSON.stringify(
                          [1]
                        )}
                          `
                      );
                    }}
                    key={nanoid()}
                  >
                    {/* <p className="dataItem"> */}
                    {/* <img src={ele.img} alt="" className="img-search" /> */}
                    <p className=" hover:text-black text-md text-[#c7c7c7]">
                      {ele.name}{" "}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {/* <div className="hover:text-primary cursor-pointer">
            <a onClick={() => history.push(`/longstays`)}>
              {" "}
              {/* <i className="fas fa-people-carry"></i>
              Longstays <i className="fas fa-angle-down"></i>
            </a>
          </div> */}
        {/* <div className="hover:text-primary cursor-pointer">
            <a
              href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              
              Coworking
            </a>
          </div> */}
        {/* <div
          className="hover:text-primary cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/aboutus`)}
        >
          {" "}
          <a>About Us</a>
        </div> */}
        {!userData && (
          <div
            className="hover:text-primary cursor-pointer"
            onClick={() => history.push("/login")}
          >
            Login
          </div>
        )}
        {userData && (
          <>
            <div
              className="hover:text-primary cursor-pointer"
              onClick={() => history.push("/bookings")}
            >
              Manage Bookings
            </div>
            <div
              className="hover:stroke-primary stroke-black cursor-pointer"
              onClick={() => history.push("/profile")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 stroke-inherit"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopComponent;
