const API_key = '9282dbb4277319a79bd6c35abc11187c'
let cityName = 'Astana'
let limit = 1
async function getWeather(lat,lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    console.log(data)
}

async function getLetLatForCity(){
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_key}`
    const response = await fetch(url)
    const data = await response.json()
    getWeather(data[0]['lat'],data[0]['lon'])
}


getLetLatForCity()