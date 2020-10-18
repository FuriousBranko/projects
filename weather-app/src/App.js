import React from 'react';

const api = {
  key: "313a442631928f1bb0ac09657e1fed75",
  base: "https://api.openweathermap.org/data/2.5"
};

function App() {

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "August", "September",
  "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    switch (date) {
      case 1 || 21 || 31:
        date+= "st";
        break;

      case 2 || 22:
        date+= "nd";
        break;

      case 3 || 23:
        date+= "rd";
        break;
    
      default:
        date+= "th";
        break;
    }

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Enter Location"/>
        </div>
        <div className="location-box">
          <div className="location">
            
          </div>

          <div className="date">
            {dateBuilder(new Date())}
          </div>

          <div className="weather-box">
            <div className="temp">
              5°cs
            </div>

          <div className="weather">
            Sunny
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
