	//min sökfunktion 
	window.onload = function() {
    const searchButton = document.querySelector(".searchButton");
	const searchBox = document.querySelector(".searchTerm")
    searchButton.addEventListener("click", () => {
		let searchTerm = searchBox.value;
		getWeather(searchTerm);	
		getAttractions(searchTerm);
		const weatherReport = document.querySelector(".cityReport")
		weatherReport.style.display = "block"
	}
)	


//Här hämtar jag in API:et och försöker kommunicera med API sidan och skickar requests till den
//Fetchar även mitt API call här
// Vilka bitar i en fetch styr vad? :Beroende på vad jag skriver i inputen "Cityname" så kommer det hämtas olika objekt med hjälp fetch
// Vart kommer svaret tillbaka? : i response variablen kommer svaret tillbaka från API anropet
async function getWeather(cityName) {
	let response = await fetch(                                                                             
	`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=34832f1e903a4e490cfc9a2d3fffea23`
	);
	if (response) {
	  let json = await response.json();
	  console.log(json);
	  loadWeatherData(json);
	  //error om den staden inte finns
	} else {
	  alert("Couldn't find that city.");
	}
  }
}	

//  Hur gör du för att tolka svaret?: Denna funktion tolkar svaret jag får från mitt API och blir till det man ser på hemsidan och det man söker efter
function loadWeatherData(json) {
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

//funktion för API call till Foursquare
// Här skickas HTTP requesten iväg
async function getAttractions(cityName){
	const clientID = "LCMY5F0SQZAV0S3OKB4K2SGI3K0I10QAZRRS4ARZFVVKJS2Y";
	const clientSecret = "VFQ22BGXI43I5FHBLZSE5SOM1XWDKGOMMEMIO0L1UMDS5PY5";
	let baseURL = "https://api.foursquare.com/v2/venues/explore";
	let url = new URL(baseURL);
	let params = url.searchParams;
    params.append("client_id", clientID);
	params.append("client_secret", clientSecret);
	params.append("v", "20180323");
	params.append("limit", "10");
	params.append("near", cityName);
	console.log(url.toString())
	let response = await fetch(url.toString());
		if (response) {
		  let json = await response.json();
		  console.log(json);
		  loadAttractionData(json);
		  //Error om inte staden finns man söker på
		} else {
		  alert("Couldn't find that city.");
		}
}

//skapar en ny div där attractionen ska visas upp
function loadAttractionData(resultJson){
	let mainDiv = document.getElementById("attractions");
	mainDiv.innerHTML = "";
	let result = resultJson.response.groups[0].items;
	var i;
	for (i = 0; i < result.length; i++) {
		newAttractionTag(result[i], mainDiv)
	}
}

//lägger till alla attractions i min main div
function newAttractionTag(item,mainDiv){
	let attractionName = item.venue.name;
	var tag = document.createElement("p");
	tag.className = "attraction";
	var text = document.createTextNode(attractionName);
	tag.appendChild(text);
	mainDiv.appendChild(tag);
	
	
	console.log(attractionName);
};