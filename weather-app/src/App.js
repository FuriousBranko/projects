import React, { useState } from "react";

const api = {
  key: "313a442631928f1bb0ac09657e1fed75",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      setLoading(true);
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setLoading(false);
          setNotFound(false);
          // console.log(result)
          if ( result.cod ==="404"){
            // console.log("its true");
            setNotFound(true);
          }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    switch (date) {
      case 1 || 21 || 31:
        date += "st";
        break;

      case 2 || 22:
        date += "nd";
        break;

      case 3 || 23:
        date += "rd";
        break;

      default:
        date += "th";
        break;
    }

    return `${day} ${date} ${month} ${year}`;
  };

  const weatherState = (condition) => {
    let state = "";
    let status = condition;
    switch (status) {
      case "Rain" || "Drizzle" || "Tunderstorm":
        state = "app rain";
        break;
      case "Snow":
        state = "app snow";
        break;
      default:
        state = "app sunny";
        break;
    }
    return `${state}`;
  };

  return (
    <div
      className={
        typeof weather.weather != "undefined"
          ? weatherState(weather.weather[0].main)
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter Location"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {loading ? (
          <div className="load">
            Loading...
          </div>
        ) : 
        typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>

              <div className="date">{dateBuilder(new Date())}</div>

              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>

                <div className="weather">{weather.weather[0].main}</div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        ) : notFound ? (
          <div className="found">
            Location not Found
          </div>) :(
          ""
        )}
      </main>
    </div>
  );
}

export default App;
