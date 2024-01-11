import react, {useState} from "react";
import {HotelContext} from "./hotelsContext.js";

const HotelState = (props) => {

  const [allSearchedHotels, setAllSearchedHotels] = useState({success: false});

  return (
    <HotelContext.Provider value={{ allSearchedHotels, setAllSearchedHotels}}>
      {props.children}
    </HotelContext.Provider>
  );
};

export default HotelState;
