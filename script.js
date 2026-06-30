const apiKey="YOUR_API_KEY";

const city=document.getElementById("city");

const btn=document.getElementById("search");

const weather=document.getElementById("weather");

const history=document.getElementById("history");

btn.addEventListener("click",()=>{

getWeather(city.value);

});

async function getWeather(name){

if(name==="") return;

const url=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

try{

const response=await fetch(url);

const data=await response.json();

if(data.cod!=200){

weather.innerHTML="<h3>City Not Found</h3>";

return;

}

weather.innerHTML=`

<h2>${data.name}</h2>

<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

<h3>${data.main.temp}°C</h3>

<p>${data.weather[0].description}</p>

<p>Humidity : ${data.main.humidity}%</p>

<p>Wind : ${data.wind.speed} km/h</p>

`;

saveHistory(data.name);

}
catch{

weather.innerHTML="Error";

}

}

function saveHistory(city){

let cities=JSON.parse(localStorage.getItem("cities"))||[];

if(!cities.includes(city)){

cities.push(city);

localStorage.setItem("cities",JSON.stringify(cities));

}

showHistory();

}

function showHistory(){

history.innerHTML="";

let cities=JSON.parse(localStorage.getItem("cities"))||[];

cities.forEach(c=>{

const li=document.createElement("li");

li.innerText=c;

li.onclick=()=>{

getWeather(c);

};

history.appendChild(li);

});

}

showHistory();
