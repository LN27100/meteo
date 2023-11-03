
// Fonction pour mettre à jour la ville affichée
function updateCity(cityName) {
    const cityElement = document.getElementById('city')
    cityElement.textContent = cityName
}

// Fonction pour récupérer les données météorologiques pour une ville
function fetchDataForCity(city) {
    // Effectue une requête vers l'API OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2e5639d78c766e927181ac78f41ae2dc&lang=fr&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = '' // Vide le contenu existant

            let currentDay = null // Variable pour stocker la date du jour en cours
            let dayContainer = null // Variable pour stocker le conteneur HTML du jour en cours

            // parcoure chaque élément du tableau prévisionnel et exécute une fonction donnée sur chaque élément de celui-ci.
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000)
                const day = date.toLocaleDateString()
                const weatherIconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` // URL de l'icône récupérée directement depuis l'API.Chaîne de caractères qui identifie l'icône météorologique associée à ces conditions.
                const humidity = item.main.humidity
                const minTemp = item.main.temp_min
                const maxTemp = item.main.temp_max
                const gustSpeedMs = item.wind.gust;
                const gustSpeedKmh = (gustSpeedMs * 3.6).toFixed(2)
                const rain = item.rain ? item.rain['3h'] : 0 // Vérifiez si la propriété 'rain' existe
                const temp = item.main.temp
                const description = item.weather[0].description
                const windSpeedMs = item.wind.speed
                const windSpeedKmh = (windSpeedMs * 3.6).toFixed(2)

                // Crée un conteneur de jour si la date change
                if (day !== currentDay) {
                    dayContainer = document.createElement('div')
                    dayContainer.className = 'day-container'
                    dayContainer.innerHTML = `<h3>${day}</h3>`
                    weatherInfo.appendChild(dayContainer)

                    currentDay = day // Met à jour la date du jour en cours
                }

                // élément HTML pour affichant les informations météorologiques
                const weatherItem = document.createElement('div')
                weatherItem.className = 'weather-card'
                weatherItem.innerHTML = `
                    <h4 class="tittle">${date.toLocaleString()}</h4>
                    <img src="${weatherIconUrl}" alt="Weather Icon">
                    <p class="weather-info"><strong><u>Température :</u></strong> ${temp}°C</p>
                    <p class="weather-info"><strong><u>Description :</u></strong> ${description}</p>
                    <p class="weather-info"><strong><u>Vitesse du vent :</u></strong> ${windSpeedKmh} km/h</p>
                    <p class="weather-info"><strong><u>Humidité :</u></strong> ${humidity}%</p> <!-- Affichage de l'humidité -->
                    <p class="weather-info"><strong><u>Température minimale :</u></strong> ${minTemp}°C</p>
                    <p class="weather-info"><strong><u>Température maximale :</u></strong> ${maxTemp}°C</p>
                    <p class="weather-info"><strong><u>Rafales :</u></strong> ${gustSpeedKmh} km/h</p>
                    <p class="weather-info"><strong><u>Pluie (3 heures) :</u></strong> ${rain} mm</p>
                `;

                dayContainer.appendChild(weatherItem)
            })
        })

}

// Recherche de la nouvelle ville entrée
const searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', () => {
    const newCityInput = document.getElementById('new-city')
    const newCityName = newCityInput.value.trim()

    // Vérifie si l'utilisateur a saisi un nom de ville valide
    if (newCityName) {
        // Mettre à jour la ville actuelle
        updateCity(newCityName)

        // Effectuer une nouvelle recherche pour la ville spécifiée
        fetchDataForCity(newCityName)
    }
    newCityInput.value = '' // RVide la zone de rechercher

})

// Recherche de la ville par défaut
fetchDataForCity('Val-de-Reuil')