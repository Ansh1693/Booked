import React, { useEffect } from "react";
import { useMatch } from "react-router-dom";
import PrimaryButton from "../../../common/Buttons/PrimaryButton";
import EditOne from "./EditOne";
import AmenitiesIcons from "./Amenities";
import Policies from "./Policies";
import Maps from "./Maps";

const ShowOne = ({ hotelData, setHotelData, role }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const [translate, setTranslate] = React.useState(0);

  return (
    <>
      <div className="w-[500px] h-full py-12 px-2 ">
        {/* {hotelData && hotelData.hotelName} */}
        <div className="w-full  h-52">
          <div
            className={`carousel h-full w-full transition-all duration-100 translate-x-[${translate}px]`}
            // style={{ transform: `translateX(-${translate}px)` }}
          >
            {hotelData?.images.map((image, index) => {
              const len = hotelData?.images.length - 1;

              const handleNextClick = () => {
                if (index === len) {
                  setTranslate(0);
                } else {
                  setTranslate(translate + 484);
                }
              };

              const handlePrevClick = () => {
                if (index === 0) {
                  setTranslate(len * 484);
                } else {
                  setTranslate(translate - 484);
                }
              };
              return (
                <div
                  // id={`item${index}`}
                  className="carousel-item w-full relative transition-all"
                  key={index}
                  style={{ transform: `translateX(-${translate}px)` }}
                >
                  <img src={image} className="w-full h-full  object-cover" />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <div
                      // href={`#item${index === 0 ? len : index - 1}`}
                      onClick={handlePrevClick}
                      className="btn max-md:h-8 max-md:w-8 text-xs md:text-base btn-circle border-white border-[3px] font-bold bg-transparent text-white hover:bg-transparent"
                    >
                      ❮
                    </div>
                    <div
                      // href={`#item${index === len ? 0 : index + 1}`}
                      onClick={handleNextClick}
                      className="btn max-md:h-8 max-md:w-8 text-xs md:text-base   btn-circle border-white border-[3px] font-bold bg-transparent text-white hover:bg-transparent"
                    >
                      ❯
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 w-full  flex flex-row items-center gap-4">
          <p className="font-semibold text-2xl font-sans">
            {hotelData?.hotelName}
          </p>
          <PrimaryButton
            onClick={() => setIsOpen(true)}
            text="Edit"
            small={true}
            classes="w-24 font-montserrat"
            capital={true}
          />
        </div>

        <div className="mt-6 w-full  items-center gap-4 font-montserrat text-justify text-[#4d585b] text-[12px] leading-normal font-medium">
          {!showMore
            ? hotelData?.description.slice(0, 220)
            : hotelData?.description}
          {hotelData?.description.length > 220 && (
            <span
              className="font-semibold pl-1 cursor-pointer"
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              {!showMore ? "Show More " : "Show Less"}
            </span>
          )}
        </div>

        <div className="mt-6 w-full  font-roboto flex flex-col gap-4">
          <div className="text-lg font-bold">Amenities</div>
          <div className="w-full grid grid-cols-[150px_150px] gap-4">
            {hotelData?.amenities.map((amenity, index) => (
              <div className="flex flex-row gap-4 items-center" key={index}>
                <AmenitiesIcons type={amenity} />
                <div className="font-semibold text-[14px] text-[#4D585B]">
                  {amenity}
                </div>
              </div>
            ))}
          </div>
        </div>
        {hotelData && (
          <div className="mt-6 w-full font-roboto flex flex-col gap-4">
            <div className="font-roboto font-bold text-lg">Location</div>
            {hotelData?.location ? (
              <Maps
                singleHotel={hotelData}
                location={{
                  lat: parseFloat(hotelData?.location?.lat),
                  lang: parseFloat(hotelData?.location?.lang),
                }}
              />
            ) : (
              <Maps singleHotel={hotelData} />
            )}
          </div>
        )}
        <div className="my-6 w-full">
          <Policies
            propertyPolicies={hotelData?.policies?.property.split(",")}
            cancellationPolicy={hotelData?.policies?.cancellation.split(",")}
          />
        </div>

        <div className="h-12 w-full ">&nbsp;</div>
      </div>
      {isOpen && (
        <EditOne
          open={isOpen}
          setOpen={setIsOpen}
          singleHotel={hotelData}
          setSingleHotel={setHotelData}
        />
      )}
    </>
  );
};

export default ShowOne;
