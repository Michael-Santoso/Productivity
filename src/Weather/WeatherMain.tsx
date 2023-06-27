import axios from "axios";
import { useState } from "react";

function WeatherMain() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<any>();
  const [temperature, setTemperature] = useState<any>();
  const [icon, setIcon] = useState();
  const [error, setError] = useState("");
  //add wind kph, humidity %, pressure mb
  // API key = 040e5b45f5df423a94025839232706

  const cityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCity(inputValue);
    if (!inputValue) {
      setLocation(undefined);
      setTemperature(undefined);
      setIcon(undefined);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && city) {
      callWeatherAPI(city);
    }
  };

  const callWeatherAPI = (cityInput: string) => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=040e5b45f5df423a94025839232706&q=${cityInput}&aqi=no`
      )
      .then((resp) => {
        setLocation(resp.data.location);
        setTemperature(resp.data.current);
        setIcon(resp.data.current.condition.icon);
        console.log("API was called");
        console.log(location);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setError("Invalid input!");
      });
  };

  return (
    <div>
      <p>Find out the weather in:</p>
      <input
        value={city}
        onKeyUp={handleKeyPress}
        onChange={cityInput}
        placeholder="Search for city"
      />
      <button onClick={city ? () => callWeatherAPI(city) : undefined}>
        Submit
      </button>
      {location && (
        <p>{`Location: ${location?.name ?? "N/A"}, ${
          location?.country ?? "N/A"
        }`}</p>
      )}
      {temperature && (
        <div>
          <p>{`Temperature: ${temperature?.temp_c} °C`}</p>
          <p>{`Wind: ${temperature?.wind_kph} kph`}</p>
          <p>{`Humidity: ${temperature?.humidity} %`}</p>
          <p>{`Pressure: ${temperature?.pressure_mb} mb`}</p>
        </div>
      )}
      <img src={icon}></img>
      {error && <p>{error}</p>}
    </div>
  );
}

export default WeatherMain;
