import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const api = {
  key: "ae657a09ca34013154f5e061ac26a02d",
  base: "https://api.openweathermap.org/data/2.5/"
}

fetch(`${api.base}weather?q=London&appid=${api.key}`)
  .then(res => res.json())
  .then(data => console.log(data));

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="container">
        <h1>Weather App</h1>

        <input 
          type="text" 
          id="searchInput" 
          placeholder="Enter a city..."
        />

        <button id="searchBtn">Search</button>

        <div id="weatherResult"></div>
      </div>
    </>
  )
}

export default App
