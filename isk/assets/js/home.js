window.onload = function() {
    getInfo();
}

setInterval(() => {
    var today = new Date();
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today.getDay()];
    var date = today.getDate();
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()];
    var year = today.getFullYear();

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    document.getElementById("clock").innerHTML = `${h > 9 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`
    document.getElementById("day").innerHTML = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
}, 1);

function getInfo() {
    var token = getCookie(`token`)
    if (token == "") {
        window.location.href = "./login.html"
    } for (i = 0; i < accountsData.length; i++) {
        if (token == accountsData[i].token) {
            name_en = accountsData[i].name_en;
            name_th = accountsData[i].name_th;
        }
    }

    console.log(`${name_th} and ${name_en}`)
    document.getElementById("username-th").innerHTML = name_th;
    document.getElementById("username-en").innerHTML = name_en;
}

function signOut() {
    setCookie("token", "Expired", -1)
    window.location.href = "./"
}