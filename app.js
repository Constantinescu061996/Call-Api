        
// select elements
var notificationElement =document.querySelector(".notification");
var iconElement =document.querySelector(".weather-icons");
var tempElement =document.querySelector(".temperature-value  p");
var descElement =document.querySelector(".temperature-description p");
var locationElement =document.querySelector(".location p");

var weather = {};

weather.temperature = {
    unit: "celsius"
}





if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,ShowError);
    
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p> Something it's wrong!</p>"
}

function setPosition(position){
    console.log(position);
    var latitude = position.coords.latitude;
    console.log(latitude);
    var longitude = position.coords.longitude;
    console.log(longitude);
   
    getWeather(latitude,longitude);
}

function ShowError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude){
    var api = `http://api.weatherstack.com/current?access_key=5f02bb673cd9623370ab632082700f22&query=${latitude},${longitude}`
    
    fetch(api)
        .then(function(response){
            var data = response.json();
            return data;
        })
        .then(function(data){
        console.log(data);
            weather.temperature.value = data.current.temperature ;
            weather.description = data.current.weather_descriptions[0];
            weather.city = data.location.region;
            weather.country = data.location.country;
            weather.iconId = data.current.weather_icons[0];
        })
        .then(function(){
            displayWeather();
        });
}


function displayWeather(){
console.log("Am intrat")
    iconElement.innerHTML  =`<img 
    src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
    />`
    
    
    tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
    
    descElement.innerHTML = weather.description;
    
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};

function celsiusInFahrenheit( temperature){
 
    return (temperature *9/5) +32;
}

tempElement.addEventListener("click",function(){
    
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === "celsius"){
        var fahrenheit = celsiusInFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit} ° <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
        
    }else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
        weather.temperature.unit = "celsius";
    }
    


});