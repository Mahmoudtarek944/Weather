import axios from "axios";

const API_KEY = import.meta.env.VITE_MY_API_KAY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city) {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}
