import { useEffect, useState } from "react";
import { getWeatherByCity } from "./service";
function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeatherByCity("Cairo").then((data) => {
      // becuase with start the app , show weather of cairo
      console.log(data);
      setWeather(data);
    });
  }, []);
  if (!weather) return <p className="text-center">Loading...</p>;
  return (
    <>
      <div className="container">
        <div className="vh-100 w-100 d-flex justify-content-center ">
          <div className="d-flex flex-column gap-3 shadow-lg w-75 text-center my-5 rounded-3 p-4 weather-card">
            <h2>Weather Today in {weather.name} </h2>
            <h1 className="fw-bold">{weather.main.temp}°C</h1>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex gap-3">
                <i className="bi bi-thermometer-sun text-warning fs-4"></i>
                <h4>High / Low</h4>
              </div>
              <p>
                {weather.main.temp_max} / {weather.main.temp_min}
              </p>
            </div>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex gap-3">
                <i className="bi bi-wind text-secondary fs-4"></i>
                <h4>Wind</h4>
              </div>
              <p>NE {weather.wind.speed} mph</p>
            </div>
            <div className="d-flex justify-content-evenly">
              <div className="d-flex gap-3">
                <i class="bi bi-cloud-fill fs-4"></i>
                <h4>Cloud</h4>
              </div>
              <p className="text-capitalize">
                {weather.weather[0].description}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
