import React, { useState } from "react";
import { nanoid } from "nanoid";
import Logo from "../../images/logo.png";
import { useHistory } from "react-router-dom";

const MobileComponent = ({ userData }) => {
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

  console.log(userData);

  return (
    <div className="w-screen max-h-screen relative">
      <div className="w-full  p-4 flex justify-between items-center">
        <div
          className="text-primary text-2xl font-bold logo-shadow cursor-pointer"
          onClick={() => history.push("/")}
        >
          {/* <img
              // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/Booked-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
              src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/Booked-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
              alt="Booked"
              className="h-10 w-12 object-contain"
            /> */}
          {/* My<span>Stay</span>{" "} */}
          <img src={Logo} alt="" className="h-full w-40 object-contain" />
        </div>
        <div
          className="flex flex-col gap-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
          <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
          <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
        </div>
      </div>
      <div
        className={`transition-all left-0 absolute duration-300 w-full h-screen z-[99999] flex flex-col justify-start items-left text-2xl bg-[#1f202c] p-8 gap-12 text-white font-bold ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="hover:text-primary cursor-pointer relative dropdown "
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
             
              Longstays <i className="fas fa-angle-down"></i>
            </a>
          </div> */}
        {/* <div className="hover:text-primary cursor-pointer">
            <a
              href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              {/* <i className="fas fa-globe-americas"></i>  
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
              className="hover:text-primary cursor-pointer"
              onClick={() => history.push("/profile")}
            >
              Profile
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileComponent;
