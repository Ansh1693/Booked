import React, { useState, useContext, useEffect } from "react";
import { SelectedRoomsContext } from "../../context/hotelsContext.js";
import PrimaryButton from "../../Common/buttons/PrimaryButton.js";
import AmenitiesIcons from "../../Common/Icons/AmenitiesIcons.js";

const RoomCard = ({ ele, number }) => {
  //room count is
  const [count, setCount] = useState(0);
  const [available, setAvailable] = useState();
  const [disabled, setDisabled] = useState(false);

  console.log(ele);

  const { selectedRooms, setSelectedRooms } = useContext(SelectedRoomsContext);

  useEffect(() => {
    let count = 0;
    ele.roomDetails.forEach((ele1) => {
      console.log(ele1);
      if (ele1.bookingDetails.length === 0) count++;
    });

    setAvailable(count);
  }, [ele]);

  useEffect(() => {
    setCount(selectedRooms.filter((ele1) => ele1.roomId === ele.roomId).length);
  }, [selectedRooms]);

  function addRoomToCartHandler(newRoom) {
    setSelectedRooms([{ ...newRoom, qty: 1 }]);
  }

  function removeRoomFromCartHandler(oldRoom) {
    setSelectedRooms(
      selectedRooms.filter((ele1, index) => ele1.roomId !== oldRoom.roomId)
    );
  }

  return (
    <div className="max-md:min-h-96 relative flex-col flex md:flex-row gap-4 mb-5 rounded-lg shadow-xs hover:shadow-md md:h-48 bg-white">
      <div className="">
        <img
          src={ele.images[0]}
          className="h-48 rounded-xl rounded-b-none md:rounded-xl md:rounded-r-none w-full md:w-[230px]"
          alt=""
        />
      </div>

      <div className="py-3 px-3 flex flex-col gap-3 md:w-full">
        <div className="flex flex-row w-full justify-between items-center">
          <p className="text-md font-semibold">
            {ele.roomName}{" "}
            <span className="text-primary text-sm underline">
              {available} available
            </span>{" "}
          </p>
          <p className="text-md font-semibold">
            {" "}
            <i className="fas fa-rupee-sign"></i> {ele.roomPrice / number}
          </p>
        </div>

        {window.innerWidth > 600 ? (
          <p className="font-base text-sm text-[#808080] font-medium">
            {ele.roomDescription}
          </p>
        ) : (
          <p className="font-base text-[#808080] font-medium">
            {ele.roomDescription.slice(0, 60)}
          </p>
        )}

        <div className="flex items-center gap-2">
          {ele?.amenities.map((ele, index) => (
            <div className="h-4 w-4 text-[#4D585B]">
              <AmenitiesIcons type={ele} />
            </div>
          ))}
        </div>
        {available > 0 && (
          <div className="absolute bottom-4 right-4 flex mt-4 gap-4 items-center justify-end">
            {count === 0 ? (
              <PrimaryButton
                classes="uppercase btn-sm text-xs flex items-center justify-center max-w-max "
                onClick={() => {
                  addRoomToCartHandler(ele);
                }}
                text="Select Room"
              />
            ) : (
              <PrimaryButton
                classes="uppercase btn-sm text-xs flex items-center justify-center max-w-max bg-white !text-primary  hover:border-primary"
                onClick={() => {
                  removeRoomFromCartHandler(ele);
                }}
                text="Selected "
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
