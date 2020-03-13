
const weather = document.querySelector(".js-weather");


const API_KEY = "ce75cbc37d44b467323333a9dfede76c"
const COORDS = 'coords';
function getIcon(){
    fetch(``)
}

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            const temp = json.main.temp;
            const temperature = temp.toFixed(1);
            const place = json.name;
            const weatherIcon = json.weather[0].icon;   
            const image = new Image();                
            const description = json.weather[0].description;    
            image.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;    
            image.classList.add("weatherIcon");              
            weather.innerText = `${temperature}°C  ${place} 
            ${description}`; 
            weather.before(image);
            
            
        })  
}



function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}




function init() {
    loadCoords();

}

init();