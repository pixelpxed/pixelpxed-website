var enable_timeleft = true

window.addEventListener('load', () => {
    timeleft()
});

function timeleft() {
    setInterval(() => {
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var curtimeM = (hour * 60) + minute;
        var curtimeS = (curtimeM * 60) + second;
        const initialTime = 27600;
        var endtime = initialTime;
        var timediff = endtime - curtimeS ;
        var periodno = -1;
        while (timediff < 0) {
            var timediff = timediff + 3000;
            var periodno = periodno + 1;
            }
        
        var rseconds = timediff % 60;
        var rminutes = Math.floor(timediff / 60);
        if (rseconds < 10) {
            var rseconds = "0" + rseconds;
            }
        if (rminutes < 10) {
            var rminutes = "0" + rminutes;
            }
            
        var result = `Period ${periodno} Time Remaining<br><span class="clock">${rminutes}:${rseconds}</span>`;
        document.getElementById("timeleft-final").innerHTML = result;
    }, 1)
}