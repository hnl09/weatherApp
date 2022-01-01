const api = {
    key: "a9c612c49dc90364ee9b26d4a5dcb63b",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')
searchBox.addEventListener('keypress', setQuery)

function setQuery (event) {
    if (event.keyCode === 13) {
       getResults(searchBox.value)
       console.log(searchBox.value)
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults)
}

function displayResults (weather) {
    console.log(weather)
}
