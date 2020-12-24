import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "antd/dist/antd.css";

import "./App.css";

import { Divider, message } from "antd";
import Search from "antd/lib/input/Search";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const search = async () => {
    if (city === "") {
      message.warning("Please provide city name!");
    } else {
      try {
        const data = await fetchWeather(city);
        console.log(data);
        setWeather(data);
        setCity("");
      } catch (error) {
        message.error("Please provide valid city name!");
      }
    }
  };

  return (
    <div className="main-container">
      <Search
        className="search"
        placeholder="input search text"
        onSearch={search}
        value={city}
        enterButton
        onChange={(e) => setCity(e.target.value)}
        style={{ width: 410, padding: "20px" }}
      />

      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <Divider />

          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h2 className="desc">{weather.weather[0].description}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
