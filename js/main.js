let now = dayjs();
$("window").ready(function () {

    $(".currentDate").text(now.format("(M/D/YYYY)"));
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
