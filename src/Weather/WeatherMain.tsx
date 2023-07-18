import axios from "axios";
import { useState } from "react";
import "./weather.css";
import search from "./search.svg";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

export function WeatherMain() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<any>();
  const [temperature, setTemperature] = useState<any>();
  const [icon, setIcon] = useState();
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState<any[]>();
  const [searchbarResults, setSearchbarResults] = useState<any[]>([]);
  //add wind kph, humidity %, pressure mb
  // API key = 040e5b45f5df423a94025839232706

  const [selected, setSelected] = useState<any>(null);
  const toggle = (i: number) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const cityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCity(inputValue);
    if (!inputValue) {
      setLocation(undefined);
      setTemperature(undefined);
      setIcon(undefined);
      setForecast(undefined);
      setError("");
    }
  };

  const cityInput2 = (inputValue: string) => {
    setCity(inputValue);
    if (!inputValue) {
      setLocation(undefined);
      setTemperature(undefined);
      setIcon(undefined);
      setForecast(undefined);
      setError("");
    }
  };

  const cityInput3 = (inputValue: string) => {
    cityInput2(inputValue);
    callWeatherAPI(city);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && city) {
      callWeatherAPI(city);
    }
  };

  // const handleOnChange = (event: String | null) => {
  //   const searchData = (event as String).valueOf;
  //   setCity(searchData);
  // };

  // const loadOptions = (inputValue: any) => {
  //   axios
  //     .get(
  //       `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${inputValue}`,
  //       options
  //     )
  //     .then((resp) => {
  //       console.log(resp.data);
  //       return {
  //         options: resp.data.map((city: any) => {
  //           return {
  //             value: `${city.latitude} ${city.longitude}`,
  //             label: `${city.name}, ${city.countryCode}`,
  //           };
  //         }),
  //       };
  //     });
  // };

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "4ff2dd3d59mshd99e20ba1f97cd6p1e25aejsn0569aebb7dcc",
  //     "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  //   },
  // };

  const callWeatherAPI = (cityInput: string) => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=040e5b45f5df423a94025839232706&q=${cityInput}&days=7&aqi=no&alerts=no`
      )
      .then((resp) => {
        setLocation(resp.data.location);
        setTemperature(resp.data.current);
        setIcon(resp.data.current.condition.icon);
        setForecast(resp.data.forecast.forecastday);
        setError("");
        console.log("API was called");
        console.log(location);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setError("Invalid input!");
      });
  };

  return (
    <div className="container">
      <div className="weather-search">
        <div className="search-submit">
          <input
            value={city}
            onKeyUp={handleKeyPress}
            onChange={cityInput}
            placeholder="Search for city weather"
            className="search-instruction input-field"
          />
          <button
            onClick={city ? () => callWeatherAPI(city) : undefined}
            className="search-button"
          >
            <img src={search} className="search"></img>
          </button>
        </div>
        <div className="searchbar-container">
          <SearchBar
            setSearchbarResults={setSearchbarResults}
            handleKeyPress={handleKeyPress}
            cityInput2={cityInput2}
          ></SearchBar>
          <SearchResultsList
            searchbarResults={searchbarResults}
            cityInput3={cityInput3}
          />
        </div>
      </div>
      <div className="wrapper-weather-card">
        <div className={temperature ? "weather-card" : "weather-card-empty"}>
          {location && (
            <p className="location">{`${location?.name ?? "N/A"}, ${
              location?.country ?? "N/A"
            }`}</p>
          )}
          {temperature && (
            <div className="celcius">
              <p>{`${temperature?.temp_c.toFixed(0)}°C`}</p>
            </div>
          )}
          {temperature && (
            <div className="temperature">
              <p className="condition-text">{`${temperature?.condition.text}`}</p>
              <p>{`Temperature: ${temperature?.temp_c} °C`}</p>
              <p>{`Wind: ${temperature?.wind_kph} kph`}</p>
              <p>{`Humidity: ${temperature?.humidity} %`}</p>
              <p>{`Pressure: ${temperature?.pressure_mb} mb`}</p>
            </div>
          )}
          <div className="icon-container">
            <img src={icon} className="icon"></img>
          </div>
          {error && <h2>{error}</h2>}
        </div>
      </div>
      <div className="accordion-container">
        {forecast && <p className="dailyforecasttitle">Daily Forecast</p>}
        <div className="accordion">
          {forecast &&
            forecast.map((day, i) => (
              <div>
                <div className="title" onClick={() => toggle(i)}>
                  <div className="daysforecasted">
                    <img className="icon2" src={day.day.condition.icon}></img>
                    <p className="daily-text">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="daily-text">{`${day.day.condition.text}`}</p>
                    <p className="daily-text">{`${day.day.avgtemp_c} °C`}</p>
                  </div>
                </div>
                <div className={selected == i ? "content.show" : "content"}>
                  <div>
                    {day.hour
                      .filter((_hour: any, i: any) => i % 3 === 0)
                      .map((hour: any, i: any) => (
                        <div className="hourforecasted" key={i}>
                          <p>{`${hour.time.substring(11, 16)}`}</p>
                          <p>{`${hour.condition.text}`}</p>
                          <p>{`${hour.temp_c}°C (feels like ${hour.feelslike_c}°C)`}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherMain;
