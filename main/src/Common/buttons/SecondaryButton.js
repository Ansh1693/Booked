import React from "react";

const SecondaryButton = (props) => {
  return (
    <button
      className={`btn  bg-white text-primary hover:bg-primary hover:text-white w-36 md:w-48 lg:w-60 ${
        props.classes
      } ${props.disabled && "bg-gray-600 hover:bg-gray-600"} ${
        props.small && "btn-sm"
      }${props.capital && "capitalize"}`}
      onClick={props.onClick}
      {...props}
    >
      {props.text}
    </button>
  );
};

export default SecondaryButton;

// bg-primary rounded-xl text-[18px] xl:text-md grid place-items-center font-semibold w-36 md:w-48 lg:w-60 hover:text-primary hover:bg-white hover:border hover:border-primary text-white cursor-pointer h-12
