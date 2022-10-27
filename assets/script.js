// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={c2a19b7d3378306b6ba043066d90fe52}

const searchBtn= document.getElementById('submitCityBtn');
const cityInputEl=document.getElementById('cityInput');
const dashBoardEl=document.getElementById('current-weather');
const fiveDayDisplayEl = document.getElementById('fiveDayForcastUl');
const recentSearchEl= document.getElementById('recentSearchs');



function searchCity(){
console.log('hello');
let textInput =cityInputEl.value;
console.log(cityInputEl.value);
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${textInput}&limit=5&appid=c2a19b7d3378306b6ba043066d90fe52`)
		.then((response) => response.json())
		.then((data) =>{
			//console.log(data);
			data[0];
			//console.log(data[0].lat)
			//console.log(data[0].lon)
			selectedCityStorage(textInput);
			displayData(data[0].lat,data[0].lon);
		});
};
//retrive data 
function displayData(lat,lon){
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c2a19b7d3378306b6ba043066d90fe52`)
		.then((response) => response.json())
		.then((data) =>{
			//console.log(data);
		dashBoardEl.textContent="";
		let current = data.current;
		let daily = data.daily.slice(1,6);
		let temp = current.temp;
		let humidity = current.humidity;
		let date = formatUnixTimeStamp(current.dt);
		let windSpeed = current.wind_speed;
	//console.log(temp,humidity,date,windSpeed);
	var dateDisplay= document.createElement('p');
	dateDisplay.textContent= date;

	var tempDisplay= document.createElement('p');
	tempDisplay.textContent= temp;

	var humidityDisplay=document.createElement('p');
	humidityDisplay.textContent= humidity;

	var windSpeedDisplay=document.createElement('p');
	windSpeedDisplay.textContent= windSpeed;

	dashBoardEl.append(dateDisplay,tempDisplay,humidityDisplay,windSpeedDisplay);
	displayFiveDays(daily);
		});
};
//current date conversion 
function formatUnixTimeStamp(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleDateString('en-US');
}

//five day display function

function displayFiveDays(days){
	for (let i=0; i <days.length; i++){
		//console.log(days[i]);
		const weatherCardEl = document.getElementById('weather-card')
		let temp = days[i].temp.day;
		let humidity = days[i].humidity;
		let date = formatUnixTimeStamp(days[i].dt);
		let windSpeed = days[i].wind_speed;
		let display = document.createElement('p');

	var dateDisplay= document.createElement('p');
		dateDisplay.textContent= date;
	
	var tempDisplay= document.createElement('p');
		tempDisplay.textContent= temp;
	
	var humidityDisplay=document.createElement('p');
		humidityDisplay.textContent= humidity;
	
	var windSpeedDisplay=document.createElement('p');
		windSpeedDisplay.textContent= windSpeed;
	//console.log(temp,humidity,windSpeed,date);
	weatherCardEl.append(dateDisplay,tempDisplay,humidityDisplay,windSpeedDisplay);
	fiveDayDisplayEl.appendChild(weatherCardEl);
	};
}

function selectedCityStorage(cityName){
	var cities = JSON.parse(window.localStorage.getItem('cities')) || [];
  let foundCity = cities.find((city) => city === cityName);
  if (!foundCity) {
    // save to localstorage
    //cityObject.dateCreated = new Date(); // add a new property
    cities.push(cityName);
  }
  window.localStorage.setItem('cities', JSON.stringify(cities));
}


searchBtn.onclick = searchCity;
