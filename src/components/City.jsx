import React, { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import './Dashboard.css'
import './City.css'



export const City = () => {

  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");



  useEffect(() => {
    const storedcities = JSON.parse(localStorage.getItem("cities")) || [];
    setCities(storedcities);
  }, []);

  const handledelete = (cityToDelete) => {
    const updatedCities = cities.filter((city) => city !== cityToDelete);
    setCities(updatedCities);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
  }

  const fetchWeatherByCity = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    );
    const data = await res.json();

    setWeather({
      city: data.name,
      temp: Math.round(data.main.temp),
      desc: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  };

  const fetchForecastByCity = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    );
    const data = await res.json();

    const daily = data.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3)
      .map(item => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" }),
        temp: Math.round(item.main.temp),
        desc: item.weather[0].main,
        icon: item.weather[0].icon,
      }));

    setForecast(daily);
  };

  return (
    <>
      <div className="app">

        <Sidebar></Sidebar>
        <div style={{ color: 'white' }}>

          {/* // COntent for Home Page */}
          <div className="input input-section">
            <input disabled type="text" placeholder='See Deafult city...' />

          </div>
          {/* //Display input data] */}
          {cities.map((city, index) => {
            return (

              <div className='display_data'>
                <span>{city}</span>
                <div className="display-buttons">
                  <button onClick={() => {
                    setSelectedCity(city);
                    fetchWeatherByCity(city);
                    fetchForecastByCity(city);
                  }} className='details-button'> Details</button>
                  <button onClick={() => handledelete(city)} className='delete-button'>Delete</button>
                </div>

              </div>
            )
          })}
        </div>

        {weather && (
          <div className="mtwc-card">
            <div className="mtwc-header">
              <h2 className="mtwc-city-name">{weather.city}</h2>
              <div className="mtwc-current-info">
                <p className="mtwc-condition">{weather.desc}</p>
                <p className="mtwc-temperature">{weather.temp}°C</p>
              </div>
            </div>

            <div className="mtwc-cloud-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt=""
              />
            </div>

            <p className="mtwc-forecast-title">3 Days Forecast</p>

            <ul className="mtwc-forecast-list">
              {forecast.map((day, index) => (
                <li className="mtwc-forecast-item" key={index}>
                  <span className="mtwc-day">{day.day}</span>
                  <div className="mtwc-weather-desc">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                      alt=""
                    />
                    <span>{day.desc}</span>
                  </div>
                  <span className="mtwc-temp">{day.temp}°C</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
