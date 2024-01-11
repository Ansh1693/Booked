import React from "react";

function SliderContent({ activeIndex, sliderImagesNew }) {
  return (
    <section>
      {sliderImagesNew.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
          style={{ backgroundImage: `url(${slide})`}}
        >
          {/* <img className="slide-image" src={slide} alt="" /> */}
          {/* <h2 className="slide-title">{slide.title}</h2> */}
          {/* <h3 className="slide-text">{slide.description}</h3> */}
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
