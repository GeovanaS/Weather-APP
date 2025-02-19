const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input'); 


//busca dados da API
const fetchWeatherData = () => {
    const APIKey = 'SEU_TOKEN_AQUI'; //https://home.openweathermap.org/api_keys
    const city = input.value;

    if(city == '') 
        return;

    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=${APIKey}`)
       .then(response => response.json())
       .then(json => {
           if (json.cod === '404') {
               container.style.height = '400px';
               weatherBox.style.display = 'none';
               weatherDetails.style.display = 'none';
               error404.style.display = 'block';
               error404.classList.add('fadeIn');
               return;
           }    


           error404.style.display = 'none';
           error404.classList.remove('fadeIn');

           const image = document.querySelector('.weather-box img');
           const temperature = document.querySelector('.weather-box .temperature');
           const description = document.querySelector('.weather-box .description');
           const humidity = document.querySelector('.weather-details .humidity span');
           const wind = document.querySelector('.weather-details .wind span');

           switch (json.weather[0].main) {
               case 'Clear':
                   image.src = 'images/clear.png';
                   break;

               case 'Rain':
                   image.src = 'images/rain.png';
                   break;

               case 'Snow':
                   image.src = 'images/snow1.png';
                   break;

               case 'Clouds':
                   image.src = 'images/cloudy.png';
                   break;

               case 'Haze':
                   image.src = 'images/mist.png';
                   break;

               case 'Mist': 
                   image.src = 'images/mist-weather.png';
                   break;

               case 'Thunderstorm':
                   image.src = 'images/thunderstorms.png';
                   break;

              case 'Smoke':
                   image.src = 'images/smoke.png';
                   break;

              case 'Drizzle':
                   image.src = 'images/light-rain.png';
                   break;     
                   
               default:
                   image.src = '';
           }

           temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
           description.innerHTML = `${json.weather[0].description}`;
           humidity.innerHTML = `${json.main.humidity}%`;
           wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

           weatherBox.style.display = '';
           weatherDetails.style.display = '';
           weatherBox.classList.add('fadeIn');
           weatherDetails.classList.add('fadeIn');

           container.style.height = '590px';

       });

};

//evento de click no botao de pesquisa
search.addEventListener('click', fetchWeatherData);

//evento da tecla "Enter" no campo de entrada
input.addEventListener('keypress', (event) =>{
      if (event.key == 'Enter'){
        fetchWeatherData();
      }

});
