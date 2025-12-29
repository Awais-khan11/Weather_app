import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async ({ city, lat, lon }) => {
    let url = "";
   if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
    }
    const res = await fetch(url);
    const data = await res.json();
 setWeather({
      city_name: data.name,
      tempreature: data.main.temp,
      real_feel: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      Air_pressure: data.main.pressure,
      wind_degree: data.wind.deg,
      gust: data.wind.gust,
      icon: data.weather[0].icon,
      desc: data.weather[0].description,
    });
  };
const fetchForecast = async ({ city, lat, lon, days = 6 }) => {
    let url = "";

    if (city) {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    const daily = data.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, days)
      .map(item => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" }),
        temp: Math.round(item.main.temp),
        desc: item.weather[0].main,
        icon: item.weather[0].icon,
      }));

    setForecast(daily);
  };

  return (
    <WeatherContext.Provider value={{ weather, forecast, fetchWeather, fetchForecast }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
