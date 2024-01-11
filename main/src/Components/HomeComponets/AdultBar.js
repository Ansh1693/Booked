import React from "react";

const AdultBar = ({
  adults,
  setAdults,
  roomAdults,
  setRoomAdults,
  rooms,
  setRooms,
}) => {
  const handleDecreaseAdult = (index) => {
    if (roomAdults[index] > 1) {
      setAdults(adults - 1);
      const newRoomAdults = [...roomAdults];
      newRoomAdults[index] = newRoomAdults[index] - 1;
      setRoomAdults(newRoomAdults);
    }
  };
  const handleIncreaseAdult = (index) => {
    if (roomAdults[index] < 4) {
      setAdults(adults + 1);
      const newRoomAdults = [...roomAdults];
      newRoomAdults[index] = newRoomAdults[index] + 1;
      setRoomAdults(newRoomAdults);
    }
  };

  const handleDecreaseRoom = (index) => {
    if (rooms > 1) {
      setRooms(rooms - 1);
      setAdults(adults - roomAdults[index]);
      const newRoomAdults = [...roomAdults];
      newRoomAdults.splice(index, 1);
      setRoomAdults(newRoomAdults);
    }
  };

  const handleIncreaseRoom = () => {
    if (rooms < 10) {
      setRooms(rooms + 1);
      setRoomAdults([...roomAdults, 1]);
      setAdults(adults + 1);
    }
  };

  return (
    <div className="dropdown bg-white ">
      <label
        tabIndex={0}
        className="font-medium m-1 bg-white border-none hover:bg-white text-[#808080] text-[14px] "
      >
        {adults} Adults | {rooms} Room
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-max mt-4 flex flex-col gap-4  text-[#808080]"
      >
        {roomAdults.map((roomAdult, index) => (
          <div className="flex  gap-4 items-center" key={index}>
            <label className="font-medium">
              Room {roomAdults.length > 1 && index + 1}
            </label>

            <div className="flex gap-2 items-center justify-center rounded-full bg-secondary p-2">
              <button
                className="h-6 w-6 flex items-center justify-center  rounded-full stroke-primary hover:bg-white"
                onClick={() => {
                  handleDecreaseAdult(index);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12H6"
                  />
                </svg>
              </button>
              <label className="font-medium">{roomAdult}</label>
              <button
                className="h-6 w-6 flex items-center justify-center  rounded-full stroke-primary hover:bg-white"
                onClick={() => {
                  handleIncreaseAdult(index);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>
            </div>
            {rooms > 1 && (
              <div
                className="p-2 flex items-center justify-center cursor-pointer bg-secondary  rounded-full stroke-primary hover:bg-white"
                onClick={() => handleDecreaseRoom(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-4 h-4 stroke-primary hover:bg-white rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
        <div
          className="flex gap-4 items-center w-full text-sm justify-center cursor-pointer text-primary"
          onClick={() => handleIncreaseRoom()}
        >
          Add room
        </div>
      </div>
    </div>
  );
};

export default AdultBar;
