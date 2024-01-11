import React from "react";
import ShowOne from "./ShowOne/ShowOne";
import { UserContext } from "../../Context/AllContexts";
import { useSearchParams } from "react-router-dom";
import Rooms from "./Rooms/Rooms";
import Team from "../Team/Team";
const Layout = ({ hotelData, setHotelData, role }) => {
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const [searchParams] = useSearchParams();
  if (userData) {
    switch (searchParams.get("show")) {
      case "propertyInfo":
        return <ShowOne hotelData={hotelData} setHotelData={setHotelData} />;
      case "rooms":
        return <Rooms />;
      case "team":
        if (userData?.role === "ADMIN") {
          return <Team />;
        } else {
          return (
            <ShowOne
              hotelData={hotelData}
              setHotelData={setHotelData}
              role={role}
            />
          );
        }
      default:
        return (
          <ShowOne
            hotelData={hotelData}
            setHotelData={setHotelData}
            role={role}
          />
        );
    }
  }
};

export default Layout;
