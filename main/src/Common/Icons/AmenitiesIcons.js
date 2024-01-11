import React from 'react'


const Amenties = ({type})=>{
    switch(type){
        case 'lockers':
            return <i className="fas fa-key"></i>
        case 'wifi':
            return <i className="fas fa-wifi"></i>
        case 'air-conditioning':
            return <i className="fas fa-fan"></i>
        case 'tv':
            return <i className="fas fa-tv"></i>
        case '24/7 reception':
            return <i className="fas fa-concierge-bell"></i>
        case 'hot water':
            return <i className="fas fa-hot-tub"></i>
        case 'water dispenser':
            return <i className="fas fa-tint"></i>
        case 'cafe':
            return <i className="fas fa-utensils"></i>
        default:
            return <i className="fas fa-universal-access"></i>
    }
}

const AmenitiesIcons = ({type}) => {
  return (
    <>
    <Amenties type={type.toLowerCase()}/>
    </>
  )
}

export default AmenitiesIcons