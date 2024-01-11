import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ ele, handleClick }) => {
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer bg-white w-full md:w-[350px] rounded-[1px] overflow-hidden border-[1px]">
      <div className="relative">
        <img
          src={
            ele?.images
              ? ele?.images[0]
              : "https://img.cdn.zostel.com/zostel/gallery/images/bqpi1JSFRm-HurkJPhgsVw/bangalore-20201112104621.jpg?w=1280"
          }
          alt={ele.title}
          className="h-[184px] w-full md:h-[150px]   md:mt-0 md:w-full object-cover  "
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
          }}
        />
      </div>
      <div className="p-2 px-6  flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2 font-inter">
          <div className="font-semibold text-lg">{ele.roomName}</div>
          <div className="font-medium text-base text-[#4D585B]">
            ₹{ele.roomPrice}
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleClick}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="path-1-outside-1_14_2"
              maskUnits="userSpaceOnUse"
              x="0"
              y="3"
              width="22"
              height="22"
              fill="black"
            >
              <rect fill="white" y="3" width="22" height="22" />
              <path d="M11 5H4C3.46957 5 2.96086 5.21071 2.58579 5.58579C2.21071 5.96086 2 6.46957 2 7V21C2 21.5304 2.21071 22.0391 2.58579 22.4142C2.96086 22.7893 3.46957 23 4 23H18C18.5304 23 19.0391 22.7893 19.4142 22.4142C19.7893 22.0391 20 21.5304 20 21V14" />
            </mask>
            <path
              d="M11 7C12.1046 7 13 6.10457 13 5C13 3.89543 12.1046 3 11 3V7ZM4 5V3V5ZM2 7H0H2ZM2 21H0H2ZM22 14C22 12.8954 21.1046 12 20 12C18.8954 12 18 12.8954 18 14H22ZM11 3H4V7H11V3ZM4 3C2.93913 3 1.92172 3.42143 1.17157 4.17157L4 7L4 7V3ZM1.17157 4.17157C0.421427 4.92172 0 5.93913 0 7H4L4 7L1.17157 4.17157ZM0 7V21H4V7H0ZM0 21C0 22.0609 0.421427 23.0783 1.17157 23.8284L4 21H4H0ZM1.17157 23.8284C1.92172 24.5786 2.93913 25 4 25V21H4L1.17157 23.8284ZM4 25H18V21H4V25ZM18 25C19.0609 25 20.0783 24.5786 20.8284 23.8284L18 21V25ZM20.8284 23.8284C21.5786 23.0783 22 22.0609 22 21H18L20.8284 23.8284ZM22 21V14H18V21H22Z"
              fill="black"
              mask="url(#path-1-outside-1_14_2)"
            />
            <path
              d="M12.2425 16.9702C12.4184 16.9262 12.5789 16.8353 12.7071 16.7071L22.2071 7.20712C22.7925 6.62176 23.1213 5.82784 23.1213 5.00001C23.1213 4.17219 22.7925 3.37827 22.2071 2.79291C21.6217 2.20754 20.8278 1.87869 20 1.87869C19.1722 1.87869 18.3783 2.20754 17.7929 2.79291L8.29289 12.2929C8.16473 12.4211 8.07382 12.5816 8.02986 12.7575L7.02986 16.7575C6.94466 17.0983 7.04451 17.4587 7.29289 17.7071C7.54127 17.9555 7.90176 18.0553 8.24254 17.9702L12.2425 16.9702Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
