var enable_timeleft = true

window.addEventListener('load', () => {
    timeleft()
});

function timeleft() {
    if (enable_timeleft == true && (localStorage.getItem("classTimetable") === "305" || localStorage.getItem("classTimetable") === "306")) {
       
        var soundplaying = false
        setInterval(() => {
            var periodperday = 11 // Number of periods per day
            var periodlength = 50 // Period's length in minutes

            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            var curtimeM = (hour * 60) + minute;
            var curtimeS = (curtimeM * 60) + second;

            var endtime = 27600;
            var timediff = endtime - curtimeS;

            var periodno = -1;
            while (timediff < 0) {
                var timediff = timediff + (periodlength * 60);
                var periodno = periodno + 1;
            }
            
            var rseconds = timediff % 60;
            var rminutes = Math.floor(timediff / 60);
            
            if (periodno >= 0 && periodno <= periodperday) {
                document.getElementById("timeleft-final").innerHTML = `Time Remaining for<br><b style="font-family: 'Roboto Mono', monospace;">Period ${periodno} - ${rminutes >= 10 ? rminutes : "0" + rminutes}:${rseconds >= 10 ? rseconds : "0" + rseconds}</b>`;
                
                if ((rminutes == 0) && (rseconds == 0)) {
                    if (soundplaying != true) {
                        soundplaying = true
                        var bellChimes = new Audio("./assets/sound/bellChimes.mp3")
                        bellChimes.play()
                        setTimeout(() => {
                            soundplaying = false
                        }, 34945);
                    }
                }
            } if (periodno <= 0) {
                document.getElementById("timeleft-final").innerHTML = `School Isn't Started Yet.`
            } if (periodno >= periodperday) {
                document.getElementById("timeleft-final").innerHTML = `School Has Ended. (Time Remaining Cannot Restart the timer, please refresh the page to use this feature again.)`
            }
        }, 1);
    } if (enable_timeleft != true || (localStorage.getItem("classTimetable") !== "305" || localStorage.getItem("classTimetable") !== "306")) {
        document.getElementById("timeleft-final").innerHTML = "";
    }
}