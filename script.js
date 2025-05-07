const CitiesCoords = {
  zurich: {name: "zurich", lat: "47.3667", long: "8.55" },
  bern: { name: "bern", lat: "46.9481", long: "7.4474" },
  geneva: { name: "geneva", lat: "46.2044", long: "6.1432" }
}


async function getWeatherData(lat, long, cityName) {
  
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    const temperatureNow = json.hourly.temperature_2m[12];
    const timeNow = json.hourly.time[12]
    
    console.log(json);
    console.log(cityName, timeNow)
    console.log(cityName, json.hourly.temperature_2m[12]);

    renderWeather( cityName, timeNow, temperatureNow )
    /* return json; */
    
  } catch (error) {
    console.error(`Could not fetch weather data for ${cityName}:`, error);
    return null;
  }
};


document.getElementById("zurich").addEventListener("click", () => {
  const city = CitiesCoords.zurich;
  getWeatherData(city.lat, city.long, city.name);
});

document.getElementById("bern").addEventListener("click", () => {
  const city = CitiesCoords.bern;
  getWeatherData(city.lat, city.long, city.name);
});

document.getElementById("geneva").addEventListener("click", () => {
  const city = CitiesCoords.geneva;
  getWeatherData(city.lat, city.long, city.name);
});


async function renderWeather( cityName, time, temperature ) {
  const dataDiv = document.getElementById(`${cityName}_data`);
  if (!dataDiv) return;

  let h2Tag = document.createElement("h2");
  let pTag = document.createElement("p");
  let p2Tag = document.createElement("p");

  h2Tag.textContent = cityName;
  pTag.textContent = time;
  p2Tag.textContent = temperature;

  dataDiv.append(h2Tag, pTag, p2Tag);
}


