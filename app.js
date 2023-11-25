const local = document.getElementById("local");
const searchLocation = document.getElementById("searchLocation");
const takeLocation = document.getElementById("takeLocation");
const APIkey = "c5a490cc6898ad6e49b79821825bb2e8";
let weatherTemp = document.getElementById("weatherTemp");
let TempMax = document.getElementById("TempMax");
let TempMin = document.getElementById("TempMin");
let weatherIcon = document.getElementById("weatherIcon");
let weatherDesc = document.getElementById("weatherDesc");
let weatherHumidity = document.getElementById("weatherHumidity");
let feels_like = document.getElementById("feels_like");
let localAtual = document.getElementById("localAtual");
let buscando = [...document.querySelectorAll("section p span")];

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(localizacaoAceita, localizacaoRecusada)
} else {
    console.log("Serviço de localização não suportado")
}

takeLocation.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(localizacaoAceita, localizacaoRecusada)
    } else {
        console.log("Serviço de localização não suportado")
    }
})

const updateContent=(updateData)=>{
    localAtual.innerHTML = updateData.name;
      weatherTemp.innerHTML = Math.floor(updateData.main.temp);
      TempMax.innerHTML = Math.floor(updateData.main.temp_max);
      TempMin.innerHTML = Math.floor(updateData.main.temp_min);
      feels_like.innerHTML = Math.floor(updateData.main.feels_like);
      weatherDesc.innerHTML = updateData.weather[0].description;
      weatherHumidity.innerHTML=Math.floor(updateData.main.humidity)
}

function localizacaoAceita(pos){
    var lat = pos.coords.latitude
    var long = pos.coords.longitude
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}&lang=pt_br&units=metric`)
    .then(data => data.json())
    .then((locationData)=>{
        updateContent(locationData)
    })
}

function localizacaoRecusada(pos){
    console.log("Erro ao obter a localização")
}

searchLocation.addEventListener("click", () => {
  localAtual.innerHTML = local.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${local.value}&appid=${APIkey}&units=metric&lang=pt_br`
  )
    .then((data) => data.json())
    .then((locationData) => {
      console.log(locationData);
      updateContent(locationData)
    })
    .catch((err) =>{
        console.log(err)
        localAtual.innerHTML = "Não encontrado";
        weatherTemp.innerHTML = "0"
        TempMax.innerHTML = "0"
        TempMin.innerHTML = "0"
        feels_like.innerHTML = "0"
        weatherDesc.innerHTML = " "
        weatherHumidity.innerHTML= "0"
    });
});

