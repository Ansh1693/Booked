import react, {useState} from "react";
import {SelectedRoomsContext} from "./hotelsContext.js";

const BookedRoomsState = (props) => {

  const [selectedRooms, setSelectedRooms] = useState([]);

  return (
    <SelectedRoomsContext.Provider value={{ selectedRooms, setSelectedRooms}}>
      {props.children}
    </SelectedRoomsContext.Provider>
  );
};

export default BookedRoomsState;
