import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { configData } from "../../Config/config.js";

const LongStaysMain = () => {
  const history = useHistory();
  const [allSearchedHotels, setAllSearchedHotels] = useState({
    success: false,
  });

  // const search = useLocation().search;
  // const city = new URLSearchParams(search).get("city");
  // const checkIn = new URLSearchParams(search).get("checkIn");
  // const checkOut = new URLSearchParams(search).get("checkOut");

  async function getLongStayHotels() {
    const response = await fetch(
      `${
        configData.REACT_APP_SERVER_URL
      }/api/v1/anonymous/hotels?city=jaipur&checkIn=${new Date().toISOString()}&checkOut=${new Date().toISOString()}`,
      // `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/hotels?city=jaipur`,
      // `${process.env.REACT_APP_SERVER_URL}/api/v1/anonymous/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setAllSearchedHotels(data);
    console.log(data);
  }

  useEffect(() => {
    getLongStayHotels();
    window.scrollTo(0, 0);
  }, []);
  if (allSearchedHotels.success === false) {
    return <h2> Loading ...</h2>;
  } else if (allSearchedHotels.data.length <= 0) {
    return (
      <div className="coming_soon-box">
        {" "}
        <h1>Coming Soon ...</h1>{" "}
      </div>
    );
  } else {
    return (
      <div className="longstays-inner">
        <p className="head">#MOVEIN with Booked</p>

        <p className="subhead">Live where your heart is.</p>

        <img
          src="https://book.zostel.com/static/media/bg1.a8f3847b.jpg"
          alt="good"
          className="img-cover"
        />

        <div className="hotels-available">
          <h1 className="title-available-hotels">
            Stays At {allSearchedHotels.data[0].city}
          </h1>

          {/* array.map Hotels in City */}
          <div className="available-hotels">
            {allSearchedHotels.data
              .filter((ele, index) => ele.hotelUrl === "longstay")
              .map((ele, index) => {
                return (
                  <div
                    className="one-hotel"
                    onClick={() =>
                      history.push(
                        `/hotel/${
                          ele.hotelId
                        }?checkIn=${new Date().toISOString()}&checkOut=${new Date().toISOString()}`
                      )
                    }
                  >
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${ele.images[0]})` }}
                    >
                      {/* <img src={ele.images[0]} alt="" /> */}
                    </div>

                    <div className="hotel-description">
                      <p className="brand-name">Booked Townhouse</p>
                      <h2 className="hotel-title">{ele.hotelName}</h2>

                      <p className="hotel-moreinfo">{ele.description}</p>

                      <div className="view-btn">
                        View <i className="fas fa-long-arrow-alt-right"></i>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
};

export default LongStaysMain;
