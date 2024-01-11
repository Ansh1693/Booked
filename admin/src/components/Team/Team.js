import React, { useEffect, useState } from "react";
import PrimaryButton from "../../common/Buttons/PrimaryButton";
import DefaultProfilePicture from "../../common/DefaultProfilePicture/DefaultProfile";
import AddTeam from "./AddTeam";
import { UserContext } from "../../Context/AllContexts";
import { useNavigate, useMatch } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();
  const hotelId = useMatch("/hotels/:hotelId/*").params.hotelId;
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [team, setTeam] = useState([]);
  const { userData, setUserData, accessToken, setAccessToken } =
    React.useContext(UserContext);
  const token = localStorage.getItem("accessToken");

  const fetchTeamData = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/getTeam/${hotelId}`,
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
      if (data.success === true && data.message) {
        setTeam(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/deleteTeam/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        setTeam(team.filter((ele) => ele._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token && !accessToken) {
      navigate("/login");
    }
    if (!accessToken) {
      setAccessToken(token);
      // console.log(token);
    }
    if (accessToken) {
      fetchTeamData(accessToken);
    }
  }, []);

  return (
    <div className="w-full md:w-[400px] ml-0 md:ml-[0px] mt-5 md:mt-[30px] ">
      <div className="font-[600]  md:w-[400px] text-[20px]  text-black md:flex items-center justify-between bg-white">
        <p className="text-[22px] font-inter font-semibold">Teams</p>
        <div className="w-[335px] md:w-[160px]">
          <PrimaryButton
            text={"Add Team"}
            onClick={() => {
              setOpen(true);
            }}
            small={true}
            classes="w-[160px]"
          />
        </div>
      </div>
      <div className="flex w-[335px] md:w-[340px] flex-row place-content-around mx-auto md:mx-0">
        <AddTeam
          open={open}
          setOpen={setOpen}
          isSubmitting={isSubmitting}
          getTeam={fetchTeamData}
          setTeam={setTeam}
        />
      </div>

      <div className="w-[335px] md:w-[400px] md:mx-0 mt-[20px] relative">
        {team?.length > 0 ? (
          team.map((ele, index) => {
            return (
              <div key={ele._id}>
                <div className="my-4 flex justify-between ">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <i className="fa-sharp fa-regular fa-face-smile fa-xl"></i>{" "}
                      <div className="pl-2.5 w-[220px]">
                        <div className="text-[12px] font-inter font-semibold py-1">
                          {ele.firstName} {ele.lastName}
                        </div>
                        <div className="text-[12px] text-gray-500">
                          {ele.email}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`cursor-pointer stroke-black flex items-center gap-2`}
                    >
                      <span className=" bg-blue-100 text-blue-800 text-[12px] font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {ele.role}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        className="w-6 h-6 stroke-inherit"
                        onClick={() => handleDelete(ele._id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-[325px] md:w-[400px]">
                  <hr />
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <img
              src="/svgs/nullState.svg"
              alt=""
              className="w-[200px] h-[200px]"
            />
            <p className="text-[15px] font-[500] text-[#717171]">
              No Team members added...
            </p>
          </div>
        )}

        <div className="mt-[50px]"></div>
      </div>
    </div>
  );
};

export default Team;
