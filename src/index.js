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

console.log(dateElement.innerHTML);

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

console.log(timeElement.innerHTML);


function displayWeatherData (response) {
  console.log(response.data);
  
  document.getElementById("name").innerHTML = response.data.name
  document.getElementById("temp").innerHTML = Math.round(response.data.main.temp)
  document.getElementById("description").innerHTML = response.data.weather[0].description
  document.getElementById("humidity").innerHTML = Math.round(response.data.main.humidity)
  document.getElementById("wind").innerHTML =  Math.round(response.data.wind.speed)
}

function search (city) {
  let apiKey = "58b20ee9867491dff42b6ad07610b935";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherData)
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.getElementById("myInput").value
  search(city)
}


let input = document.getElementById("city-input")
input.addEventListener("submit", handleSubmit )

search("abuja")


function displayCurrentWeatherData (event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(currentTemperature)
}

function currentTemperature (position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let apiKey = "58b20ee9867491dff42b6ad07610b935";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherData)
}

let currentLocation = document.getElementById("currentbtn")
currentLocation.addEventListener("click", displayCurrentWeatherData)