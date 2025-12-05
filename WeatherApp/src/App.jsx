// API KEY : ae657a09ca34013154f5e061ac26a02d

import "./App.css";
import { useState } from "react";

const api = {
  key: "ae657a09ca34013154f5e061ac26a02d", // API KEY
  geo: "https://api.openweathermap.org/geo/1.0/", // GEO API
  base: "https://api.openweathermap.org/data/2.5/", // WEATHER API
};

function App() {

  const [search, setSearch] = useState(""); // get and set the user input
  const [weather, setWeather] = useState(null); // get and set the data

  // async func to wait for full search
  const searchPressed = async () => {
    if (!search) return alert("Please enter a city.");

    try {
      // fetches geo api response
      const geoRes = await fetch(
        `${api.geo}direct?q=${encodeURIComponent(
          search
        )}&limit=1&appid=${api.key}`
      );
      // convert retrieved data into readable json format
      const geoData = await geoRes.json();
      // if geo returns null or returns nothing then alert 
      if (!geoData || geoData.length === 0) {
        alert("City not found. Please enter a valid city.");
        setWeather(null);
        return;
      }
      // reading and storing the data from json file 
      const { lat, lon, name, country } = geoData[0];
      // double check with fetch to ensure city is valid
      const weatherRes = await fetch(
        `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
      );
      // convert retrieved data into readable json format
      const weatherData = await weatherRes.json();

      weatherData.cityName = name;
      weatherData.country = country;

      setWeather(weatherData);
      console.log(weatherData);
      // error handling
    } catch (error) {
      alert("An error occurred. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        <div>
          <input
            type="text"
            placeholder="Enter city..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {weather && (
          <div>
            <h2>
              {weather.cityName}, {weather.country}
            </h2>

            <p>{weather.main.temp}°C</p>
            <p>{weather.main.humidity}g/m³</p>
            <p>{weather.wind.speed}mph</p>
              <p>{weather.wind.speed < 1 ? "Calm" : 
                weather.wind.speed < 3 ? "Light Air" : 
                weather.wind.speed < 7? "Light Breeze" :
                weather.wind.speed < 12? "Gentle Breeze" : "Moderate Breeze"}</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

