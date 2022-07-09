window.addEventListener('load', () => {
    setInterval(() => {
        let today = new Date();
        let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today.getDay()];
        let date = today.getDate();
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()];
        let year = today.getFullYear();
    
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
    
        document.getElementById("clock").innerHTML = `${h > 9 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`
        document.getElementById("date").innerHTML = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
    }, 1);

    setCopyrightYear()
});

function setCopyrightYear() {
    if (copyrightyear != "") {
        document.getElementById("year").innerHTML = copyrightyear
    }
}