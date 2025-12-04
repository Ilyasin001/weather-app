import { useState } from 'react'
import './App.css'



function App() {
  const [city, setCity] = useState(0)

  const api = {
    key: "ae657a09ca34013154f5e061ac26a02d",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const handleSearch = () => {
    if (!city) return;

    fetch(`${api.base}weather?q=${encodeURIComponent(city)}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <div className ="container">
        <h1>Weather App</h1>

        <input 
          type="text" 
          id="searchInput" 
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button id="searchBtn" onClick = {handleSearch}>Search</button>

        <div id="weatherResult">
          <p>{city.name}</p>
        </div>
      </div>
    </>
  )
}

export default App
