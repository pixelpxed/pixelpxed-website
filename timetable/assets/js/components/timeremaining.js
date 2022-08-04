window.addEventListener('load', () => {
    var timeleftinterval = undefined

    timeleft()
});

function timeleft() {
    if ((localStorage.getItem("enableTimeRemaining") === "true")) {
        document.querySelector(".clock-wrapper").insertAdjacentHTML("afterend", `<div class="timeleft-final">Time Remaining for<br><span id="timeleft-final" style="font-family: 'Roboto Mono', monospace; font-weight: var(--font-weight-bold);">Period - - --:--</span></div>`)

        var periodperday = classtimes[classtime_type]["timeremaining"]["periodperday"]
        var periodlength = classtimes[classtime_type]["timeremaining"]["periodlength"]

        var starthour = classtimes[classtime_type]["timeremaining"]["starthour"]
        var startmin = classtimes[classtime_type]["timeremaining"]["startmin"]

        var bellchimescooldown = false
        timeleftinterval = setInterval(() => {
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
                document.getElementById("timeleft-final").innerHTML = `Period ${periodno} - ${rminutes >= 10 ? rminutes : "0" + rminutes}:${rseconds >= 10 ? rseconds : "0" + rseconds}`;
                
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
                document.getElementById("timeleft-final").innerHTML = `School has ended`
            }
        }, 1);
    } if ((localStorage.getItem("enableTimeRemaining") !== "true")) {
        document.getElementById("timeleft-final").innerHTML = "";
    }
}
