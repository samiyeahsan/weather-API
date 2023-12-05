
function getLatandLon(cityName) {
  
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=ed30da8b7e6b64e1e30ec66b1dc30a37&units=imperial")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      


      console.log(data)
      let lat = data.coord.lat
      let lon = data.coord.lon
      getForecast(lat, lon)
      document.getElementById("name").textContent = "City: " + data.name
      document.getElementById("temp").textContent = "Tempture: " + data.main.temp
      document.getElementById("wind").textContent = "Wind: " + data.wind.speed
      document.getElementById("humidity").textContent = "Humidity: " + data.main.humidity
      storeSearch(data.name)
    });
}




async function getForecast(lat, lon) {
  const resp = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=ed30da8b7e6b64e1e30ec66b1dc30a37&units=imperial")
  const data = await resp.json();
  console.log(data)
  document.getElementById("boxes").innerHTML = ""
  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.includes("12:00:00")) {
      let card = document.createElement("div")
      card.setAttribute("class", "col card")
      let cardBody = document.createElement("div")
      cardBody.setAttribute("class", "card-body")
      let date = document.createElement("p")
      date.textContent = new Date(data.list[i].dt * 1000).toLocaleDateString()
      let temp = document.createElement("p")
      temp.textContent = "Tempture: " + data.list[i].main.temp
      let wind = document.createElement("p")
      wind.textContent = "Wind: " + data.list[i].wind.speed
      let humidity = document.createElement("p")
      humidity.textContent = "Humidity: " + data.list[i].main.humidity

      cardBody.append(date, temp, wind, humidity)
      card.append(cardBody)
      document.getElementById("boxes").append(card)
    }
  }


}

function storeSearch(city) {
  var history = JSON.parse(localStorage.getItem("weatherHistory")) || []
  if (history.length === 0 || !history.includes(city)){

    history.push(city)
    localStorage.setItem("weatherHistory", JSON.stringify(history))
    loadSearches()
  }
}
function loadSearches() {
  document.getElementById("city-list").innerHTML = ""
  var history = JSON.parse(localStorage.getItem("weatherHistory")) || []

  for (var i = 0; i < history.length; i++) {

    let card = document.createElement("li")
    card.setAttribute("class", "list-group-item")
    card.textContent = history[i]
    card.onclick = search
    document.getElementById("city-list").append(card)

  }
}
function search() {
  console.log(this)
  getLatandLon(this.textContent)

}


document.getElementById("searchbtn").addEventListener("click", function (event) {
  event.preventDefault()
  var city = document.getElementById('searchInput').value
  console.log(city);
  getLatandLon(city)
});

loadSearches()