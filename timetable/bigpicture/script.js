var classes = [
    "Homeroom",
    "M4 Meeting",
    "Math for International Achievement",
    "Thai",
    "Art",
    "Lunch",
    "Fundamental English",
    "Fundamental English",
    "Chemistry",
    "Chemistry",
    "-",

    "Homeroom",
    "Earth and Space",
    "Earth and Space",
    "Chemistry",
    "Fundamental Biology",
    "Lunch",
    "Physics",
    "Science for International Achievement",
    "Social",
    "Badminton",
    "EP Meeting",

    "Homeroom",
    "Earth and Space",
    "Fundamental Math",
    "Fundamental Math",
    "Additional Math",
    "Lunch",
    "Independent Study",
    "Communication in English",
    "Physics",
    "Physics",
    "-",

    "Homeroom",
    "Chinese",
    "Fundamental Biology",
    "Fundamental Biology",
    "Lunch",
    "Counselling Activities",
    "Counselling Activities",
    "-",
    "-",
    "-",
    "-",

    "Homeroom",
    "English for International Achievement",
    "English for International Achievement",
    "Social",
    "Health",
    "Lunch",
    "Additional Math",
    "Additional Math",
    "Thai",
    "-"
]

var classtime_type = "Regular"
var classtimes = {
    "Regular": {
        "notify": false,
        "list": [
            "08:00 — 08:30",
            "08:30 — 09:20",
            "09:20 — 10:10",
            "10:10 — 11:00",
            "11:00 — 11:50",
            "11:50 — 12:40",
            "12:40 — 13:30",
            "13:30 — 14:20",
            "14:20 — 15:10",
            "15:10 — 16:00",
            "16:00 — 16:50"
        ],
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
    "Special": {
        "notify": true,
        "list": [
            "08:00 — 08:30",
            "08:30 — 09:10",
            "09:10 — 09:50",
            "09:50 — 10:30",
            "10:30 — 11:10",
            "11:10 — 11:50",
            "11:50 — 12:30",
            "12:30 — 13:10",
            "13:10 — 13:50",
            "13:50 — 14:30",
            "14:30 — 15:10"
        ],
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 40,
            "starthour": 7,
            "startmin": 50,
        }
    },
    "Online": {
        "notify": false,
        "list": [
            "08:00 – 08:40",
            "08:40 – 09:20",
            "09:20 – 10:00",
            "10:20 – 11:00",
            "11:00 – 11:40",
            "12:00 – 12:40",
            "12:40 – 13:20",
            "13:40 – 14:20",
            "14:20 – 15:00",
            "15:20 – 16:00",
            "16:00 – 16:40"
        ],
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
}

// Public variables
var timeleftinterval = undefined
var bellChimes = new Audio("/timetable/assets/sound/bellChimes.mp3")

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
        var classtofetch = classes[((today.getDay() - 1) * 11) + (periodno)]

        if (classtofetch == "DClass") {
            classtofetch = classes[(((today.getDay() - 1) * 11)) + (periodno)]
        }

        if (day == "Sunday" || day == "Saturday") {
            classtofetch = "-"
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
        console.log(quote);

        document.querySelector(".quotes-wrapper").style.opacity = "1"

        document.querySelector(".quote").innerHTML = `"${quote[0].content}"`
        document.querySelector(".author").innerHTML = `- ${quote[0].author}`

        setTimeout(() => {
            document.querySelector(".quotes-wrapper").style.opacity = "0"
        }, 14000);
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
            }, 14000);
        })
}, 15000);

// ----------------------------------

var backgrounds = [
    "/timetable/bigpicture/video/alive.mp4",
    "/timetable/bigpicture/video/dna.mp4"
]
var videosrc = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.querySelector(".background-video").src = videosrc

window.addEventListener("keyup", (event) => {
    console.log(event.key);
    if (event.key == "a") {
        classtime_type = "Regular"
    }
    if (event.key == "s") {
        classtime_type = "Special"
    }
    if (event.key == "d") {
        classtime_type = "Online"
    }
})