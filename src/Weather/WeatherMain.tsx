import axios from "axios";
import { useEffect, useState } from "react";

function WeatherMain() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState();
  const [icon, setIcon] = useState();
  //add wind kph, humidity %, pressure mb
  // API key = 040e5b45f5df423a94025839232706

  const cityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const callWeatherAPI = () => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=040e5b45f5df423a94025839232706&q=Singapore&aqi=no"
      )
      .then((resp) => {
        setTemperature(resp.data.current.temp_c);
        setIcon(resp.data.current.condition.icon);
        console.log("API was called");
      });
  };

  useEffect(() => {
    city === "Singapore" && callWeatherAPI();
  }, [city]);

  return (
    <div>
      <p>Find out the weather in:</p>
      <input value={city} onChange={cityInput} placeholder="Search for city" />
      <p>City demanded: {city}</p>
      <p>Temperature: {temperature}</p>
      <img src={icon}></img>
    </div>
  );
}

export default WeatherMain;
