import React from 'react'
import './Dashboard.css'



const ImportantInfo = ({weather}) => {
  return (
    <div>

<div className="info-block">
               <h3>Important Information</h3>
               <div className="grid">
                  <div className="column1">
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">🌡️</span>
                              <span >Real Feel</span>
                           </div>

                           <span className="value">{weather.real_feel}°C</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💧</span>
                              <span>Humidity</span>
                           </div>

                           <span className="value">{weather.humidity}%</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💨</span>
                              <span>WindSpeed</span>
                           </div>

                           <span className="value">{weather.windSpeed}</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">🌡️</span>
                              <span>Temp Min</span>
                           </div>

                           <span className="value">{weather.temp_min}°C</span>
                        </div>

                     </div>
                  </div>

                  <div className="column2">
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">🌬️</span>
                              <span>Air Pressure</span>
                           </div>

                           <span className="value">{weather.Air_pressure}</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💨</span>
                              <span>Wind Degree</span>
                           </div>

                           <span className="value">{weather.wind_degree}</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">🌡️</span>
                              <span>Temp Max</span>
                           </div>

                           <span className="value">{weather.temp_max}°C</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💨</span>
                              <span>Gust</span>
                           </div>

                           <span className="value">{weather.gust || 0}</span>
                        </div>

                     </div>
                  </div>
               </div>
            </div>



    </div>
  )
}

export default ImportantInfo