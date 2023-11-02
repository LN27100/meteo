
// Fonction pour mettre à jour la ville affichée
function updateCity(cityName) {
    const cityElement = document.getElementById('city');
    cityElement.textContent = cityName;
}

// Fonction pour récupérer les données météorologiques pour une ville donnée
function fetchDataForCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2e5639d78c766e927181ac78f41ae2dc&lang=fr&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = '';

            let currentDay = null;
            let dayContainer = null;

            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString();
                const weatherIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`; // URL de l'icône directement depuis l'API
                const humidity = item.main.humidity; // Récupération de l'humidité
                const minTemp = item.main.temp_min;
                const maxTemp = item.main.temp_max;
                const gustSpeedMs = item.wind.gust;
                const gustSpeedKmh = (gustSpeedMs * 3.6).toFixed(2);
                const rain = item.rain ? item.rain['3h'] : 0; // Vérifiez si la propriété 'rain' existe
                const temp = item.main.temp;
                const description = item.weather[0].description;
                const windSpeedMs = item.wind.speed;
                const windSpeedKmh = (windSpeedMs * 3.6).toFixed(2);

                if (day !== currentDay) {
                    dayContainer = document.createElement('div');
                    dayContainer.className = 'day-container';
                    dayContainer.innerHTML = `<h3>${day}</h3>`;
                    weatherInfo.appendChild(dayContainer);

                    currentDay = day;
                }

                
                const weatherItem = document.createElement('div');
                weatherItem.className = 'weather-card';
                weatherItem.innerHTML = `
                    <h4 class="tittle">${date.toLocaleString()}</h4>
                    <img src="${weatherIconUrl}" alt="Weather Icon">
                    <p class="weather-info">Température : ${temp}°C</p>
                    <p class="weather-info">Description : ${description}</p>
                    <p class="weather-info">Vitesse du vent : ${windSpeedKmh} km/h</p>
                    <p class="weather-info">Humidité : ${humidity}%</p> <!-- Affichage de l'humidité -->
                    <p class="weather-info">Température minimale : ${minTemp}°C</p>
                    <p class="weather-info">Température maximale : ${maxTemp}°C</p>
                    <p class="weather-info">Rafales : ${gustSpeedKmh} km/h</p>
                    <p class="weather-info">Pluie (3 heures) : ${rain} mm</p>
                `;

                dayContainer.appendChild(weatherItem);
            });
        })
      
}

// Recherche de la nouvelle ville
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const newCityInput = document.getElementById('new-city');
    const newCityName = newCityInput.value.trim();

    if (newCityName) {
        // Mettre à jour la ville actuelle
        updateCity(newCityName);

        // Effectuer une nouvelle recherche pour la ville spécifiée
        fetchDataForCity(newCityName);
    }
    newCityInput.value = '';
});

// Recherche de la ville initiale
fetchDataForCity('Val-de-Reuil');