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