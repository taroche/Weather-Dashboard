let now = dayjs();
const $searchEl = $(".search");
const $searchForm = (".newCitySearch")

$("window").ready(function () {

    $(".currentDate").text(now.format("(M/D/YYYY)"));

    $searchEl.on("click", function (e) {
        e.preventDefault()
        let value = $(this).prev().val()
        let btn = document.createElement("BUTTON");
        btn.innerHTML = value;
        btn.classList.add("btnNewCity");
        console.log(btn)
        document.getElementById('newCitySearch').appendChild(btn)                 
        localStorage.setItem(value, value)
    });
})
// const apiKey = "2da202c3060a41dedb520da5c37123a2";
// const city = "Portland";


//   $.ajax({
//     url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
//     method: "GET",
//     error: function (err) {
        
//         errorModal(err);
//     }
// }).then(function (response) {
//     console.log(response);
  
// });

function currentWeather(data) {
    
} 