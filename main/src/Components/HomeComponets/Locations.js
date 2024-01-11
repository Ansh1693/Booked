import React from "react";
import { useHistory } from "react-router-dom";

const Locations = ({ dates }) => {
  const history = useHistory();

  const cities = ["Jaipur", "Indore", "Gurugram", "Bangalore"];

  const backgroundImages = [
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/karnatakas-metropolitan-city-with-its-grand_3lJVBIb_N6NpaQyJH.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187835",
    "https://media.istockphoto.com/photos/mahatma-gandhi-hall-picture-id515708494?k=20&m=515708494&s=612x612&w=0&h=UrV-fBKwOLDdxYhey3ge-j4-Ksgb6hq-Kf0GCwDWgQQ=",
    "https://ik.imagekit.io/k3m4pqzpmlr/desktop_coupons/topimg_20060_gurgaon_fa7WFfrTL.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1655708054965",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Lalbagh_Glasshouse_night_panorama.jpg/1920px-Lalbagh_Glasshouse_night_panorama.jpg",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/himachals-treasure-trove-of-adventure-scene_qi6U78o_vb6_FtLP_.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732185700",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/greenery-is-found-at-its-best-in-coorg-2020_o86HXBS_sVzeIlqFP.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732185144",
    "https://ik.imagekit.io/k3m4pqzpmlr/coupons/the-blue-city-charms-travellers-with-rich-h_AT52qza_ndYKLog-j.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1650732187875",
  ];

  return (
    <div className="w-screen py-24">
      <div className="flex gap-6 xl:gap-8 justify-center flex-wrap items-center">
        {cities.map((ele, index) => {
          return (
            <div
              className="ec2 flex-grow-0 relative h-72 w-72 group"
              onClick={() => {
                const checkInDate = new Date(
                  new Date(dates[0]).getTime() + 5.5 * 60 * 60 * 1000
                )
                  .toISOString()
                  .substring(0, 10);
                const checkOutDate = new Date(new Date(dates[1]).getTime())
                  .toISOString()
                  .substring(0, 10);
                localStorage.setItem("destination", ele.toLocaleLowerCase());
                localStorage.setItem("checkIn", JSON.stringify(checkInDate));
                //  localStorage.setItem("checkIn", checkIn);
                localStorage.setItem("checkOut", JSON.stringify(checkOutDate));
                localStorage.setItem("roomConfig", JSON.stringify([1]));
                //  localStorage.setItem("checkOut", checkOut);
                history.push(
                  `/hotels?city=${ele.toLowerCase()}&checkIn=${JSON.stringify(
                    checkInDate
                  )}&checkOut=${JSON.stringify(
                    checkOutDate
                  )}&roomConfig=${JSON.stringify([1])}`
                );
              }}
            >
              <img
                src={backgroundImages[index]}
                alt="normal"
                className="h-full w-full rounded-xl group-hover:brightness-[0.25]"
              />
              <p className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold group-hover:text-primary">
                {ele}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Locations;
