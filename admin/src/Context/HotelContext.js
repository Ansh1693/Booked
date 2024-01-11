import React, {useState} from "react";
import {HotelContext} from "./AllContexts";

const HotelStateContext = (props) => {

  const [hotelData , setHotelData] = useState();

  return (
    <HotelContext.Provider value={{ hotelData , setHotelData}}>
      {props.children}
    </HotelContext.Provider>
  );
};

export default HotelStateContext;
