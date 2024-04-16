const API_key = '9282dbb4277319a79bd6c35abc11187c'
async function getWeather(){
    let url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_key}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data['city']['name'])
    console.log(data['list'][0]['main'])
}



getWeather()