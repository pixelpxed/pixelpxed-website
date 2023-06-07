window.addEventListener('load', () => {
    // Check localStorage for setting Time Remaining
    if (localStorage.getItem("timetable-enableTimeRemaining") === "true" && localStorage.getItem("timetable-overrideTimeList") === "auto") {
        timeRemaining()
    }
});

// Public variables
var timeleftinterval = undefined
var bellChimes = new Audio("./assets/sound/bellChimes.mp3")

function timeRemaining() {
    // Inserts the HTML code for time remaining after clock.
    document.querySelector(".clock-wrapper").insertAdjacentHTML("afterend", `
        <div class="timeremaining">
            Time Remaining for<br>
            <span id="timeremaining-refreshcontent">
                Period - - --:--
            </span>
        </div>
    `)

    // Set variables.
    var periodTimeLeft = classtimes[classtime_type]["timeremaining"];
    var periodperday = periodTimeLeft["periodperday"];
    var periodlength = periodTimeLeft["periodlength"];
    var starthour = periodTimeLeft["starthour"];
    var startmin = periodTimeLeft["startmin"];

    // Calculated every 1 second.
    timeleftinterval = setInterval(() => {
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
            document.getElementById("timeremaining-refreshcontent").innerHTML = `Period ${periodno} - ${rminutes >= 10 ? rminutes : "0" + rminutes}:${rseconds >= 10 ? rseconds : "0" + rseconds}`;

            // Check if period ends (hour and minutes = 0)
            if ((rminutes == 0) && (rseconds == 0)) {
                // If sound setting is enabled, play the sound.
                if (localStorage.getItem("timetable-enableTimeRemainingSound") === "true") {
                    bellChimes.play();
                }
            }
        }
        if (periodno <= 0) {
            document.getElementById("timeremaining-refreshcontent").innerHTML = `School isn't started yet`;
        }
        if (periodno > periodperday) {
            document.getElementById("timeremaining-refreshcontent").innerHTML = `School has ended`;
        }
    }, 1000);
}