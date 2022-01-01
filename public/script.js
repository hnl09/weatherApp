const api = {
    key: "a9c612c49dc90364ee9b26d4a5dcb63b",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')
searchBox.addEventListener('keypress', setQuery)

function setQuery(event) {
    if (event.keyCode === 13) {
        getResults(searchBox.value)
    }
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
    console.log(weather)
}