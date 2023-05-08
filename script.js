const api = {
    key: "a9c612c49dc90364ee9b26d4a5dcb63b",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')
const searchQuery = document.querySelector('.search-query')
searchBox.addEventListener('keypress', setQuery)
searchQuery.addEventListener('click', setQueryBtn)

function setQuery(event) {
    if (event.keyCode === 13) {
        getResults(searchBox.value)
    }
}

function setQueryBtn(event) {
    getResults(searchBox.value)
}

function getResults(query) {
    // Como o metodo includes é case sensitive temos que passar tudo para lower case
    var query = query.toLowerCase()
    // Corrige um bug em que se a pessoa colocar uma cidade com acento ~ irá dar erro na requisição GET.
    if (query.includes('ã') || query.includes('õ')) {
        var query = query.replace(/ã/g, 'a')
        var query = query.replace(/õ/g, 'o')
        fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric&lang=pt_br`)
            .then(weather => {
                return weather.json()
            }).then(displayResults)
    } else {
        fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric&lang=pt_br`)
            .then(weather => {
                return weather.json()
            }).then(displayResults)
    }
}

function displayResults(weather) {
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temperature')
    temp.innerHTML = `${Math.round(weather.main.temp)}°c`

    let description = document.querySelector('.current .weather')
    description.innerText = `${weather.weather[0].description}` // é um Array

    let lowhi = document.querySelector('.current .low-high')
    lowhi.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)} °c`
}

function dateBuilder (day) {
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    let days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]

    let dayz = days[day.getDay()]
    let date = day.getDate()
    let month = months[day.getMonth()]
    let year = day.getFullYear()

    return `${dayz} ${date} ${month} ${year}`
}
