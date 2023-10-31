let city='rouen'

fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2e5639d78c766e927181ac78f41ae2dc&lang=fr&units=metric`)
.then(reponse => reponse.json())
.then(data => {
    console.log(data)
})