import React from 'react'
import './Dashboard.css'
import searchIcon from '../assets/target.png'

export const SearchBar = ({setInputCity,inputCity,goToCurrentLocation}) => {
  return (
    <div>


 <div className="input">
               <input onChange={(e) => setInputCity(e.target.value)} value={inputCity} type="text" placeholder='Enter your city...' />
               <img onClick={goToCurrentLocation} src={searchIcon} alt="Focus" style={{
                  height: '50px', marginTop: '30px'
                  , marginLeft: '10px', cursor: 'pointer', filter: 'invert(1)'
               }} />
            </div>



        
    </div>
  )
}
