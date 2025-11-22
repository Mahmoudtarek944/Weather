import { useEffect, useState } from "react";
import { getWeatherByCity } from "./service";
function App() {
  const [weather, setWeather] = useState(null); // to get Data
  const [city, setCity] = useState("Cairo");
  const [town, setTown] = useState(null); // to get the new town
  const [error, setError] = useState(null);
  useEffect(() => {
    getWeatherByCity(city).then((data) => {
      // becuase with start the app , show weather of cairo
      console.log(data);
      setWeather(data);
    });
  }, [city]);
  if (!weather) return <p className="text-center mt-4">Loading...</p>;
  return (
    <>
      <div className="container">
        <div className="vh-100 w-100 d-flex justify-content-center ">
          <div className="d-flex flex-column gap-3 shadow-lg  text-center my-5 rounded-3 p-4 weather-card">
            {error && <h3 className="text-danger mt-4">{error}</h3>}
            {!error && (
              <>
                <h2>Weather Today in {weather.name}</h2>
                <h1 className="fw-bold">{weather.main.temp}°C</h1>
              </>
            )}

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
                <i className="bi bi-cloud-fill fs-4"></i>
                <h4>Cloud</h4>
              </div>
              <p className="text-capitalize">
                {weather.weather[0].description}{" "}
              </p>
            </div>

            <form
              className="d-flex gap-2 flex-column align-items-center "
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const data = await getWeatherByCity(town);
                  if (data.cod === "404") {
                    setError("City Not Found");
                  } else {
                    setWeather(data);
                    setError(null);
                    setCity(town);
                  }
                } catch {
                  setError("Something went wrong");
                }
              }}
            >
              <div className="d-flex gap-2 justify-content-center">
                <label htmlFor="town" className="fw-medium fs-4">
                  Enter The Town
                </label>
                <input
                  type="text"
                  name="Cario"
                  id="twon"
                  onChange={(e) => {
                    setTown(e.target.value);
                  }}
                  className="p-1 rounded-2 border-0 text-black fw-medium w-50"
                />
              </div>
              <button className="btn-change border-0 px-3 py-2 rounded-3 fw-medium text-light">
                Get Weather
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
