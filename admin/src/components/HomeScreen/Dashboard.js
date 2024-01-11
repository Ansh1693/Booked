import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../common/Buttons/PrimaryButton";
import AddOneHotel from "./AddOne";
import PropertyCard from "./PropertyCard";
import { UserContext } from "../../Context/AllContexts";

const Dashboard = () => {
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const token = localStorage.getItem("accessToken");
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [hotels, setHotels] = React.useState([]);
  const getHotels = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/${userData.role.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      const data2 = await response.json();
      if (data2.success === true && data2.data) {
        setHotels(data2.data.hotels);
        setUserData(data2.data);
      }
    } catch (error) {}
  };

  const [hotelTabs, setHotelTabs] = React.useState(1);
  if (!token) {
    navigate("/login");
  }

  React.useEffect(() => {
    if (userData?.firstName) {
      setHotels(userData.hotels);
    }
  }, [userData]);

  // return (
  //   <div className="w-full ">
  //     <div className="flex flex-col items-center justify-center p-6 gap-12 ">
  //       <div className="flex items-center justify-around gap-12">
  //       <h1 className="text-3xl font-bold">Dashboard</h1>
  //       <PrimaryButton text={"Create New Event"} onClick={()=>{setIsOpen(true)}}/>
  //       </div>

  //       <div className="flex flex-wrap items-center justify-center gap-12">
  //         {hotels &&
  //           hotels.length > 0 &&
  //           hotels.map((hotel) => {
  //             return (
  //               <div
  //                 className="h-40 w-96 shadow-lg p-4 bg-slate-500 cursor-pointer"
  //                 key={hotel.hotelId}
  //                 onClick={() => {
  //                   navigate(`/hotels/${hotel.hotelId}`);
  //                 }}
  //               >
  //                 <h1 className="text-white">{hotel.hotelName}</h1>
  //                 <h1 className="text-white">{hotel.city}</h1>
  //               </div>
  //             );
  //           })}
  //       </div>
  //     </div>
  //     <AddOneHotel open={isOpen} setOpen={setIsOpen} getHotels={getHotels}/>
  //   </div>
  // );

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[800px] md:pb-5 md:mt-7 px-[16px]  flex flex-col md:bg-white bg-[#FAFAFA] pb-[80px] min-h-[90vh]">
          <div className=" flex  justify-items-center w-full  gap-x-6 h-[60px]">
            <form
              className="flex items-center my-4 w-1/2"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full ">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2  input  dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Search"
                  autoComplete="off"
                  required={true}
                ></input>
              </div>
            </form>
            {userData?.role === "ADMIN" && (
              <div className="hidden md:flex  md:items-center md:my-4 w-1/2">
                <PrimaryButton
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  classes="w-full"
                  text={"Add New Property"}
                  capital={true}
                />
              </div>
            )}
          </div>
          <div className="hidden md:flex md:justify-center md:mt-11 md:gap-x-5">
            {[1].map((event, index) => (
              <React.Fragment key={index}>
                <div
                  className={`${
                    hotelTabs === event
                      ? "pb-2.5 border-b-2 border-primary text-primary font-bold cursor-pointer text-[15px]"
                      : "cursor-pointer pb-2.5 border-b-2 text-[15px]"
                  }`}
                  onClick={() => {
                    setHotelTabs(event);
                  }}
                >
                  My Hotels
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="">
            {hotels?.length === 0 ? (
              <div className="grid w-full place-items-center h-[350px] mt-[30px]">
                <div>
                  <p className="text-[20px] font-[500] text-[#717171] text-center">
                    No Hotels Found
                  </p>
                  <img
                    src="/svgs/nullState.svg"
                    alt=""
                    className="w-[300px] h-[300px]"
                  />
                </div>
              </div>
            ) : loading ? (
              <h3 className="text-[25px] font-[500] md:font-[600] text-center text-gray-500 mt-[50%] md:mt-[30px]">
                Loading...
              </h3>
            ) : (
              <div>
                {hotelTabs === 1 ? (
                  <>
                    {hotels.length > 0 ? (
                      <div className="grid grid-cols-1 md:px-0 place-content-center justify-items-center md:grid-cols-2 gap-x-[65px] md:gap-y-[30px] gap-y-[14px] mt-1 md:mt-[46px]">
                        {hotels.map((ele, index) => (
                          <React.Fragment key={index}>
                            <PropertyCard ele={ele} />
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="grid w-full place-items-center h-[350px] mt-[30px]">
                        <div>
                          <p className="text-[20px] font-[500] text-[#717171] text-center">
                            No Events Found
                          </p>
                          <img
                            src="/svgs/nullState.svg"
                            alt=""
                            className="w-[300px] h-[300px]"
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : hotelTabs === 2 ? (
                  <>
                    {hotels.length > 0 ? (
                      <div className="grid grid-cols-1 md:px-0 place-content-center justify-items-center md:grid-cols-2 gap-x-[65px] md:gap-y-[30px] gap-y-[14px] mt-1 md:mt-[46px]">
                        {hotels.map((ele, index) => (
                          <React.Fragment key={index}>
                            <PropertyCard ele={ele} />
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="grid w-full place-items-center h-[350px] mt-[30px]">
                        <div>
                          <p className="text-[20px] font-[500] text-[#717171] text-center">
                            No Organized Events Found
                          </p>
                          <img
                            src="/svgs/nullState.svg"
                            alt=""
                            className="w-[300px] h-[300px]"
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : hotelTabs === 3 ? (
                  <>
                    {hotels.length > 0 ? (
                      <div className="grid grid-cols-1 md:px-0 place-content-center justify-items-center md:grid-cols-2 gap-x-[65px] md:gap-y-[30px] gap-y-[14px] mt-1 md:mt-[46px]">
                        {hotels.map((ele, index) => (
                          <React.Fragment key={index}>
                            <PropertyCard ele={ele} />
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div className="grid w-full place-items-center h-[350px] mt-[30px]">
                        <div>
                          <p className="text-[20px] font-[500] text-[#717171] text-center">
                            No Past Events Found
                          </p>
                          <img
                            src="/svgs/nullState.svg"
                            alt=""
                            className="w-[300px] h-[300px]"
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <AddOneHotel open={isOpen} setOpen={setIsOpen} getHotels={getHotels} />
    </>
  );
};

export default Dashboard;
