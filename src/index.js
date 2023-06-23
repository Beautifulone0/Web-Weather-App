// the date function

let dateElement = document.getElementById("date");
function displayDate() {
  let dates = new Date();
  let day = dates.toLocaleDateString("en-NG", { weekday: "short" });
  let newDate = dates.getDate();
  let month = dates.toLocaleDateString("en-NG", { month: "long" });
  let year = dates.getFullYear();

  let newdateElement = `${day} ${newDate} ${month} ${year}`;

  dateElement.innerHTML = newdateElement;
}
displayDate();

//console.log(dateElement.innerHTML);


// the time function

let timeElement = document.getElementById("time");
function displayTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();

  let amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  let newTime = `${hours.toString().padStart(2, "0")} : ${minutes
    .toString()
    .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")} ${amOrPm}`;

  timeElement.innerHTML = newTime;
}
displayTime();

//console.log(timeElement.innerHTML);


// the function formating the time reponse gotten from the api to days

function formatDay (timestamp ) {
  let date = new Date(timestamp * 1000)
  
  let day = date.getDay()

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  
  return days[day]
}


// the function that shows the response of the forcast api

function forcast (response) {
  //console.log(response.data)
  //console.log(response.data.daily)
 

  let forcastElement = document.getElementById("forcast");

  let forcastHTML = `<div class="row">`
  //let days = ["Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
  let forcast = response.data.daily
  forcast.forEach(function (forcast, days) {
    if (days < 6) {
    forcastHTML = forcastHTML + `
    <div class="col-2">
     <div class="forcast-date">${formatDay(forcast.time)}</div>
       <img
       src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forcast.condition.icon}.png"
       alt=""
       width="42"
     />
     <div class="forecast-temperature">
        <span class="forecast-temperature-max"> ${Math.round(forcast.temperature.maximum)}° </span>
        <span class="forecast-temperature-min"> ${Math.round(forcast.temperature.minimum)}° </span>
     </div>
   </div>`
    }
  })

  forcastHTML = forcastHTML + `</div>`
  forcastElement.innerHTML = forcastHTML
  
}


// the function that gets the api response for the forcast

function getForcast (coord) {
 // console.log(coord)

  //let city = document.getElementById("myInput").value
  let apiKey = "a743dea4eaaa6e76b9b4f0ot4547fc65";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${coord}&lat=${coord.latitude}&lon=${coord.longitude}&key=${apiKey}`

  //console.log(apiUrl)

  axios.get(apiUrl).then(forcast)
}


// this function displays the current weather response from the api

function displayWeatherData (response) {
  console.log(response.data);
  
  let icon = response.data.condition.icon_url

  document.getElementById("name").innerHTML = response.data.city
  document.getElementById("temp").innerHTML = Math.round(response.data.temperature.current)
  document.getElementById("description").innerHTML = response.data.condition.description
  document.getElementById("humidity").innerHTML = Math.round(response.data.temperature.humidity)
  document.getElementById("wind").innerHTML =  Math.round(response.data.wind.speed)
  document.getElementById("country").innerHTML = response.data.country
  //document.getElementById("icon").setAttribute("src", icon)
  document.getElementById("icon").src = icon;

  // the ressignment of the celcius temperature
  celciusTemprature = response.data.temperature.current

  
  // this gets the co-ordinates for the getForcast function i.e the latitude and longitude
  getForcast(response.data.coordinates)

}


// this function gets the api response for the current weather data

function search (city) {
  let apiKey = "a743dea4eaaa6e76b9b4f0ot4547fc65";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherData)
}


// this function handles the sumbit event when the user inputs a value and clicks on search

function handleSubmit (event) {
  event.preventDefault();
  let city = document.getElementById("myInput").value
  search(city)
  
  
  // this sets the input fields to empty after the user clicks on search
  document.getElementById("myInput").value = ""
}

// the eventlistener for the submit function
let input = document.getElementById("city-input")
input.addEventListener("submit", handleSubmit )

search("abuja")

//getForcast("abuja")


// this function displays the current weather condition from the api response

function displayCurrentWeatherData (event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(currentTemperature)
}


// this function gets the api response for the current weather condition of the users location

function currentTemperature (position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let apiKey = "a743dea4eaaa6e76b9b4f0ot4547fc65";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherData)
}

// the eventlistener for when the current button is clicked and then it displays the current weather data of the users location
let currentLocation = document.getElementById("currentbtn")
currentLocation.addEventListener("click", displayCurrentWeatherData)


// this function is for the farenheit temperature conversion

function displayFahrenheitTemp (event) {
  event.preventDefault()
  
  let fahrenheitTemprature = (celciusTemprature * 9) / 5 + 32

  document.getElementById("temp").innerHTML = Math.round (fahrenheitTemprature)
}


// this function for change back to celcius
function displayCelciusTemp (event) {
  event.preventDefault()

  document.getElementById("temp").innerHTML = Math.round(celciusTemprature)
}

// had to set the variable celcius temperature to null to able to reassign it inside the display weather function
let celciusTemprature = null;

// the event listenner for the fahrenhiet link
let fahrenheitConversion = document.getElementById("fahrenheit-conversion")
fahrenheitConversion.addEventListener("click", displayFahrenheitTemp)

// the event listener for the celcius link
let celciusConversion = document.getElementById("celcius-conversion")
celciusConversion.addEventListener("click", displayCelciusTemp)