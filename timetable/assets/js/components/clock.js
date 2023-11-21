window.addEventListener('load', () => {
    clock()
    setMainClock()
    calculateDaysInWeek()

    setTimeout(() => {
        console.log(
            `
%cAnalytics%c

Week: ${calculateWeekNumber()}
Load: ${hour > 9 ? hour : "0" + hour}:${minute >= 10 ? minute : "0" + minute}:${second >= 10 ? second : "0" + second} *

* When clock is avalible, minus 1 second for execution time.
            `,

            "font-family: sans-serif; font-weight: bold; font-size: 1.5em;",
            "font-family: sans-serif;"
        )
    }, 1000);
});

var daylist = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

var shortdaylist = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]

var monthlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

var shortmonthlist = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

// Set Public Variables
var today = undefined;
var day = undefined;
var date = undefined;
var month = undefined;
var year = undefined;

var hour = undefined;
var minute = undefined;
var second = undefined;

// Public Clock
function clock() {
    setInterval(() => {
        today = new Date();
        day = daylist[today.getDay()];
        date = today.getDate();
        month = monthlist[today.getMonth()];
        year = today.getFullYear();

        shortday = shortdaylist[today.getDay()];
        shortmonth = shortmonthlist[today.getMonth()];
        
        hour = today.getHours();
        minute = today.getMinutes();
        second = today.getSeconds();
    }, 1000);
}

function setMainClock() {
    if (!window.matchMedia('(display-mode: standalone)').matches) {
        setInterval(() => {
            document.getElementById("clock").innerHTML = `${hour > 9 ? hour : "0" + hour}:${minute >= 10 ? minute : "0" + minute}:${second >= 10 ? second : "0" + second}`
            document.getElementById("date").innerHTML = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
        }, 1000);
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.querySelector(".nav-pwa-timetable").innerHTML = `---, -- --- ---- / --:--:--`;
        setInterval(() => {
            document.querySelector(".nav-pwa-timetable").innerHTML = `${shortday}, ${date > 9 ? date : "0" + date} ${shortmonth} ${year} / ${hour > 9 ? hour : "0" + hour}:${minute >= 10 ? minute : "0" + minute}:${second >= 10 ? second : "0" + second}`;
        }, 1000);
    }
}

var onloadDate = new Date()
var datesInWeek = undefined
var weekNumber = 1

function calculateDaysInWeek() {
    // Modified from: https://stackoverflow.com/questions/43008354/get-all-days-of-the-week-given-a-day

    datesInWeek = new Array(); 
    onloadDate.setDate((onloadDate.getDate() - onloadDate.getDay()));
    for (var i = 0; i < 7; i++) {
        datesInWeek.push(
            new Date(onloadDate)
        ); 
        onloadDate.setDate(onloadDate.getDate() + 1);
    }

    // Set the dates into the grid

    for (let i = 0; i < 7; i++) {
        var weekNow = datesInWeek[i];

        var weekMonth = shortmonthlist[weekNow.getMonth()];
        var weekDate = weekNow.getDate();
        var weekYear = weekNow.getFullYear();

        document.getElementById(`date${i}`).innerHTML = `${weekMonth} ${weekDate > 9 ? weekDate : "0" + weekDate}, ${weekYear}`
    }
}

function calculateWeekNumber() {
    startDate = new Date(onloadDate.getFullYear(), 0, 1);
    var days = Math.floor((onloadDate - startDate) / (24 * 60 * 60 * 1000));
    
    weekNumber = Math.ceil(days / 7);
    return weekNumber
}