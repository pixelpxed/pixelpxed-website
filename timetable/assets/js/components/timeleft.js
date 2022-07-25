var enable_timeleft = true
var enable_timeleft_sound = true

var periodperday = 11 // Number of periods per day
var periodlength = 50 // Period's length in minutes

// When the system starts counting in time.
var starthour = 7 // Hour
var startmin = 40 // Minutes

if (enable_specialclass == true) {
    periodperday = 11
    periodlength = 40

    starthour = 7
    startmin = 50
}

window.addEventListener('load', () => {
    document.querySelector(".clock-wrapper").insertAdjacentHTML("afterend", '<div><p id="timeleft-final" class="timeleft-final">Loading...</p></div>')

    timeleft()
});

function timeleft() {
    if (enable_timeleft == true && (localStorage.getItem("classTimetable") === "305" || localStorage.getItem("classTimetable") === "306")) {
        var bellchimescooldown = false
        setInterval(() => {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            var curtimeM = (hour * 60) + minute;
            var curtimeS = (curtimeM * 60) + second;

            var endtime = ((starthour * 60) * 60) + (startmin * 60);
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
                
                if (((rminutes == 0) && (rseconds == 0)) && (enable_timeleft_sound = true)) {
                    if (bellchimescooldown != true) {
                        bellchimescooldown = true
                        new Audio("./assets/sound/bellChimes.mp3").play()
                        setTimeout(() => {
                            bellchimescooldown = false
                        }, 34945);
                    }
                }
            } if (periodno > periodperday || periodno <= 0) {
                document.getElementById("timeleft-final").innerHTML = `School has ended or isn't started yet.<br><b style="font-family: 'Roboto Mono', monospace;">(Reload the page to use this feature again if the school has ended.)</b>`
            }
        }, 1);
    } if (enable_timeleft != true || (localStorage.getItem("classTimetable") !== "305" || localStorage.getItem("classTimetable") !== "306")) {
        document.getElementById("timeleft-final").innerHTML = "";
    }
}
