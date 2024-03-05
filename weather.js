const container = document.querySelector('.w-container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '1a36b0913165d8ab777525da990791d3';
    const city = document.querySelector('.search-box input').value;

    if(city == "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        console.log(json.weather[0].main);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'assets/temp/clear.png';
                break;

            case 'Rain':
                image.src = 'assets/temp/rain.png';
                break;

            case 'Snow':
                image.src = 'assets/temp/snow.png';
                break;

            case 'Clouds':
                image.src = 'assets/temp/cloud.png';
                break;

            case 'Mist':
                image.src = 'assets/temp/mist.png';
                break;

            case 'Haze':
                image.src = 'assets/temp/mist.png';
                break;
        
            default:
                image.src = 'assets/temp/cloud.png'
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});