import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import citiesD from "../HomeComponets/citiesData.js";
import { nanoid } from "nanoid";
import { UserContext } from "../../context/hotelsContext.js";
import MobileComponent from "./MobileComponent.js";
import DesktopComponent from "./DesktopComponent.js";

const Navbar = () => {
  const { userData, setUserData } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!userData) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const getUser = async () => {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/v1/customer/getUser`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setUserData(data.message.user);
        };
        getUser();
      }
    }
  }, [userData]);
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    // <div id="nav-parent" className="w-screen relative p-0 top-0 h-[70px] flex flex-col justify-self-center items-center bg-white z-10">
    //   <div className="navbar top-0 left-0 w-full  h-[70px] pl-1 pt-4 pr-3 place-items-center bg-white border-b-0 z-50 flex items-center justify-between">
    //     <div className="w-10 h-12" onClick={() => history.push("/")}>
    //       <img
    //         // src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/Booked-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
    //         src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/Booked-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
    //         alt="Booked"
    //         className="logo-img"
    //       />
    //       {/* My<span>Stay</span>{" "} */}
    //     </div>

    //     <div className="flex flex-col gap-1">
    //       <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
    //       <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
    //       <span className="w-6 bg-primary h-[4px]">&nbsp;</span>
    //     </div>
    //   </div>

    //     <ul className="menu_ul">
    //       <li
    //         className="Destination-box"
    //         onClick={() => setShow(show === "none" ? "grid" : "none")}
    //       >
    //         {/* <a href="#location"> */}
    //         <a>
    //           {" "}
    //           {/* <i className="fas fa-home"></i> */}
    //           Search Destination <i className="fas fa-angle-down"></i>
    //           {citiesD.length !== 0 && (
    //             <div
    //               className="Destination-dataResult"
    //               style={{ display: show }}
    //             >
    //               {citiesD.slice(0, 15).map((ele, index) => {
    //                 return (
    //                   <p
    //                     className="dataItem"
    //                     onClick={() => {
    //                       // setDestination(ele.city.toLowerCase());
    //                       history.push(
    //                         `/hotels?city=${ele.city.toLowerCase()}&checkIn=${localStorage.getItem(
    //                           "checkIn"
    //                         )}&checkOut=${localStorage.getItem("checkOut")}`
    //                       );
    //                     }}
    //                     key={nanoid()}
    //                   >
    //                     {/* <p className="dataItem"> */}
    //                     {/* <img src={ele.img} alt="" className="img-search" /> */}
    //                     <p>{ele.city} </p>
    //                   </p>
    //                 );
    //               })}
    //             </div>
    //           )}
    //         </a>
    //       </li>
    //       <li className="nav_about">
    //         <a onClick={() => history.push(`/longstays`)}>
    //           {" "}
    //           {/* <i className="fas fa-people-carry"></i> */}
    //           Longstays <i className="fas fa-angle-down"></i>
    //         </a>
    //       </li>
    //       <li className="nav_work">
    //         <a
    //           href="https://master.d3mfetjd9ywif7.amplifyapp.com/"
    //           target="_blank"
    //           rel="noreferrer noopener"
    //         >
    //           {" "}
    //           {/* <i className="fas fa-globe-americas"></i>  */}
    //           Coworking
    //         </a>
    //       </li>
    //       <li
    //         className="nav_work"
    //         style={{ cursor: "pointer" }}
    //         onClick={() => history.push(`/aboutus`)}
    //       >
    //         {" "}
    //         <a>About Us</a>
    //       </li>
    //       <li className="nav_contact">
    //         <a href="#contact" className="contact">
    //           {" "}
    //           <p className="text-muted">
    //             <i className="fas fa-mobile-alt"></i>
    //             Customer Support
    //           </p>
    //           +91 8952093209
    //         </a>
    //       </li>
    //     </ul>
    // </div>
    <>
      {width > 760 ? (
        <DesktopComponent userData={userData} />
      ) : (
        <MobileComponent userData={userData} />
      )}
    </>
  );
};

export default Navbar;
