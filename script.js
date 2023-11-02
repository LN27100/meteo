// const city = 'Val-de-Reuil';

// fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2e5639d78c766e927181ac78f41ae2dc&lang=fr&units=metric`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//         const weatherInfo = document.getElementById('weather-info');
//         weatherInfo.innerHTML = '';

//         const title = document.createElement('h2');
//         title.textContent = `Prévisions météorologiques pour ${data.city.name}`;
//         weatherInfo.appendChild(title);

//         let currentDay = null;
//         let dayContainer = null;

//         data.list.forEach(item => {
//             const date = new Date(item.dt * 1000);
//             const day = date.toLocaleDateString();

//             if (day !== currentDay) {
//                 dayContainer = document.createElement('div');
//                 dayContainer.className = 'day-container';
//                 dayContainer.innerHTML = `<h3>${day}</h3>`;
//                 weatherInfo.appendChild(dayContainer);

//                 currentDay = day;
//             }

//             const temp = item.main.temp;
//             const description = item.weather[0].description;
//             const windSpeedMs = item.wind.speed;
//             const windSpeedKmh = (windSpeedMs * 3.6).toFixed(2);

//             const weatherItem = document.createElement('div');
//             weatherItem.className = 'weather-card';
//             weatherItem.innerHTML = `
//                 <h3 class="weather-card">${date.toLocaleString()}</h3>
//                 <p class="weather-info">Température : ${temp}°C</p>
//                 <p class="weather-info">Description : ${description}</p>
//                 <p class="weather-info">Vitesse du vent : ${windSpeedKmh} km/h</p>
//             `;

//             dayContainer.appendChild(weatherItem);
//         });
//     });

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

                if (day !== currentDay) {
                    dayContainer = document.createElement('div');
                    dayContainer.className = 'day-container';
                    dayContainer.innerHTML = `<h3>${day}</h3>`;
                    weatherInfo.appendChild(dayContainer);

                    currentDay = day;
                }

                const temp = item.main.temp;
                const description = item.weather[0].description;
                const windSpeedMs = item.wind.speed;
                const windSpeedKmh = (windSpeedMs * 3.6).toFixed(2);

                const weatherItem = document.createElement('div');
                weatherItem.className = 'weather-card';
                weatherItem.innerHTML = `
                    <h3 class="weather-card">${date.toLocaleString()}</h3>
                    <p class="weather-info">Température : ${temp}°C</p>
                    <p class="weather-info">Description : ${description}</p>
                    <p class="weather-info">Vitesse du vent : ${windSpeedKmh} km/h</p>
                `;

                dayContainer.appendChild(weatherItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données météorologiques :', error);
        });
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