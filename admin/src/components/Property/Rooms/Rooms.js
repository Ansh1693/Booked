import React from "react";
import { UserContext, HotelContext } from "../../../Context/AllContexts";
import RoomCard from "./RoomCard";
import AddOneRoom from "./AddOneRoom";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";

const Rooms = () => {
  const { hotelData, setHotelData } = React.useContext(HotelContext);
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const [rooms, setRooms] = React.useState();

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [singleRoom, setSingleRoom] = React.useState({});

  React.useEffect(() => {
    if (!open) {
      setSingleRoom({});
      setEdit(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (hotelData) {
      setRooms(hotelData.rooms);
    }
  }, [hotelData]);

  //   React.useEffect(() => {
  //     if(!open){
  //         setEdit(false);
  //         setSingleRoom(null);
  //     }
  //   },[open])

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4  pl-4 pt-6">
        <div className="font-semibold flex gap-12 items-center h-max  text-2xl font-inter">
          Rooms{" "}
          {userData?.role === "ADMIN" && (
            <PrimaryButton
              text={"Add New Room"}
              onClick={() => {
                setOpen(true);
              }}
              small={true}
              capital={true}
              classes="w-52"
            />
          )}
        </div>
        <div className="grid grid-cols-2 w-max  gap-12">
          {rooms?.map((ele, index) => (
            <div key={index} className="w">
              <RoomCard
                ele={ele}
                handleClick={() => {
                  setSingleRoom(ele);
                  setEdit(true);
                  setOpen(true);
                }}
              />
            </div>
          ))}
          <div className="w-72"></div>
        </div>
      </div>
      <AddOneRoom
        open={open}
        setOpen={setOpen}
        edit={edit}
        setEdit={setEdit}
        singleRoom={singleRoom}
        hotelId={hotelData?.hotelId}
        user={userData}
      />
    </>
  );
};

export default Rooms;
