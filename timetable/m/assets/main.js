setInterval(() => {
    var today = new Date();
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today.getDay()];
    var date = today.getDate();
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()];
    var year = today.getFullYear();

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    document.getElementById("time").textContent = `${h > 9 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`
    document.getElementById("date").textContent = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
}, 1000);

document.getElementById("version").textContent = "1.0.1"

function changeSubjName() {
    document.getElementById("addsci").textContent = "Additional Pain"
}

function openSidebar() {
    document.getElementById("sidebar").style.marginLeft = "0"
}

function closeSidebar() {
    document.getElementById("sidebar").style.marginLeft = "-16em"
}