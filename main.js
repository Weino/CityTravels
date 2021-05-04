window.onload = function() {
    const searchButton = document.querySelector(".searchButton");
	const searchBox = document.querySelector(".searchTerm")
    searchButton.addEventListener("click", () => {

	getWeather();
	const weatherReport = document.querySelector(".cityReport")
	weatherReport.style.display = "block"
})

async function getWeather() {
	let cityName = searchBox.value;
	let response = await fetch(                                                                             
	`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=34832f1e903a4e490cfc9a2d3fffea23`
	);

	if (response) {
	  let json = await response.json();
	  console.log(json);
	  getData(json);
	} else {
	  alert("Couldn't find that city.");
	}
  }
}	

function getData(json) {
	let city = document.querySelector("#city")
	let cityName = json.name
	city.innerHTML = cityName;

	let temp = document.querySelector("#temp")
	let tempNow = json.main.temp;
	temp.innerHTML = tempNow;

	let sky = document.querySelector("#skyStatus")
	let skyStatus = json.weather[0].description
	sky.innerHTML = skyStatus;
}

/*function getAttractions(){
	let cityName = searchBox.value;
	let response = await fetch(
	`																		`
	);

	if (response) {
	  let json = await response.json();
	  console.log(json);
	  getData(json);
	} else {
		alert("Couldn't find that city")
	}
}

function getData(json) {
	let attractions = document.querySelector("#attraction")
	let attractionsName = json.name
	attractions.innerHTML = attractionsName;
}*/
