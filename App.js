import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "fdf3cd91a08ab852111d1fc41b9648fd"; //API Key

  function getWeather() {
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === 200) {
          setWeather({
            name: data.name,
            description: data.weather[0].description,
            temp: data.main.temp,
            icon: data.weather[0].icon,
          });
        } else {
          setWeather(null);
          alert("❌ City not found!");
        }
      })
      .catch(error => {
        console.error("Error fetching weather:", error);
      });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>Weather App</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        style={{ padding: "8px", borderRadius: "5px", marginRight: "10px" }}
      />
      <button
        onClick={getWeather}
        style={{ padding: "8px 12px", borderRadius: "5px", background: "#007bff", color: "white" }}
      >
        Get Weather
      </button>

      {weather && (
        <div style={{ marginTop: "20px", padding: "20px", background: "#f1f1f1", borderRadius: "10px", display: "inline-block" }}>
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather icon" />
          <h2>{weather.name}</h2>
          <p>{weather.description}</p>
          <h3>{weather.temp}°C</h3>
        </div>
      )}
    </div>
  );
}

export default App;
