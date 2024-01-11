import React from 'react'
import Navbar from "../Components/Navbar/Navbar";
import LongStaysMain from "../Components/LongStays-Components/LongStaysMain";
import Footer from "./Footer";

const LongStaysScreen = () => {
  return (
    <div className="longstays-container">
      <Navbar />

      <LongStaysMain />
      <Footer />
    </div>
  )
}

export default LongStaysScreen