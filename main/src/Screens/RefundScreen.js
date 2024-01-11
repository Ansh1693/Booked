import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import RefundCompo from '../Components/Refund/RefundCompo'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Logo from "../images/logo.png"

const RefundScreen = () => {
  const history = useHistory()
  return (
    <div className='h-screen w-screen'>
        <div className='border-b-2 w-full h-10 md:h-20 px-10 cursor-pointer' onClick={()=> history.push('/')}>
          <img src={Logo} alt="" className="h-full w-40 object-contain" />
      </div>
      <RefundCompo />
        
    </div>
  )
}

export default RefundScreen