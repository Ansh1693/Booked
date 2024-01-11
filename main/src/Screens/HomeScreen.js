import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/HomeComponets/Hero";
// import Hero2 from "../Components/HomeComponets/Hero2";
// import Hero3 from "../Components/HomeComponets/Hero3";
import Locations from "../Components/HomeComponets/Locations";
import Trust from "../Components/HomeComponets/Trust";
import Reviews from "../Components/HomeComponets/Reviews";
import Features from "../Components/HomeComponets/Features";
import Footer from "./Footer";

const HomeScreen = () => {
  const [dates,setDates] = useState();
  const [destination, setDestination] = useState("");

  return (
    <div className="h-screen w-screen homeScreen-container">
      <Navbar destination={destination} setDestination={setDestination} />
      {/* <Hero3 
         checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        destination={destination}
        setDestination={setDestination}
      /> */}
      {/* <Hero2 /> */}
      <div className="bg-[#c7c7c7]/10 py-10">

      <Hero
        dates={dates}
        setDates={setDates}
        destination={destination}
        setDestination={setDestination}
        />
        </div>
      <Features />
      <Locations
        dates={dates}
        setDates={setDates}
      />
      <Trust
        
      />
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomeScreen;
