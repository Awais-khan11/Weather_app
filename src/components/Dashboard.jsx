import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Sidebar } from './Sidebar'
import searchIcon from '../assets/target.png'
import bookmark from '../assets/Bookmark.png'
import cloud from '../assets/cloud.png'


export const Dashboard = () => {

   const [data, setData] = useState({});
   const [inputCity, setInputCity] = useState("");
   const [forecast, setForecast] = useState([]);
   

   const search = async (city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      

      setData({
         tempreature: data.main.temp,
         humidity: data.main.humidity,
         windSpeed: data.wind.speed,
         temp_min: data.main.temp_min,
         temp_max: data.main.temp_max,
         Air_pressure: data.main.pressure,
         wind_degree: data.wind.deg,
         gust: data.wind.gust,
         city_name: data.name,
         real_feel: data.main.feels_like,
         icon: data.weather[0].icon,

      });
      // saveCity(data.name);
   };

   const fetchByLocation = async (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      setData({
         tempreature: data.main.temp,
         humidity: data.main.humidity,
         windSpeed: data.wind.speed,
         temp_min: data.main.temp_min,
         temp_max: data.main.temp_max,
         Air_pressure: data.main.pressure,
         wind_degree: data.wind.deg,
         gust: data.wind.gust,
         city_name: data.name,
         real_feel: data.main.feels_like,
         icon: data.weather[0].icon,
      });
      // saveCity(data.name);
   };

   const fetchForecastByCity = async (city) => {

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();


      console.log("fetch forecast by city", data);

      const dailyData = data.list.filter(item =>
         item.dt_txt.includes("12:00:00")
      );

      const processedData = dailyData.slice(0, 6).map(item => ({
         day: new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
         }),
         temp: Math.round(item.main.temp),
         icon: item.weather[0].icon,
         desc: item.weather[0].main,
      }));

      // 3️⃣ update state
      setForecast(processedData);
   };

   const fetchForecastByLocation = async (lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      // 1️⃣ filter (1 record per day)
      const dailyData = data.list.filter(item =>
         item.dt_txt.includes("12:00:00")
      );

      // 2️⃣ process data (ready for UI)
      const processedData = dailyData.slice(0, 6).map(item => ({
         day: new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "long",
         }),
         temp: Math.round(item.main.temp),
         icon: item.weather[0].icon,
         desc: item.weather[0].main,
      }));

      // 3️⃣ update state
      setForecast(processedData);
   };


function goToCurrentLocation() {

  navigator.geolocation.getCurrentPosition(
   (position) => {
      const { latitude, longitude } = position.coords;
      fetchByLocation(latitude, longitude);
      fetchForecastByLocation(latitude, longitude);

      setInputCity("");
   },
   (error) => {
      console.error("Error getting location:", error);
   }
  )


}

function saveLocalStorage(cityName) {
   if (!cityName) return;

   const storedcities = JSON.parse(localStorage.getItem("cities")) || [];

   if (!storedcities.includes(cityName)) {
      storedcities.push(cityName);
      localStorage.setItem("cities", JSON.stringify(storedcities));
   }
   alert(`${cityName} Location saved!`);
}








   useEffect(() => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const { latitude, longitude } = position.coords;
            fetchByLocation(latitude, longitude);
            fetchForecastByLocation(latitude, longitude);
         },
         () => {
            setInputCity("New York"); // 👈 debounce se hi call ho
            fetchForecastByCity("New York");
         }
      );
   }, []);





   useEffect(() => {
      if (!inputCity) return;
      const timer = setTimeout(() => {
         search(inputCity || "New York");
         fetchForecastByCity(inputCity);
      }, 1000); // 1 second debounce

      return () => clearTimeout(timer);
   }, [inputCity]);

   return (
      <div className="app">
         <Sidebar></Sidebar> 


         <div className="main">
            <div className="input">
               <input onChange={(e) => setInputCity(e.target.value)} value={inputCity} type="text" placeholder='Enter your city...' />
               <img onClick={goToCurrentLocation}  src={searchIcon} alt="Focus" style={{
                  height: '50px', marginTop: '30px'
                  , marginLeft: '10px', cursor: 'pointer', filter: 'invert(1)'
               }} />
            </div>
            {/* Content for main */}
            <div className="content">
               <div style={{ display: "flex" }}>
                  <h1 style={{ color: 'white', fontSize: '50px' }}>{data.city_name}</h1>
                  <img
                     src={bookmark}
                     alt=""
                     onClick={()=>saveLocalStorage(data.city_name)}
                     style={{
                        height: '50px',
                        marginTop: '30px',
                        filter: 'brightness(0) invert(1)'
                     }}
                  /> 
               </div>

               <span style={{ color: 'white' }}>overcast clouds</span>
               <div className='content-div'>
                  <span style={{ color: 'white' }}>{data.tempreature}°C</span>
                  <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}  alt="Cloudy" style={{ color: "white", height: '80px' }} />
               </div>
            </div>  
            {/* Important Information Block */}
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

                           <span className="value">{data.real_feel}°C</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💧</span>
                              <span>Humidity</span>
                           </div>

                           <span className="value">{data.humidity}%</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💨</span>
                              <span>WindSpeed</span>
                           </div>

                           <span className="value">{data.windSpeed}</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">🌡️</span>
                              <span>Temp Min</span>
                           </div>

                           <span className="value">{data.temp_min}°C</span>
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

                           <span className="value">{data.Air_pressure}</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💨</span>
                              <span>Wind Degree</span>
                           </div>

                           <span className="value">{data.wind_degree}</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">🌡️</span>
                              <span>Temp Max</span>
                           </div>

                           <span className="value">{data.temp_max}°C</span>
                        </div>

                     </div>
                     <div className="row">
                        <div className="label">
                           <div>
                              <span className="icon">💨</span>
                              <span>Gust</span>
                           </div>

                           <span className="value">{data.gust || 0}</span>
                        </div>

                     </div>
                  </div>
               </div>
            </div>

         </div>




         {/* <!-- 6 Days Forecast Block --> */}
        
        <div className="forecast-block">
            <h3 className="forecast-title">6 Days Forecast</h3>
            <div className="forecast-list">
               {/* <!-- Day 1 --> */}

               <div className="forecast-list">
                  {forecast.map((day, index) => (
                     <div className="forecast-day" key={index}>
                        <span className="day-name">{day.day}</span>

                        <img
                           src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                           alt="weather"
                           className="weather-icon"
                        />

                        <span className="weather-desc">{day.desc}</span>

                        <span className="temp">{day.temp}°C</span>
                     </div>
                  ))}
               </div>




            </div>
         </div>
    


      </div>
   )
}
