import React, { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherList from "./components/WeatherList";

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("https://data-project-u7dj.onrender.com/weather");
    const data = await res.json();
    setWeatherData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🌤 Weather Dashboard</h2>
      <WeatherForm onFetch={fetchData} />
      <WeatherList data={weatherData} />
    </div>
  );
}

export default App;
