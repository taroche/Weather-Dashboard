let now = dayjs();
const $searchEl = $(".search");
const $weatherEl = $(".weather");
const $fiveDayEl = $(".5day");
const $tempEl = $(".temp");
const $currentCityEl = $(".currentCity")
const $weatherIconEl = $("#wicon")
const $humidityEL = $(".humidity")
const $windSpeedEl = $(".windSpeed")
const $uvEL = $(".UV")
const $newCitySearchEl = $("#newCitySearch")
const apiKey = "2da202c3060a41dedb520da5c37123a2";
let cityArr = [];

$("window").ready(function () {
    if (localStorage.getItem("cityArr")) {
        cityArr = JSON.parse(localStorage.getItem('cityArr'))
    }

    for (let i = 0; i < cityArr.length; i++) {
        let $btn = $(`<button></button>`)
        $btn.attr("class", "btnNewCity btn btn-primary col-12 col-lg-5 offset-lg-1")
        $btn.attr("type", "button")
        $btn.text(cityArr[i].toString())
        $btn.attr("value", cityArr[i].toString())
        $newCitySearchEl.append($btn)
    }
});

$searchEl.on("click", function (e) {
    e.preventDefault()
    let value = $(this).prev().val()
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${value},us&appid=${apiKey}`,
        method: "GET",
        error: function (err) {
            alert("not a city");
        }
    }).then(res => {
        let $btn = $(`<button></button>`)
        $btn.attr("class", "btnNewCity btn btn-primary col-12 col-lg-5 offset-lg-1")
        $btn.attr("type", "button")
        $btn.text(`${res.city.name}`)
        $btn.attr("value", `${res.city.name}`)
        $newCitySearchEl.append($btn)
        saveCity(res)
    })
});

function saveCity(res) {
    let input = res.city.name
    cityArr.push(input)
    localStorage.setItem("cityArr", JSON.stringify(cityArr))
};

$newCitySearchEl.on("click", ".btnNewCity", function () {
    let newCityVal = $(this).attr("value");
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${newCityVal},us&units=imperial&appid=${apiKey}`,
        method: "GET",
        success: function (data) {
            let lat = data.city.coord.lat
            let lon = data.city.coord.lon
            $currentCityEl.text(data.city.name)

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`,
                method: "GET",
                success: function (response) {
                    currentWeather(response);
                }
            });
        }

    });
})

function currentWeather(data) {
    $(".currentDate").text(now.format("(M/D/YYYY)"));
    $weatherIconEl.attr("src", `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`)
    $tempEl.text(data.current.temp)
    $humidityEL.text(data.current.humidity)
    $windSpeedEl.text(data.current.wind_speed)
    $uvEL.text(data.current.uvi)
    for (let i = 1; i <= 5; i++) {
        let nextDate = new Date(data.daily[i].dt * 1000)
        let $futureDay = $(`<div class="day${i} card col-12 col-lg-2"></div>`)
        let $futureDate = $("<p>").attr("class", `cardDate`).text(`${nextDate.getMonth()+1}/${nextDate.getDate()}/${nextDate.getFullYear()}`)
        let $futureIcon = $(`<img class="cardIcon" src="http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png" alt="${data.daily[i].weather[0].description}">`)
        let $futureTemp = $(`<p class="cardTemp">Temperature: ${data.daily[i].temp.day} F</p>`)
        let $futureHumidity = $(`<p class="cardHumidity">Humidity: ${data.daily[i].humidity}%</p>`)
        $fiveDayEl.append($futureDay)
        $futureDay.append($futureDate, $futureIcon, $futureTemp, $futureHumidity)
    }

}