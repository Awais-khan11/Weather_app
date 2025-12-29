import React from 'react'

export const WeatherHeader = ({saveLocalStorage,weather,bookmark}) => {
  return (
    <div>


 <div className="content">
               <div style={{ display: "flex" }}>
                  <h1 style={{ color: 'white', fontSize: '50px' }}>{weather.city_name}</h1>
                  <img
                     src={bookmark}
                     alt=""
                     onClick={() => saveLocalStorage(weather.city_name)}
                     style={{
                        height: '50px',
                        marginTop: '30px',
                        filter: 'brightness(0) invert(1)'
                     }}
                  />
               </div>

               <span style={{ color: 'white' }}>overcast clouds</span>
               <div className='content-div'>
                  <span style={{ color: 'white' }}>{weather.tempreature}°C</span>
                  <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Cloudy" style={{ color: "white", height: '80px' }} />
               </div>
            </div>



    </div>
  )
}
