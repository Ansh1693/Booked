import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import HotelsScreenMain from "../Components/HotelsScreen-Componets/HotelsScreenMain";
import Footer from "./Footer";

const HotelsScreen = () => {
  return (
    <div className="hotels-container">
      <Navbar />

      <HotelsScreenMain />
      <Footer />
    </div>
  );
};

export default HotelsScreen;
