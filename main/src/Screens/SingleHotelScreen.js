import React from 'react'
import SingleHotel from "../Components/SingleHotel-Components/SingleHotel";
// import SingleHotel from "../Components/SingleHotel-Components/SingleHotel-copy.js";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "./Footer";

const SingleHotelScreen = () => {
  return (
    <div className="single-hotel-container">
      <Navbar />

      <SingleHotel />
      <Footer />
    </div>
  )
}

export default SingleHotelScreen;