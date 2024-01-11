import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import Layout from "./Layout";
import Navbar from "../../common/Navbar/Navbar";
import { UserContext, HotelContext } from "../../Context/AllContexts";

export const fetchHotelData = async (token, hotelId, role) => {
  // console.log(hotelId, token);
  try {
    const response = await fetch(
      `http://localhost:5001/api/v1/${role.toLowerCase()}/hotels/${hotelId}`,
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
    if (data.success === true && data.data) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const MainPage = () => {
  const match = useMatch("/hotels/:hotelId/*");
  const navigate = useNavigate();
  const [singleHotelData, setSingleHotelData] = React.useState();
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const { hotelData, setHotelData } = React.useContext(HotelContext);
  const token = localStorage.getItem("accessToken");

  React.useEffect(() => {
    if (!token && !accessToken) {
      navigate("/login");
    }
    if (!accessToken) {
      setAccessToken(token);
      // console.log(token);
    }

    if (accessToken && userData) {
      const data = fetchHotelData(
        accessToken,
        match?.params?.hotelId,
        userData?.role
      );
      data.then((data) => {
        setSingleHotelData(data);
        setHotelData(data);
      });
    }
  }, [accessToken, userData]);
  return (
    <div className="flex flex-col">
      <div className="header h-[58px] w-full">
        <Navbar />
      </div>
      <div className="w-full flex justify-center items-center flex-col ">
        <div className="w-full xl:w-[1440px] overflow-x-hidden">
          <div
            className={`grid grid-cols-[228px_1fr] ${" h-[calc(100vh_-_58px)]"}  `}
          >
            {/* <div className="sidebar md:w-[228px]"> */}
            <div className="sidebar md:w-[228px]">
              <SideMenu
                property={singleHotelData?.hotelName}
                owner={singleHotelData?.city}
              />
            </div>
            <div
              className={`container ml-[30px] w-full ${" h-[calc(100vh_-_58px)]"}`}
            >
              <Layout
                hotelData={singleHotelData}
                setHotelData={setSingleHotelData}
                role={userData?.role}
              />

              {/* {props.children} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
