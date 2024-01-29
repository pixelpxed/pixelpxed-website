window.addEventListener('load', () => {

});

// Public variables
var timeleftinterval = undefined
var bellChimes = new Audio("/timetable/assets/sound/bellChimes.mp3")

function timeRemaining() {
    setTimeout(() => {
        // Inserts the HTML code for time remaining after clock.
        document.querySelector(".clock-wrapper").insertAdjacentHTML("afterend", `
            <p class="timeremaining"><b style='font-weight: var(--font-weight-semibold);'><span class="timeremaining-subj"><span style="font-weight: var(--font-weight-normal);">Calculating Picoseconds...</span></span></b><span id="timeremaining-refreshcontent"></span></p>
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
                // Check if period ends (hour and minutes = 0)
                if ((rminutes == 0) && (rseconds == 0)) {
                    // If sound setting is enabled, play the sound.
                    if (localStorage.getItem("timetable-enableTimeRemainingSound") === "true") {
                        bellChimes.play();
                    }
        
                    clearActiveClass()
                }
        
                if (localStorage.getItem("timetable-currentClassHighlight") === "true") {
                    var activeGridId = (today.getDay() * 11) + periodno
        
                    if (classes[activeGridId + 1] == "-extend") {
                        var rminutesextend = 0
                        for (let i = 1; classes[activeGridId + (i + 1)] == "-extend"; i++) {
                            rminutesextend = (i) * 50
                        }
                        rminutes = rminutes + (rminutesextend + 50)
                    }
                    
                    if (classes[activeGridId] == "-extend") {
                        for (let i = 1; classes[activeGridId - i] == "-extend"; i++) {
                            activeGridId = activeGridId - 1
                        }
                        activeGridId = activeGridId - 1
                    }
                    
                    if (activeGridId > 0) {
                        document.getElementById(activeGridId).classList.remove("class-current")
                    }
                    document.getElementById(activeGridId + 1).classList.add("class-current")   
                    document.querySelector(".timeremaining-subj").innerHTML = `${subj[document.getElementById(activeGridId + 1).innerHTML].subjname}`
                }
                
                document.getElementById("timeremaining-refreshcontent").innerHTML = `, <b><span style="font-family: 'Tlwg Typewriter', monospace;">${rminutes >= 10 ? rminutes : "0" + rminutes}:${rseconds >= 10 ? rseconds : "0" + rseconds}</span></b>&nbsp;remaining`;
            }
            if (periodno <= 0) {
                document.querySelector(".timeremaining-subj").innerHTML = `School isn't started yet`
                document.getElementById("timeremaining-refreshcontent").innerHTML = ``;
            }
            if (periodno > periodperday) {
                document.querySelector(".timeremaining-subj").innerHTML = `School has ended`
                document.getElementById("timeremaining-refreshcontent").innerHTML = ``;
            }
        }, 1000);
    }, 1000);
}

function clearActiveClass() {
    for (let i = 0; i < classes.length; i++) {
        document.getElementById(i + 1).classList.remove("class-current")
    }
}