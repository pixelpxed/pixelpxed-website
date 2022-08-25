window.addEventListener('load', () => {
    clock()
    setMainClock()
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
    
        hour = today.getHours();
        minute = today.getMinutes();
        second = today.getSeconds();
    }, 1000);
}

function setMainClock() {
    setInterval(() => {
        document.getElementById("clock").innerHTML = `${hour > 9 ? hour : "0" + hour}:${minute >= 10 ? minute : "0" + minute}:${second >= 10 ? second : "0" + second}`
        document.getElementById("date").innerHTML = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
    }, 1000);
}