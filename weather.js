function getWeather() {
    const apiKey = '1a36b0913165d8ab777525da990791d3';
    const city = document.getElementById('city').value;

    if(!city){
        alert('Please enter a city');
        return;
    }

    const geoCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    fetch(geoCodeUrl)
        .then(response => response.json())
        .then(data => {
            const location = data[0];
            long = location.lon;
            lat = location.lat;

            processData(lat, long);
        })
        .catch(error => {
            console.error('Error fetching GeoCoding: ', error);
            // alert('Error fetching GeoCoding. Please Try again');
        });

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL)
        .then(response => response.json())
        .then(data => {
            displayWeather(data)
        })
        .catch(error => {
            console.error('Error fetching current weather data: ', error);
            // alert('Error fetching current weather data. Please Try again');
        });
    
    fetch(forcastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForcast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forcast data: ', error);
            // alert('Error fetching hourly forcast data. Please Try again');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForcastDiv = document.getElementsByClassName('hourly-forcast');

    // Clear the div
    weatherInfoDiv.innerHTML = '';
    hourlyForcastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = '<p>${data.message}</p>';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}</p>
        `;

        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }

    function displayHourlyForcast(hourlyData){
        const hourlyForcastDiv = document.getElementById('hourly-forcast');
        const next24Hours = hourlyData.slice(0,8);

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature}°C</span>
                </div>
            `;
            hourlyForcastDiv.innerHTML += hourlyItemHtml;
        });
    }

    function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }
}