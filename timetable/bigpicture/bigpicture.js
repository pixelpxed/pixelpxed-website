window.addEventListener("load", () => {
    setClassVariables()
})

var classes
var classtime_type = "Regular"
var classtimes = {
    "Regular": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
    "Special": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 40,
            "starthour": 7,
            "startmin": 50,
        }
    },
    "Online": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
}

var subj = {}
var customClassJSON
const classTimetable = localStorage.getItem("timetable-classTimetable")
function setClassVariables() {
    if (classTimetable === "405") {
        fetch(`${classdatafetchpath}/${classTimetable}.json`)
            .then((res) => res.json())
            .then((data) => { 
                regularClasses = data.class               
                subj = data.links
                
                if (data.override.state != true) {
                    classes = data.class
                } if (data.override.state == true) {
                    var weekNum = calculateWeekNumber()

                    if (data.override.class[weekNum]) {
                        classes = data.override.class[weekNum]
                        subj = Object.assign(subj, data.override.links)
                    } if (!data.override.class[weekNum]) {
                        classes = data.class
                    }
                }
                bigPictureScript()
            })
        return
    }
    document.getElementById("subjname").innerHTML = `Big picture isn't supported on custom classes.`;
}

// Public variables
var timeleftinterval = undefined
var bellChimes = new Audio("/timetable/assets/sound/bellChimes.mp3")

function bigPictureScript() {
    // Calculated every 1 second.
    timeleftinterval = setInterval(() => {
        var periodTimeLeft = classtimes[classtime_type]["timeremaining"];
        var periodperday = periodTimeLeft["periodperday"];
        var periodlength = periodTimeLeft["periodlength"];
        var starthour = periodTimeLeft["starthour"];
        var startmin = periodTimeLeft["startmin"];
    
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
            var classnumberid = ((today.getDay() - 1) * 11) + (periodno) + 11

            var classtofetch = classes[classnumberid]

            if (classtofetch == "-extend") {
                i = 1
                while (classes[classnumberid - i] == "-extend") {
                    i = i + 1
                }

                classtofetch = [classes[classnumberid - i]]
            }
    
            if (day == "Sunday" || day == "Saturday") {
                classtofetch = "-"
            }
            
            console.log(classtofetch);
            if (subj[classtofetch].subjname !== "") {
                classtofetch = subj[classtofetch].subjname
            }

            document.getElementById("subjname").innerHTML = classtofetch
    
            // ------------------------------------------------------------------
    
            // document.getElementById("period").innerHTML = periodno
            document.getElementById("timeremaining-refreshcontent").innerHTML = `Period ${periodno} - ${rminutes >= 10 ? rminutes : "0" + rminutes}:${rseconds >= 10 ? rseconds : "0" + rseconds}`;
    
            // Check if period ends (hour and minutes = 0)
            if ((rminutes == 0) && (rseconds == 0)) {
                // If sound setting is enabled, play the sound.
                if (localStorage.getItem("timetable-enableTimeRemainingSound") === "true") {
                    bellChimes.play();
                }
            } 
        }
        if (day !== "Sunday" && day !== "Saturday") {
            if (periodno <= 0) {
                document.getElementById("timeremaining-refreshcontent").innerHTML = `Day Start`;
            }
            if (periodno > periodperday) {
                document.getElementById("timeremaining-refreshcontent").innerHTML = `Day End`;
            }
        } if (day == "Sunday" || day == "Saturday") {
            document.getElementById("timeremaining-refreshcontent").innerHTML = `Weekend`;
        }
    }, 1000);
    
    fetch("https://api.quotable.io/quotes/random")
        .then((res) => res.json())
        .then((data) => {
            var quote = data
    
            document.querySelector(".quotes-wrapper").style.opacity = "1"
    
            document.querySelector(".quote").innerHTML = `"${quote[0].content}"`
            document.querySelector(".author").innerHTML = `- ${quote[0].author}`
    
            setTimeout(() => {
                document.querySelector(".quotes-wrapper").style.opacity = "0"
            }, 29000);
        })
    setInterval(() => {
        fetch("https://api.quotable.io/quotes/random")
            .then((res) => res.json())
            .then((data) => {
                var quote = data
                console.log(quote);
        
                document.querySelector(".quotes-wrapper").style.opacity = "1"
        
                document.querySelector(".quote").innerHTML = `"${quote[0].content}"`
                document.querySelector(".author").innerHTML = `- ${quote[0].author}`
        
                setTimeout(() => {
                    document.querySelector(".quotes-wrapper").style.opacity = "0"
                }, 29000);
            })
    }, 30000);
}

// ----------------------------------

var backgrounds = [
    "/timetable/bigpicture/video/alive.mp4",
    "/timetable/bigpicture/video/dna.mp4"
]
var videosrc = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.querySelector(".background-video").src = videosrc

// ----------------------------------

function toggleFullScreen(element) {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}