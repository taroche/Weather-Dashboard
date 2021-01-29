let now = dayjs();
const $searchEl = $(".search");
const $newCity = $(".btnNewCity");
const $weatherEl = $(".weather");
const $fiveDayEl = $(".5day");
const $tempEl = $(".temp");
const $currentCityEl = $(".currentCity")
const $weatherIconEl = $(".weatherIcon")
const $humidityEL = $(".humidity")
const $windSpeedEl = $(".windSpeed")
const $uvEL = $(".UV")

$("window").ready(function () {

    $searchEl.on("click", function (e) {
        e.preventDefault()
        let value = $(this).prev().val()
        //want to do this better
        let btn = document.createElement("BUTTON");
        btn.innerHTML = value;
        btn.classList.add("btnNewCity");
        console.log(btn)
        document.getElementById('newCitySearch').appendChild(btn)
        localStorage.setItem(value, value)
    });

    //     $newCity.on("click", function (e) {
    //         e.preventDefault()
    //         $(".currentDate").text(now.format("(M/D/YYYY)"));
    //         //let value = $(this).val()
    //         const apiKey = "2da202c3060a41dedb520da5c37123a2";
    //         const value = "04008";


    //         $.ajax({
    //             url: `https://api.openweathermap.org/data/2.5/forecast?zip=${value},us&appid=${apiKey}`,
    //             method: "GET",
    //             error: function (err) {

    //                 errorModal(err);
    //             }
    //         }).then(function (response) {
    //             currentWeather(response);

    //         });

    //         function currentWeather(data) {
    //             $currentCityEl.text(data.city.name)
    //             $weatherIconEl.text(data.weather.icon)
    //             $tempEl.text(data.main.temp)
    //             $humidityEL.text(data.main.humidity)
    //             windSpeedEl.text(data.wind.speed)


    // })

    const apiKey = "2da202c3060a41dedb520da5c37123a2";
    const value = "04008";


    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?zip=${value},us&appid=${apiKey}`,
        method: "GET",
        error: function (err) {

            errorModal(err);
        }
    }).then(function (response) {
        currentWeather(response);

    });

    function currentWeather(data) {
        $(".currentDate").text(now.format("(M/D/YYYY)"));
        $currentCityEl.text(data.city.name)
        $weatherIconEl.src =`http://openweathermap.org/img/wn/${data.list[0].weather.icon}.png`
        $tempEl.text(Math.round(((parseFloat(data.list[0].main.temp)-273.15)*1.8)+32))
        $humidityEL.text(data.list[0].main.humidity)
        $windSpeedEl.text(data.list[0].wind.speed)
    }

})

