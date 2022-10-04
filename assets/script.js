// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={c2a19b7d3378306b6ba043066d90fe52}


let textInput = "chicago";

fetch('https://api.openweathermap.org/geo/1.0/direct?q=chicago&limit=5&appid=c2a19b7d3378306b6ba043066d90fe52')
		.then((response) => response.json())
		.then((data) => console.log(data));

fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=c2a19b7d3378306b6ba043066d90fe52')
		.then((response) => response.json())
		.then((data) => console.log(data));