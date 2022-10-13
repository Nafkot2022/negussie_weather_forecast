// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={c2a19b7d3378306b6ba043066d90fe52}

//search button
const searchBtn= document.getElementById('submitCityBtn');
const cityInputEl=document.getElementById('cityInput');

function searchCity(){
console.log('hello');
let textInput =cityInputEl.value;
console.log(cityInputEl.value);
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${textInput}&limit=5&appid=c2a19b7d3378306b6ba043066d90fe52`)
		.then((response) => response.json())
		.then((data) =>{
			//console.log(data);
			data[0];
			//console.log(data[0]);
			//console.log(data[0].lat)
			//console.log(data[0].lon)
			displayData(data[0].lat,data[0].lon);
		});
};

function displayData(lat,lon){

	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c2a19b7d3378306b6ba043066d90fe52`)
		.then((response) => response.json())
		.then((data) =>{
		let current = data.current;
		let temp = current.temp;
		let humidity = current.humidity;
		let date = formatUnixTimeStamp(current.dt);
		let windSpeed = current.wind_speed;

		console.log(temp,humidity,date,windSpeed);
			
		});
};
//current date conversion 
function formatUnixTimeStamp(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleDateString('en-US');
}



searchBtn.onclick = searchCity;
