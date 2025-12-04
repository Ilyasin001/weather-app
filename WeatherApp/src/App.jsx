import { useState } from 'react'
import './App.css'

const api = {
  key: "ae657a09ca34013154f5e061ac26a02d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [city, setCity] = useState(0)

  const handleSearch = () => {
    console.log("Seaching for:", city)
    fetch(`${api.base}weather?q=London&appid=${api.key}`)
    .then(res => res.json())
    .then(city => console.log(city));

  }
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

        <div id="weatherResult"></div>
      </div>
    </>
  )
}

export default App