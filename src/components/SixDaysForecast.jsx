import React from "react";
import "./Dashboard.css";
import { useWeather } from "../context/WeatherContext";

export const SixDaysForecast = () => {
  const { forecast } = useWeather();

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-block">
      <h3 className="forecast-title">6 Days Forecast</h3>

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
  );
};

