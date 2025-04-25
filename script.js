async function fetchWeather() {
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "cd8b565ddcc39b93b71b2dbcff92ec2f"; // 🛑 Replace this with your actual OpenWeatherMap API key
  
    if (searchInput == "") {
      weatherDataSection.innerHTML = `
        <div>
          <h2>Empty Input!</h2>
          <p>Please try again with a valid <u>city name</u>.</p>
        </div>
      `;
      return;
    }
  
    async function getLonAndLat() {
      const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")}&limit=1&appid=${apiKey}`;
  
      const response = await fetch(geocodeURL);
      if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
      }
  
      const data = await response.json();
  
      if (data.length == 0) {
        console.log("Something went wrong here.");
        weatherDataSection.innerHTML = `
          <div>
            <h2>Invalid Input: "${searchInput}"</h2>
            <p>Please try again with a valid <u>city name</u>.</p>
          </div>
        `;
        return;
      } else {
        return data[0];
      }
    }
  
    async function getWeatherData(lon, lat) {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
      const response = await fetch(weatherURL);
      if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
      }
  
      const data = await response.json();
  
      weatherDataSection.style.display = "flex";
      weatherDataSection.innerHTML = `
       <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" width="100" />

        <div>
          <h2>${data.name}</h2>
          <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
          <p><strong>Description:</strong> ${data.weather[0].description}</p>
        </div>
      `;
    }
  
    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
  
    if (geocodeData) {
      getWeatherData(geocodeData.lon, geocodeData.lat);
    }
  }
  