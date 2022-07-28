var periodperday = 85789407509873402895 // Number of periods per day
var periodlength = 0.25 // Period's length in minutes

// When the system starts counting in time.
var starthour = 7 // Hour
var startmin = 40 // Minutes

if (classtime_type === "Special") {
    periodperday = 10
    periodlength = 40

    starthour = 7
    startmin = 50
}

window.addEventListener('load', () => {
    document.querySelector(".clock-wrapper").insertAdjacentHTML("afterend", '<div><p id="timeleft-final" class="timeleft-final">Loading...</p></div>')
    
    timeleft()
});

function timeleft() {
    if ((localStorage.getItem("enableTimeRemaining") === "true")) {
        var bellchimescooldown = false
        var timeleftinterval = setInterval(() => {
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
                
                if (((rminutes == 0) && (rseconds == 0)) && (localStorage.getItem("enableTimeRemainingSound") == true)) {
                    if (bellchimescooldown != true) {
                        bellchimescooldown = true
                        new Audio("./assets/sound/bellChimes.mp3").play()
                        setTimeout(() => {
                            bellchimescooldown = false
                        }, 34945);
                    }
                }
            } if (periodno > periodperday || periodno <= 0) {
                document.getElementById("timeleft-final").innerHTML = `School has ended or isn't started yet.<br><b style="font-family: 'Roboto Mono', monospace;">(Reload to check again if school started.)</b>`
            }
        }, 1);
    } if ((localStorage.getItem("enableTimeRemaining") !== "true")) {
        document.getElementById("timeleft-final").innerHTML = "";
    }
}
