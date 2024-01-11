import React from 'react'
import CongratsInner from "../Components/Congrats-Components/CongratsInner";
import Logo from "../images/logo.png"


const CongratsScreen = () => {
  return (
    <div className="h-screen w-screen">
      <div className='border-b-2 w-full h-10 md:h-20 px-10'>
          <img src={Logo} alt="" className="h-full w-40 object-contain" />
      </div>
        <CongratsInner />
    </div>
  )
}

export default CongratsScreen
