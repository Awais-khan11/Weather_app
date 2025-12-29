import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Sidebar } from './Sidebar'

import bookmark from '../assets/Bookmark.png'
import cloud from '../assets/cloud.png'
import { useWeather } from '../context/WeatherContext'
import { SixDaysForecast } from './SixDaysForecast'
import { SearchBar } from './SearchBar'
import { WeatherHeader } from './WeatherHeader'
import ImportantInfo from './ImportantInfo'


export const Dashboard = () => {

   const { weather, forecast, fetchWeather, fetchForecast } = useWeather();
   const [inputCity, setInputCity] = useState("");

   function goToCurrentLocation() {

      navigator.geolocation.getCurrentPosition(
         (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather({ lat: latitude, lon: longitude });
            fetchForecast({ lat: latitude, lon: longitude, days: 6 });
            setInputCity("");
         },
         (error) => {
            console.error("Error getting location:", error);
         }
      )}

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
          fetchWeather({ lat: latitude, lon: longitude });
          fetchForecast({ lat: latitude, lon: longitude, days: 6 });
         },
         () => {
           setInputCity("New York");
           fetchWeather({ city: "New York" });
           fetchForecast({ city: "New York", days: 6 });
         }
      );
   }, []);

useEffect(() => {
      if (!inputCity) return;
      const timer = setTimeout(() => {
          fetchWeather({ city: inputCity });
          fetchForecast({ city: inputCity, days: 6 });
      }, 1000); 

      return () => clearTimeout(timer);
   }, [inputCity]);

   return (
      <div className="app">
         <Sidebar></Sidebar>


         <div className="main">
             <SearchBar 
             inputCity={inputCity}
             setInputCity={setInputCity}
             goToCurrentLocation={goToCurrentLocation}
              />
             <WeatherHeader
            saveLocalStorage={saveLocalStorage}
            weather={weather}
            bookmark={bookmark}
           />
           <ImportantInfo
            weather={weather}
            />
</div>
     {/* <!-- 6 Days Forecast Block --> */}
<SixDaysForecast></SixDaysForecast>

      </div>
   )
}
