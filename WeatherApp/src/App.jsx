// API KEY : ae657a09ca34013154f5e061ac26a02d

import "./App.css";
import { useState } from "react";

const api = {
  key: "ae657a09ca34013154f5e061ac26a02d",
  geo: "https://api.openweathermap.org/geo/1.0/",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);

  const searchPressed = async () => {
    if (!search) return alert("Please enter a city.");

    try {
      const geoRes = await fetch(
        `${api.geo}direct?q=${encodeURIComponent(
          search
        )}&limit=1&appid=${api.key}`
      );
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        alert("City not found. Please enter a valid city.");
        setWeather(null);
        return;
      }

      const { lat, lon, name, country } = geoData[0];

      const weatherRes = await fetch(
        `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
      );
      const weatherData = await weatherRes.json();

      weatherData.cityName = name;
      weatherData.country = country;

      setWeather(weatherData);
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
            <p>
              {weather.cityName}, {weather.country}
            </p>

            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

