import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setError("");
      const response = await axios.get("https://weather-app-yxe1.onrender.com/weather", {
        params: { city },
      });
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError("unable to retrieve data, ensure city is valid");
    }
  };

  function showPopUp() {
    var popup = document.getElementById("popUp");
    popup.classList.toggle("show");
  }

  return (
    <body>
      <div id="App">
        <h1>Weather App</h1>
        <div id="input">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
          />
          <button onClick={getWeather}>Get Weather</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div id="text">
          {weather && (
            <div>
              <h2>Weather in {weather.name}</h2>
              <p>Temperature: {weather.main.temp}C</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
        </div>

        <footer>
          <p>Created by Ricardo Cardenas</p>
          <div class="popup" onClick={showPopUp}>
            Info
            <span class="popuptext" id="popUp">
              The Product Manager Accelerator Program is designed to support PM
              professionals through every stage of their careers. From students
              looking for entry-level jobs to Directors looking to take on a
              leadership role, our program has helped over hundreds of students
              fulfill their career aspirations.
            </span>
          </div>
        </footer>
    </body>
  );
}

export default App;
