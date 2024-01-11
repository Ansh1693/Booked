import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import sliderImage from "./sliderImage";
import "./slider.css";

function Slider(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const len = props.sliderImages.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div
      className="h-screen bg-black fixed top-0 left-0 grid place-items-center w-screen"
      style={{ display: props.sliderShow }}
    >
      <div className="w-full h-full relative p-8 md:p-16">
        <span
          className="absolute top-4 right-12 text-3xl text-white cursor-pointer"
          onClick={() =>
            props.sliderShow === "none"
              ? props.setSliderShow("grid")
              : props.setSliderShow("none")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <div className="h-full w-full flex-col md:justify-start justify-center  flex items-center gap-10">
          {/* <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} /> */}
          <div className="carousel w-3/4 h-2/3 transition-all duration-100 ">
            {props.sliderImages.map((image, index) => (
              <div id={`item${index}`} className="carousel-item w-full relative">
                <img src={image} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#item${index===0 ? len : index-1}`} className="btn max-md:h-8 max-md:w-8 text-xs md:text-base   bg-gray-800 border-none btn-circle text-white">
                    ❮
                  </a>
                  <a href={`#item${index===len ? 0 : index+1}`} className="btn max-md:h-8 max-md:w-8 text-xs md:text-base   bg-gray-800 border-none btn-circle text-white">
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full py-2 gap-4 flex-wrap">
            {props.sliderImages.map((image, index) => (
              <a
                href={`#item${index}`}
                className= " h-3 w-6 sm:h-6 sm:w-12 md:h-12 md:w-24 lg:rounded-md lg:border-2 border-white"
              >
                <img src={image} className="w-full h-full md:rounded-md" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
