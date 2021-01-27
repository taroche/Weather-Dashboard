let now = dayjs();
$("window").ready(function () {

    $(".currentDate").text(now.format("(M/D/YYYY)"));
})

