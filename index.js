const API_key = '9282dbb4277319a79bd6c35abc11187c';
let limit = 1;
const body = document.querySelector('body');

async function getWeather(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
    const response = await fetch(url);
    const data = await response.json();
    setColorPalette(data.weather[0].main);
    makeWeatherDiv(data);
}

function makeWeatherDiv(data) {
    const cityContainer = document.createElement('div');
    cityContainer.classList.add('weather-div');

    const cityName = document.createElement('p');
    cityName.textContent = `City: ${data.name}`;

    const weatherMain = document.createElement('p');
    weatherMain.textContent = `Weather: ${data.weather[0].main}`;

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.main.temp} K`; // Or use appropriate unit

    const pressure = document.createElement('p');
    pressure.textContent = `Pressure: ${data.main.pressure} hPa`;

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    cityContainer.appendChild(cityName);
    cityContainer.appendChild(weatherMain);
    cityContainer.appendChild(temperature);
    cityContainer.appendChild(pressure);
    cityContainer.appendChild(humidity);

    body.appendChild(cityContainer);
}


async function getLatLonForCity(cityName) {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_key}`;
    const response = await fetch(url);
    const data = await response.json();
    return {lat: data[0].lat, lon: data[0].lon};
}

function setColorPalette(condition) {
    console.log(condition);
    switch (condition) {
        case "Rain":
            body.className = "rain";
            break;
        case "Clear":
            body.className = "day";
            break;
        case "Clouds":
            body.className = "clouds";
            break;
        default:
            body.className = "";
            break;
    }
}

const form = document.querySelector('form');
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityNameInput = document.querySelector('#cityName');
    const cityName = cityNameInput.value.trim();
    if (cityName !== '') {
        const {lat, lon} = await getLatLonForCity(cityName);
        await getWeather(lat, lon);
    }
    event.target.reset();
});
