import react, {useState} from "react";
import {SliderImageContext} from "./hotelsContext.js";

const SliderImageState = (props) => {

  const [sliderImg, setSliderImg] = useState([]);

  return (
    <SliderImageContext.Provider value={{ sliderImg, setSliderImg}}>
      {props.children}
    </SliderImageContext.Provider>
  );
};

export default SliderImageState;
